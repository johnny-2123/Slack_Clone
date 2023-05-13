from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from app.models import Message, User, DirectMessage, db
from .message_routes import chat_messages
import os

# from app.models import direct_message
from app.models.direct_message import direct_message_member
from datetime import datetime

direct_message_routes = Blueprint("direct_messages", __name__)


from sqlalchemy import and_
from ..socket import socketio


# configure cors_allowed_origins


# GET DIRECT MESSAGES
@direct_message_routes.route("/", methods=["GET"])
@login_required
def get_direct_messages():
    # Get the user ID from the current user object
    user_id = current_user.id
    data = request.json
    workspace_id = data.get("workspace_id")
    # Get a list of DirectMessage objects associated with the user ID
    print(current_user.dm_memberships)
    # direct_messages = DirectMessage.query.join(direct_message_member).\
    #     filter(direct_message_member.user_id == user_id).\
    #     order_by(DirectMessage.last_sent_message_timestamp.desc()).all()

    direct_messages = DirectMessage.query.filter(
        and_(
            DirectMessage.members.any(id=user_id),
            DirectMessage.workspace_id == workspace_id,
        )
    ).all()

    print(direct_messages)

    # Create a list of dictionaries to return in the response
    response = []
    # for dm in direct_messages:
    #     users = [member.id for member in dm.members]
    #     response.append({
    #         "id": dm.id,
    #         "topic": dm.topic,
    #         "workspace_id": dm.workspace_id,
    #         "users": users,
    #         "last_sent_message_timestamp": dm.last_sent_message_timestamp
    #     })
    # Return the response as JSON
    return jsonify([dm.to_dict() for dm in direct_messages])
    # return jsonify(response), 200, {"Content-Type": "application/json"}


# GET DIRECT MESSAGE BY ID
@direct_message_routes.route("/<int:direct_message_id>", methods=["GET"])
@login_required
def get_direct_message(direct_message_id):
    direct_message = DirectMessage.query.get(direct_message_id)
    if not direct_message:
        return (
            jsonify(
                {
                    "message": "Direct message not found",
                    "statusCode": 404,
                    "errors": ["Direct message with that ID does not exist"],
                }
            ),
            404,
        )
    return (
        jsonify(
            {
                "id": direct_message.id,
                "topic": direct_message.topic,
                "workspace_id": direct_message.workspace_id,
                "messages": [message.to_dict() for message in direct_message.messages],
                "members": [member.to_dict() for member in direct_message.members],
                "last_sent_message_timestamp": direct_message.last_sent_message_timestamp.isoformat(),
            }
        ),
        200,
    )


# CREATE DIRECT MESSAGE
@direct_message_routes.route("/", methods=["POST"])
@login_required
def create_direct_message():
    data = request.json
    topic = data.get("topic")
    users = data.get("users")
    workspace_id = data.get("workspace_id")
    if not topic or not users:
        return jsonify({"error": "topic and users are required"}), 400
    # Retrieve the workspace ID from the current user object
    now = datetime.now()

    try:
        direct_message = DirectMessage(
            topic=topic, workspace_id=workspace_id, last_sent_message_timestamp=now
        )
        db.session.add(direct_message)
        # add users as members of the new direct message
        # for user_id in users:
        #     member = direct_message_member(user_id=user_id, direct_message_id=direct_message.id)
        #     db.session.add(member)

        for user_id in users:
            user = User.query.get(user_id)
            direct_message.members.append(user)

        # create initial message for the direct message
        message = Message(
            content=f"{topic} started",
            user_id=users[0],
            channel_id=None,
            parent_id=None,
            timestamp=now,
        )
        db.session.add(message)
        db.session.commit()
        return (
            jsonify(
                {
                    "id": direct_message.id,
                    "topic": direct_message.topic,
                    "workspace_id": direct_message.workspace_id,
                    "last_sent_message_timestamp": direct_message.last_sent_message_timestamp,
                }
            ),
            201,
        )
    except:
        db.session.rollback()
        raise


##UPDATE DIRECT MESSAGE
@direct_message_routes.route("/<int:direct_message_id>", methods=["PUT"])
@login_required
def update_direct_message(direct_message_id):
    # Query the database for the direct message with the given ID
    dm = DirectMessage.query.get(direct_message_id)
    # If no direct message is found with the given ID, return a 404 error
    if dm is None:
        return (
            jsonify(
                {
                    "message": "Direct message not found",
                    "statusCode": 404,
                    "errors": ["Direct message with that ID does not exist"],
                }
            ),
            404,
        )
    # Extract the updated fields from the request body
    req_data = request.get_json()
    topic = req_data["topic"]
    # Update the direct message with the new topic
    dm.topic = topic
    db.session.commit()
    # Return the updated direct message with a status code of 200
    return jsonify(dm.to_dict()), 200


# DELETE DIRECT MESSAGE
@direct_message_routes.route("/<int:direct_message_id>", methods=["DELETE"])
@login_required
def delete_direct_message(direct_message_id):
    # Attempt to get the direct message with the specified ID
    direct_message = DirectMessage.query.get(direct_message_id)
    # If the direct message does not exist, return a 404 error
    if not direct_message:
        return (
            jsonify(
                {
                    "message": "Direct message not found",
                    "statusCode": 404,
                    "errors": ["Direct message with that ID does not exist"],
                }
            ),
            404,
        )
    # Mark the direct message for deletion
    db.session.delete(direct_message)
    db.session.commit()
    # Return a success response
    return (
        jsonify(
            {
                "message": "Direct message deleted successfully",
                "statusCode": 200,
                "errors": [],
            }
        ),
        200,
    )


dm_with_id = Blueprint("dm_with_id", __name__, url_prefix="/<int:direct_message_id>")
direct_message_routes.register_blueprint(dm_with_id)
dm_with_id.register_blueprint(chat_messages, url_prefix="/messages")
#
# HELPER FUNCTIONS
#


@dm_with_id.before_request
@login_required
def check_direct_message():
    print("direct_message_routes.before_request")
    direct_message_id = request.view_args.get("direct_message_id")
    direct_message = DirectMessage.query.get(direct_message_id)
    if not direct_message:
        return {"error": "direct message not found"}, 404
    if not current_user in direct_message.workspace.members:
        return {"error": "User is not a member of this workspace"}, 403
    if not (current_user in direct_message.members):
        return {"error": "User is not a member of this direct message"}, 403
    request.direct_message = direct_message
    request.workspace = direct_message.workspace


@socketio.on("joinDirectMessage")
def handle_join_direct_message(direct_message_id):
    socketio.join_room(str(direct_message_id))


@socketio.on("leaveDirectMessage")
def handle_leave_direct_message(direct_message_id):
    socketio.leave_room(str(direct_message_id))


@socketio.on("message")
def handle_message(data):
    direct_message_id = data["direct_message_id"]
    content = data["content"]
    user_id = current_user.id
    now = datetime.now()

    direct_message = DirectMessage.query.get(direct_message_id)
    if not direct_message:
        emit("errorMessage", {"error": "Direct message not found"})
        return

    if user_id not in [member.id for member in direct_message.members]:
        emit("errorMessage", {"error": "User is not a member of this direct message"})
        return

    message = Message(
        content=content,
        user_id=user_id,
        channel_id=None,
        parent_id=None,
        timestamp=now,
        direct_message_id=direct_message_id,
    )
    db.session.add(message)
    db.session.commit()

    message_data = message.to_dict()

    # Emit the message to all clients in the direct message room
    socketio.emit("message", message_data, room=str(direct_message_id))
