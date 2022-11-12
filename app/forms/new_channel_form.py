from app.models import Channel
from wtforms.validators import DataRequired, Email, ValidationError
from wtforms import StringField,BooleanField,IntegerField
from flask_wtf import FlaskForm


def channel_exists(form, field):
    name = field.data
    server_name = Channel.query.filter(Channel.name == name).first()
    if name:
        raise ValidationError('Channel with this name is already in use')

class new_channel(FlaskForm):

    name = StringField('Server name', validators=[DataRequired(),channel_exists()])
    description = StringField('Description')
    is_voice = BooleanField('Direct massege', default = False)
    server_id = IntegerField('Belong to server')

