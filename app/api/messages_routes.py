from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Message, db
from app.forms import New_message
from .auth_routes import validation_errors_to_error_messages
messages_routes = Blueprint('messages',__name__)

# NOTE - Get all messages by channel id (similar to get channel by id)


# NOTE - Update message (route need to be discussed)
@messages_routes.route('/<int:channel_id>/<int:message_id')
@login_required
def edit_message(message_id):
    message = Message.query.get(int(message_id))
    if message:
        form = New_message()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(message)
            db.session.commit()
            return message.to_dict(), 201
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'message': "message not found",
                    "status code": 404}, 404



# NOTE Create message
@messages_routes.route('<int:server_id>/<int:channel_id>', methods = ['POST'])
@login_required
def create_message(server_id,channel_id):
    form = New_message()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message()
        form.populate_obj(message)
        message.channel_id = int(channel_id)
        message.server_id = int(server_id)
        message.owner_id = int(current_user.id)

        db.session.add(message)
        db.session.commit()
        return message.mess_to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# NOTE delete a message
@messages_routes.route('/<int:server_id>/<int:channel_id>/<int:message_id>')
@login_required
def delete_message(message_id):
    message = Message.query.get(int(message_id))
    if message:
        db.session.delete(message)
        db.session.commit()
        return {"message": "Message successfully seleted", "status code": 302}, 302
    return {"message": "Message not found",
            "status code": 404}, 404
   