# from app.models import Channel
from wtforms.validators import DataRequired
from wtforms import TextAreaField
from flask_wtf import FlaskForm



class New_message(FlaskForm):
    message_body = TextAreaField('Message', validators=[DataRequired()])
