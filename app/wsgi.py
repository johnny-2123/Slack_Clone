from app import socketio, app

## import the routes to be used with socketio here
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
