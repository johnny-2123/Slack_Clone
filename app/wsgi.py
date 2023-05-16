from app import socketio, app

## import the routes to be used with socketio here
if __name__ == '__main__':
    socketio.run(app, port=5000)
