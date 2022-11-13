from app.models import Channel
from wtforms.validators import DataRequired
from wtforms import StringField, BooleanField, IntegerField, TextAreaField
from flask_wtf import FlaskForm


# TODO - inquire about if we want channel and server id to be required
class New_message(FlaskForm):
    message_body = TextAreaField('Message', validators=[DataRequired()])
    owner_id = IntegerField('Owner id', validators=[DataRequired()])
    channel_id = IntegerField('Channel id', validators=[DataRequired()])
    server_id = IntegerField('Server id', validators=[DataRequired()])
