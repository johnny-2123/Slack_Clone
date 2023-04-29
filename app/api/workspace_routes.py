from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workspace, WorkspaceMember, User, db
from app.forms.workspace_form import WorkspaceForm
from .auth_routes import validation_errors_to_error_messages

workspace_routes = Blueprint('workspaces', __name__)


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

    member = WorkspaceMember.query.join(User).filter(WorkspaceMember.workspace_id==workspace.id, WorkspaceMember.user_id==member_id).first()

    if not member:
        return {'error': 'Membership not found'}, 404

    db.session.delete(member)
    db.session.commit()


    # does delete workspace member but doesnt return deleted workspace member
    return {
        'message': 'Membership succesfully deleted',
        'deleted_membership': member.to_deleted_dict()
    }



@workspace_routes.route('/<int:id>/members', methods=['POST'])
@login_required
def create_workspace_member(id):
    request_body = request.json
    workspace = Workspace.query.get(id)
    new_member_id = request_body.get('user_id')


    if not workspace:
        return {'error': 'Workspace not found.'}, 404

    if workspace.owner_id != current_user.id:
        return {'error': 'Must be workspace owner to add a member to a workspace'}


    if not new_member_id:
        return {'error': 'User is required'}, 400

    user = User.query.get(new_member_id)

    if not user:
        return {'error': 'User with that id not found'}, 404

    member = WorkspaceMember.query.filter_by(workspace_id=workspace.id, user_id=user.id).first()

    print("************")
    print(member)

    if member:
        return {'error': 'membership already exists'}, 400

    new_member = WorkspaceMember(workspace_id=workspace.id, user_id=user.id)

    db.session.add(new_member)
    db.session.commit()

    return new_member.to_dict()

@workspace_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_workspace(id):
    workspace = Workspace.query.get(id)

    if not workspace:
        return {'error': 'Workspace not found.'}, 404

    return workspace.to_dict()


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


@workspace_routes.route('/', methods=['GET'])
@login_required
def get_workspaces():

    owner_workspaces = Workspace.query.filter_by(owner_id=current_user.id)

    member_workspaces = Workspace.query.join(WorkspaceMember)\
        .filter(WorkspaceMember.user_id == current_user.id)\
        .filter(Workspace.owner_id != current_user.id)

    workspaces = owner_workspaces.union(member_workspaces)

    workspace_dicts = []
    for workspace in workspaces:
        workspace_dict = workspace.to_dict()
        workspace_dict['members'] = [member.to_dict() for member in workspace.members]
        workspace_dicts.append(workspace_dict)

    return {'workspaces': workspace_dicts}
