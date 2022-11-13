from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Channel, db
from app.forms import New_channel
from .auth_routes import validation_errors_to_error_messages
channel_routes = Blueprint('channels',__name__)


#NOTE - Get CHANNEL by ID
@channel_routes.route('/<int:id>')
@login_required
def get_channel(id):
    channel = Channel.query.get(int(id))
    if channel:
        return channel.to_dict(), 200
    return {
        'errors': "channel not found",
        'status code': 404
    }, 404

#NOTE - create a CHANNEL
@channel_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_channel(id):
    form = New_channel()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel()
        form.populate_obj(channel)
        form.server_id = int(id)

        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#NOTE - update a CHANNEL
@channel_routes.route('<int:id>', methods=['PUT'])
@login_required
def edit_channel(id):
    channel = Channel.query.get(int(id))
    if channel:
        form=New_channel()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(channel)
            db.session.commit()
            return channel.to_dict(), 201
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'message': "channel not found",
           "status code": 404 }, 404

#NOTE - delete a CHANNEL
@channel_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    channel = Channel.query.get(int(id))
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return {"message": "Channel successfully deleted",
                "Status code": 302}, 302
    return {"message": "Channel not found",
            "status code": 404}, 404
