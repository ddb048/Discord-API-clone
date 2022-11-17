from flask_socketio import SocketIO, emit
import os

#REVIEW -
# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://q-cord.onrender.com/',
        'http://q-cord.onrender.com/'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("DM")
def handle_chat(data):
    emit("DM", data, broadcast=True)

#server handling
@socketio.on("ServerMessages")
def handle_chat(data):
    emit("ServerMessages", data, broadcast=True)
