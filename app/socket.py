from flask_socketio import SocketIO, emit
import os

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://renderUrl',
        'https://renderUrl'
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)
