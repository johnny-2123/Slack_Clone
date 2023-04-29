from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workspace, WorkspaceMember, User, Channel, Message, db
from sqlalchemy.orm import joinedload

channel_routes = Blueprint("channels", __name__)


@channel_routes.route("/<int:id>")
def get_channel_byId(id):

    channel = Channel.query.options(db.joinedload(Channel.messages)).filter(Channel.id==id).first()

    return {"channel": channel.to_dict()}
