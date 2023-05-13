from flask import request
from flask_socketio import SocketIO, join_room, leave_room
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://renderUrl", "https://renderUrl"]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("join")
def on_join(data):
    client_id = request.sid
    room = data["room"]
    join_room(room)
    print(f"Client {client_id} joined room: {room}")


@socketio.on("leave")
def on_leave(data):
    client_id = request.sid
    room = data["room"]
    leave_room(room)
    print(f"Client {client_id} left room: {room}")


@socketio.on("connect")
def on_connect():
    client_id = request.sid
    print(f"Client {client_id} connected")


@socketio.on("disconnect")
def on_disconnect():
    client_id = request.sid
    print(f"Client {client_id} disconnected")
