from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workspace, WorkspaceMember, User, Channel, Message, db
from sqlalchemy.orm import joinedload
from sqlalchemy import or_

channel_routes = Blueprint("channels", __name__)
workspace_channels = Blueprint("workspace_channels", __name__)


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


@channel_routes.route("/<int:id>")
@login_required
def get_channel_by_id(id):
    channel = (
        Channel.query.options(db.joinedload(Channel.messages))
        .filter(Channel.id == id)
        .first()
    )

    if not channel:
        return {"error": "channel not found"}

    return {"channel": channel.to_dict()}

# Return all the messages in a channel
@channel_routes.route("/<int:id>/messages")
@login_required
def get_channel_messages(id):
    channel = Channel.query.get(id)
    return {"Messages": [message.to_dict() for message in channel.messages]}
