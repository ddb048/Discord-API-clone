from wtforms.validators import DataRequired
from wtforms import (StringField,BooleanField)
from flask_wtf import FlaskForm

class NewChannel(FlaskForm):

    name = StringField('Channel name',validators=[DataRequired()])
    description = StringField('Description')
    is_voice = BooleanField('Voice Channel')
