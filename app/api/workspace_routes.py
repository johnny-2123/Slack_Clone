from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Workspace, db

workspace_routes = Blueprint('workspaces', __name__)

@workspace_routes.route('/', methods=['GET'])
@login_required
def get_workspaces():

    workspaces = Workspace.query.all()
    return {'workspaces': [workspace.to_dict() for workspace in workspaces]}

@workspace_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_workspace(id):

    workspace = Workspace.query.get(id)
    return workspace.do_dict()
