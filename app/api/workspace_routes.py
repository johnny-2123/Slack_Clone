from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Workspace, db

workspace_routes = Blueprint('workspaces', __name__)

@workspace_routes.route('/', methods=['GET'])
@login_required
def get_workspaces():

    workspaces = Workspace.query.filter_by(owner_id=current_user.id).all()
    return {'workspaces': [workspace.to_dict() for workspace in workspaces]}

@workspace_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_workspace(id):

    workspace = Workspace.query.get(id)
    return workspace.to_dict()
