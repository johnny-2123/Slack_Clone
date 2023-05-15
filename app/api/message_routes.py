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

#
# HELPER FUNCTIONS
#


# Checks if a message exists, and that the current user
# is the owner of that message before proceeding
@message_routes.before_request
@login_required
def check_message():
    message_id = request.view_args.get("message_id")
    message = Message.query.get(message_id)
    if not message:
        return {"error": "Message not found"}, 404
    request.message = message


# Determine what type of chat the message is in
def get_chat():
    if hasattr(request, "channel"):
        return request.channel
    elif hasattr(request, "direct_message"):
        return request.direct_message


# Checks if the current user has permissions to perform an action
def needs_permission(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        message = request.message
        if current_user.id is not message.user.id:
            return {"error": "user does not have permission perform that action"}, 403
        return f(*args, **kwargs)

    return wrapper


#
# ROUTES
#


# Get all messages in the current chat
@chat_messages.route("/")
def get_messages(**kwargs):
    print("chat_messages.route")
    chat = get_chat()
    return {"Messages": [message.to_dict() for message in chat.messages]}


# Send a message in the current chat
@chat_messages.route("/", methods=["POST"])
def send_message(**kwargs):
    data = request.json
    content = data.get("content")
    if not content:
        return jsonify({"error": "message content required"}), 404

    # direct_message = DirectMessage.query.get(direct_message_id)
    chat = get_chat()
    if not chat:
        return jsonify({"error": "chat not found"}), 404

    now = datetime.now()
    message = Message(content=content, user=current_user, timestamp=now, chat=chat)
    chat.last_sent_message_timestamp = now
    db.session.commit()

    socketio.emit("chat", message.to_dict(), room=f"chat-{chat.id}")
    print(f"sending message to room chat-{chat.id}")

    return message.to_dict(), 201


# Get a single message
@message_routes.route("/")
def get_message(**kwargs):
    message = request.message
    return message.to_dict()


# Update a message
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
    print(f"editing message in room chat-{message.chat.id}")
    return message.to_dict()


# Delete a message
@message_routes.route("/", methods=["DELETE"])
@needs_permission
def delete_message(**kwargs):
    message = request.message
    socketio.emit("message_delete", message.to_dict(), room=f"chat-{message.chat.id}")
    print(f"deleting message in room chat-{message.chat.id}")
    db.session.delete(message)
    db.session.commit()

    return {"message": "Message deleted successfully"}
