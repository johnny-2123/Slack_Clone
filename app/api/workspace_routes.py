from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workspace, User, DirectMessage, db
from app.forms.workspace_form import WorkspaceForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
from .channel_routes import workspace_channels
from ..socket import socketio
from sqlalchemy import and_

workspace_routes = Blueprint('workspaces', __name__)
workspace_routes.register_blueprint(workspace_channels,url_prefix='/<int:workspace_id>/channels')

@workspace_routes.route("/<int:id>/direct_messages")
@login_required
def get_workspace_dms(id):
    user_id = current_user.id
    # Get a list of DirectMessage objects associated with the user ID
    direct_messages = DirectMessage.query.filter(
        and_(
            DirectMessage.members.any(id=user_id),
            DirectMessage.workspace_id == id
        )
    ).all()

    return {"directMessages": [dm.to_dict() for dm in direct_messages]}


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

    member = User.query.get(member_id)

    if not member:
        return {'error':"user not found"}


    if not member in workspace.members:
        return {'error': 'User is not currently a member of this workspace'}, 404

    workspace.members.remove(member)

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

    if user in workspace.members:
        return {'error': 'membership already exists'}, 400

    workspace.members.append(user)

    db.session.commit()

    return {"message":f"added {user.username} to {workspace.name}"}

# Get Members for a Single Workspace
@workspace_routes.route('/<int:id>/members', methods=['GET'])
@login_required
def get_workspace_members(id):
    workspace = Workspace.query.get(id)
    user_id = current_user.id

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
    print('**************************************errors in workspace routes update workspace,')
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': (form.errors)}, 400

# Create a workspace
@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace():

    form = WorkspaceForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_workspace = current_user.create_workspace(
            form.name.data,
            form.description.data,
            form.image_url.data,
        )
        db.session.add(new_workspace)
        db.session.commit()

        created_workspace = Workspace.query.get(new_workspace.id)
        return created_workspace.to_dict()
    # print('**************************************errors in workspace routes create new workspace,')
    # print(validation_errors_to_error_messages(form.errors))
    return {'errors': (form.errors)}, 400

# Get all User workspaces
@workspace_routes.route('/', methods=['GET'])
@login_required
def get_workspaces():
    workspaces = current_user.workspace_memberships

    return jsonify({'workspaces': [workspace.to_dict() for workspace in workspaces]}), 200, {"Content-Type": "application/json"}
