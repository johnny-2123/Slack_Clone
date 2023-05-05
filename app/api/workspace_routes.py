from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workspace, User, db
from app.forms.workspace_form import WorkspaceForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
from .channel_routes import workspace_channels
from ..socket import socketio
workspace_routes = Blueprint('workspaces', __name__)
workspace_routes.register_blueprint(workspace_channels,url_prefix='/<int:workspace_id>/channels')

# Remove a member from a workspace
@workspace_routes.route('/<int:id>/members', methods=['DELETE'])
@login_required
def delete_workspace_member(id):
    request_body = request.json
    member_id = request_body.get('member_id')

    workspace = Workspace.query.get(id)
    if not workspace:
        return {'error': 'Workspace not found'}, 404

    if workspace.owner_id != current_user.id:
        return {'error': 'Forbidden'}, 403

    # member = WorkspaceMember.query.join(User).filter(WorkspaceMember.workspace_id==workspace.id, WorkspaceMember.user_id==member_id).first()
    member = User.query.get(member_id)

    if not member:
        return {'error':"user not found"}


    if not member in workspace.members:
        return {'error': 'User is not currently a member of this workspace'}, 404

    workspace.members.remove(member)

    # db.session.delete(member)
    db.session.commit()


    # does delete workspace member but doesnt return deleted workspace member
    return {
        'message': 'Membership succesfully deleted',
        'deleted_membership': member.to_dict()
    }


# Add a member to a workspace

@workspace_routes.route('/<int:id>/members', methods=['POST'])
@login_required
def create_workspace_member(id):
    request_body = request.json
    workspace = Workspace.query.get(id)
    user_email = request_body.get('user_email')


    if not workspace:
        return {'error': 'Workspace not found.'}, 404

    if workspace.owner_id != current_user.id:
        return {'error': 'Must be workspace owner to add a member to a workspace'}


    if not user_email:
        return {'error': 'User email is required'}, 400

    user = User.query.filter_by(email=user_email).first()

    if not user:
        return {'error': 'User with that id not found'}, 404

    # member = WorkspaceMember.query.filter_by(workspace_id=workspace.id, user_id=user.id).first()

    # print("************")
    # print(member)

    if user in workspace.members:
        return {'error': 'membership already exists'}, 400

    # new_member = WorkspaceMember(workspace_id=workspace.id, user_id=user.id)
    workspace.members.append(user)

    # db.session.add(new_member)
    db.session.commit()

    # return new_member.to_dict()
    return {"message":f"added {user.username} to {workspace.name}"}

# Get Members for a Single Workspace
@workspace_routes.route('/<int:id>/members', methods=['GET'])
@login_required
def get_workspace_members(id):
    workspace = Workspace.query.get(id)
    user_id = current_user.id

    print('back end route for getting members for a single workspace**************************************************************************')

    if not workspace:
        return {'error': 'Workspace not found'}, 404

    user = User.query.get(user_id)

    if not user:
        return {'error':"current user not found"}

    if not user in workspace.members:
        return {'error': 'Forbidden'}, 404

    return {"members": [member.to_dict() for member in workspace.members]}

# Get a workspace
@workspace_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_workspace(id):
    workspace = Workspace.query.get(id)

    if not workspace:
        return {'error': 'Workspace not found.'}, 404

    print('workspace************************************')
    print(workspace.to_dict())



    return workspace.to_dict()


# Delete a workspace
@workspace_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_workspace(id):

    workspace = Workspace.query.get(id)

    if not workspace:
        return {'error': 'Workspace not found.'}, 404

    if workspace.owner_id != current_user.id:
        return {'error': 'Must be workspace owner to delete a workspace'}, 403

    db.session.delete(workspace)
    db.session.commit()

    return {
        'message': 'workspace succesfully deleted',
        'deleted_workspace': workspace.to_dict()
    }

# Update a workspace
@workspace_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_workspace(id):

    workspace = Workspace.query.get(id)

    print('*****************')
    print(workspace)

    if not workspace:
        return {'error': 'Workspace not found.'}, 404

    if workspace.owner_id != current_user.id:
        return {'error': 'Must be workspace owner to update a workspace'}, 403

    form = WorkspaceForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        workspace.name = form.name.data
        workspace.description = form.description.data
        workspace.image_url = form.image_url.data
        db.session.commit()

        updated_workspace = Workspace.query.get(id)

        return updated_workspace.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Create a workspace
@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace():

    form = WorkspaceForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_workspace = Workspace(
            name=form.name.data,
            description=form.description.data,
            image_url=form.image_url.data,
            owner_id=current_user.id
        )
        db.session.add(new_workspace)
        db.session.commit()

        created_workspace = Workspace.query.get(new_workspace.id)

        return created_workspace.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get all User workspaces
@workspace_routes.route('/', methods=['GET'])
@login_required
def get_workspaces():
    # owner_workspaces = Workspace.query.filter_by(owner_id=current_user.id)


    # member_workspaces = Workspace.query.join(WorkspaceMember)\
    #     .filter(WorkspaceMember.user_id == current_user.id)\
    #     .filter(Workspace.owner_id != current_user.id)

    # workspaces = owner_workspaces.union(member_workspaces)
    workspaces = current_user.workspace_memberships

    # workspaces = owner_workspaces.union(member_workspaces).all()

    # print('**********************************************')
    # print(workspaces)

    workspace_dicts = []
    for workspace in workspaces:
        workspace_dict = workspace.to_dict()
        workspace_dict['members'] = [member.to_dict() for member in workspace.members]
        workspace_dicts.append(workspace_dict)

    # owner_workspaces = Workspace.query.options(db.joinedload(Workspace.members)).filter(Workspace.owner_id==current_user.id)

    # member_workspaces=Workspace.query.join(WorkspaceMember).options(db.joinedload(Workspace.members)).filter(WorkspaceMember.id==current_user.id)

    # workspaces = owner_workspaces.union(member_workspaces)

    # return {"workspaces": workspace.to_dict() for workspace in workspaces}

    return {'workspaces': workspace_dicts}
