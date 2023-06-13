from datetime import datetime
from functools import wraps
from flask import Blueprint, g, jsonify, request
from flask_login import current_user, login_required
from app.models import db
from app.socket import socketio
from app.models.channel import Channel
from app.models.message import Message

chat_messages = Blueprint("chat_messages", __name__)
message_routes = Blueprint("message_routes", __name__)

def check_message():
    @message_routes.before_request
    @login_required
    def wrapper():
        message_id = request.view_args.get("message_id")
        message = Message.query.get(message_id)
        if not message:
            return {"error": "Message not found"}, 404
        request.message = message
    return wrapper

def get_chat():
    return request.channel if hasattr(request, "channel") else request.direct_message

def needs_permission(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        message = request.message
        if current_user.id != message.user.id:
            return {"error": "user does not have permission perform that action"}, 403
        return f(*args, **kwargs)
    return wrapper

@chat_messages.route("/")
def get_messages(**kwargs):
    return {"Messages": [message.to_dict() for message in get_chat().messages]}

@chat_messages.route("/", methods=["POST"])
def send_message(**kwargs):
    data = request.json
    content = data.get("content")
    if not content:
        return jsonify({"error": "message content required"}), 404

    chat = get_chat()
    if not chat:
        return jsonify({"error": "chat not found"}), 404

    now = datetime.now()
    message = Message(content=content, user=current_user, timestamp=now, chat=chat)
    chat.last_sent_message_timestamp = now
    db.session.commit()

    socketio.emit("chat", message.to_dict(), room=f"chat-{chat.id}")
    return message.to_dict(), 201

@message_routes.route("/")
def get_message(**kwargs):
    return request.message.to_dict()

@message_routes.route("/", methods=["PUT"])
@needs_permission
def edit_message(**kwargs):
    message = request.message
    data = request.json
    content = data.get("content")
    if not content:
        return jsonify({"error": "message content required"}), 404
    message.content = content
    db.session.commit()
    socketio.emit("message_update", message.to_dict(), room=f"chat-{message.chat.id}")
    return message.to_dict()

@message_routes.route("/", methods=["DELETE"])
@needs_permission
def delete_message(**kwargs):
    message = request.message
    db.session.delete(message)
    db.session.commit()
    socketio.emit("message_delete", message.to_dict(), room=f"chat-{message.chat.id}")
    return {"message": "Message deleted successfully"}
