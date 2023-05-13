from flask_socketio import SocketIO, join_room, leave_room
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://renderUrl", "https://renderUrl"]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("join")
def on_join(data):
    room = data["room"]
    join_room(room)
    print(f"Client joined room: {room}")


@socketio.on("leave")
def on_leave(data):
    room = data["room"]
    leave_room(room)
    print(f"Client left room: {room}")


@socketio.on("connect")
def on_connect():
    print("Client connected")


@socketio.on("disconnect")
def on_disconnect():
    print("Client disconnected")
