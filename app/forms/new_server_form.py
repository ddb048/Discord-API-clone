from app.models import Server
from wtforms.validators import DataRequired
from wtforms import StringField,BooleanField,IntegerField,TextAreaField
from flask_wtf import FlaskForm



class New_server(FlaskForm):

    name = StringField('Server Name', validators=[DataRequired()])
    preview_image = StringField('Image')
    private = BooleanField('Private')
    server_description=TextAreaField('Description')
    is_DM = BooleanField('Direct Message', default = False)
