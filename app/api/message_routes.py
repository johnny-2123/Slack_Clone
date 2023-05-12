from datetime import datetime
from flask import Blueprint, g, jsonify, request
from flask_login import current_user
from app.models import db

from app.models.channel import Channel
from app.models.message import Message

chat_messages = Blueprint("chat_messages", __name__)

#
# HELPER FUNCTIONS
#


# Determine what type of chat the message is in
def get_chat():
    if hasattr(request, "channel"):
        return request.channel
    elif hasattr(request, "direct_message"):
        return request.direct_message


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
    print("sending message")
    data = request.json
    content = data.get("content")
    if not content:
        return jsonify({"error": "message content required"}), 404

    # direct_message = DirectMessage.query.get(direct_message_id)
    chat = get_chat()
    if not chat:
        return jsonify({"error": "direct message not found"}), 404

    now = datetime.now()
    message = Message(content=content, user=current_user, timestamp=now, chat=chat)
    chat.last_sent_message_timestamp = now
    db.session.commit()

    return message.to_dict(), 201
