from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Channel,Message, db
from app.forms import New_message
from .auth_routes import validation_errors_to_error_messages
messages_routes = Blueprint('messages',__name__)

# NOTE - Get all messages by channel id (similar to get channel by id)
@messages_routes.route('/<int:channel_id>')
@login_required
def get_messages(channel_id):
    messages = Message.query.filter_by(channel_id = int(channel_id))
    print('============>', messages)
    if messages:
       
        return [message.mess_to_dict() for message in messages], 200
    return {
        'errors': "channel not found",
        'status code': 404
    }, 404

# NOTE Create and Update a message
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

# NOTE update a message
@messages_routes.route('<int:server_id>/<int:channel_id>/<int:message_id>', methods=['PUT'])
def message_update(server_id,channel_id,message_id):
    message = Message.query.get(message_id)
    if message:
            form = New_message()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                form.populate_obj(message)
                message.channel_id = int(channel_id)
                message.server_id = int(server_id)
                message.owner_id = int(current_user.id)
                db.session.commit()
                return message.mess_to_dict()
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# NOTE delete a message
@messages_routes.route('/<int:message_id>', methods=["DELETE"])
@login_required
def delete_message(message_id):
    message = Message.query.get(int(message_id))
    if message:
        db.session.delete(message)
        db.session.commit()
        return {"message": "Message successfully seleted", "status code": 302}, 302
    return {"message": "Message not found",
            "status code": 404}, 404
   