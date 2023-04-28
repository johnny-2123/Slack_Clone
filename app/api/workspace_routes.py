from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workspace, db
from app.forms.workspace_form import WorkspaceForm
from .auth_routes import validation_errors_to_error_messages

workspace_routes = Blueprint('workspaces', __name__)



@workspace_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_workspace(id):

    workspace = Workspace.query.get(id)
    return workspace.to_dict()

@workspace_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_workspace(id):

    workspace = Workspace.query.get(id)

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
            name = form.name.data,
            description = form.description.data,
            image_url = form.image_url.data,
            owner_id = current_user.id
        )
        db.session.add(new_workspace)
        db.session.commit()

        created_workspace = Workspace.query.get(new_workspace.id)

        return created_workspace.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@workspace_routes.route('/', methods=['GET'])
@login_required
def get_workspaces():

    workspaces = Workspace.query.filter_by(owner_id=current_user.id).all()
    return {'workspaces': [workspace.to_dict() for workspace in workspaces]}
