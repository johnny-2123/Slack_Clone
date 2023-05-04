from functools import wraps
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.channel_form import ChannelForm
from app.models import Workspace, User, Channel, Message, db
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError

channel_routes = Blueprint("channels", __name__)
workspace_channels = Blueprint("workspace_channels", __name__)

#
# HELPER FUNCTIONS
#


# Checks if a workspace exists, and that the current user
# is a member of that workspace before proceeding
@workspace_channels.before_request
def check_workspace():
    workspace_id = request.view_args.get("workspace_id")
    workspace = Workspace.query.get(workspace_id)
    if not workspace:
        return {"error": "Workspace not found"}, 404
    if not current_user in workspace.members:
        return {"error": "User is not a member of this workspace"}, 403
    request.workspace = workspace


# Checks if a channel exists, and if the current user
# has permissions to view it before proceeding
@channel_routes.before_request
def check_channel():
    channel_id = request.view_args.get("channel_id")
    channel = Channel.query.get(channel_id)
    if not channel:
        return {"error": "channel not found"}, 404
    if not current_user in channel.workspace.members:
        return {"error": "User is not a member of this workspace"}, 403
    if channel.private and (not current_user in channel.private_members):
        return {"error": "User does not have access to this channel"}, 403
    request.channel = channel


# Checks if the current user has permissions to perform an action
def needs_permission(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        workspace = request.workspace
        if current_user.id is not workspace.owner.id:
            return {"error": "user does not have permission to do that"}, 403
        return f(*args, **kwargs)

    return wrapper


#
# ROUTES
#


# Gets all channels in a workspace that are
# not private, or that the current user is a member of
@workspace_channels.route("/")
@login_required
def get_channels(workspace_id):
    channels = (
        Channel.query.filter(Channel.workspace_id == workspace_id)
        .filter(
            or_(
                Channel.private == False,
                (Channel.private_members.contains(current_user)),
            )
        )
        .all()
    )
    return {"Channels": [channel.to_dict() for channel in channels]}


# Get a single channel
@channel_routes.route("/")
@login_required
def get_channel_by_id(channel_id):
    channel = (
        Channel.query.options(db.joinedload(Channel.messages))
        .filter(Channel.id == channel_id)
        .first()
    )
    # print(db.inspect(db.engine).get_table_options(Channel.__table__.name))
    return {"channel": channel.to_dict()}


# Get all the messages in a channel
@channel_routes.route("/messages")
@login_required
def get_channel_messages(id):
    channel = Channel.query.get(id)
    return {"Messages": [message.to_dict() for message in channel.messages]}


# Create a channel
@workspace_channels.route("/", methods=["POST"])
@login_required
@needs_permission
def create_channel(workspace_id):
    workspace = request.workspace
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = Channel(
            name=form.data["name"],
            description=form.data["description"],
            topic=form.data["topic"],
            private=form.data["private"],
            owner=current_user,
            workspace=workspace,
        )
        if form.data["private"]:
            new_channel.private_members.append(current_user)
        db.session.add(new_channel)
        try:
            db.session.commit()
            return new_channel.to_dict()
        except IntegrityError as e:
            db.session.rollback()
            error_info = e.orig.args
            return {"error": "IntegrityError", "info": error_info}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
