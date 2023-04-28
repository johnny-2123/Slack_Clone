from flask import Blueprint
from app.models import Channel

channel_routes = Blueprint("channels", __name__)


@channel_routes.route("/channelId")
def channels():
    channel = Channel.query.all()
    return {channel.to_dict()}
