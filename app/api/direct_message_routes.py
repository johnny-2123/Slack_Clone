from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from app.models import Message, DirectMessage, DirectMessageMember, User, db
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

direct_message_routes = Blueprint("direct_messages", __name__, url_prefix="/api/direct_messages")

#GET DIRECT MESSAGES
@direct_message_routes.route('/', methods=['GET'])
@login_required
def get_direct_messages():
    # Get the user ID from the current user object
    user_id = current_user.id

    # Get a list of DirectMessage objects associated with the user ID
    direct_messages = DirectMessage.query.join(DirectMessageMember).\
        filter(DirectMessageMember.user_id == user_id).\
        order_by(DirectMessage.last_sent_message_timestamp.desc()).all()

    # Create a list of dictionaries to return in the response
    response = []
    for dm in direct_messages:
        users = [member.user_id for member in dm.direct_message_members]
        response.append({
            'id': dm.id,
            'topic': dm.topic,
            'workspace_id': dm.workspace_id,
            'users': users,
            'last_sent_message_timestamp': dm.last_sent_message_timestamp.isoformat()
        })

    # Return the response as JSON
    return jsonify(response), 200, {'Content-Type': 'application/json'}


#GET DIRECT MESSAGE BY ID
@direct_message_routes.route("/<int:dm_id>", methods=["GET"])
@login_required
def get_direct_message(dm_id):
    direct_message = DirectMessage.query.get(dm_id)

    if not direct_message:
        return jsonify({
            "message": "Direct message not found",
            "statusCode": 404,
            "errors": ["Direct message with that ID does not exist"]
        }), 404

    return jsonify({
        "id": direct_message.id,
        "topic": direct_message.topic,
        "workspace_id": direct_message.workspace_id,
        "last_sent_message_timestamp": direct_message.last_sent_message_timestamp.isoformat()
    }), 200


#CREATE DIRECT MESSAGE
@direct_message_routes.route("/", methods=["POST"])
@login_required
def create_direct_message():
    data = request.json
    topic = data.get("topic")
    users = data.get("users")

    if not topic or not users:
        return jsonify({"error": "topic and users are required"}), 400

    # Retrieve the workspace ID from the current user object
    workspace_id = current_user.workspace_id

    try:
        direct_message = DirectMessage(topic=topic, workspace_id=workspace_id)
        db.session.add(direct_message)

        # add users as members of the new direct message
        for user_id in users:
            member = DirectMessageMember(user_id=user_id, direct_message_id=direct_message.id)
            db.session.add(member)

        # create initial message for the direct message
        message = Message(content=f"{topic} started", user_id=users[0], channel_id=None, parent_id=None, attachment_id=None, timestamp=datetime.utcnow())
        db.session.add(message)

        db.session.commit()

        return jsonify({
            "id": direct_message.id,
            "topic": direct_message.topic,
            "workspace_id": direct_message.workspace_id,
            "last_sent_message_timestamp": message.timestamp
        }), 201

    except:
        db.session.rollback()
        raise


##UPDATE DIRECT MESSAGE
@direct_message_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_direct_message(id):
    # Query the database for the direct message with the given ID
    dm = DirectMessage.query.get(id)

    # If no direct message is found with the given ID, return a 404 error
    if dm is None:
        return jsonify({
            'message': 'Direct message not found',
            'statusCode': 404,
            'errors': ['Direct message with that ID does not exist']
        }), 404

    # Extract the updated fields from the request body
    req_data = request.get_json()
    topic = req_data['topic']

    # Update the direct message with the new topic
    dm.topic = topic
    db.session.commit()

    # Return the updated direct message with a status code of 200
    return jsonify(dm.to_dict()), 200


#DELETE MESSAGE
@direct_message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_direct_message(id):
    # Attempt to get the direct message with the specified ID
    direct_message = DirectMessage.query.get(id)

    # If the direct message does not exist, return a 404 error
    if not direct_message:
        return jsonify({
            'message': 'Direct message not found',
            'statusCode': 404,
            'errors': [
                'Direct message with that ID does not exist'
            ]
        }), 404

     # Mark the direct message for deletion
    db.session.delete(direct_message)
    db.session.commit()

    # Return a success response
    return jsonify({
        'message': 'Direct message deleted successfully',
        'statusCode': 200,
        'errors': []
    }), 200
