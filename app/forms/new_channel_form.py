from app.models import Channel
from wtforms.validators import DataRequired, Email, ValidationError
from wtforms import StringField,BooleanField,IntegerField
from flask_wtf import FlaskForm



class New_channel(FlaskForm):

    name = StringField('Server name', validators=[DataRequired()])
    description = StringField('Description')
    is_voice = BooleanField('Direct message', default = False)
    server_id = IntegerField('Belong to server')
