from app.models import Server
from wtforms.validators import DataRequired, ValidationError
from wtforms import StringField,BooleanField,IntegerField,TextAreaField
from flask_wtf import FlaskForm
from app.models import Server

def name_exists(_form, field):
    #checking if name of server exists
    name = field.data
    server = Server.query.filter(Server.name == name).first()
    if server:
        raise ValidationError('Server name already in use')


def image_exists(form, field):
    url = field.data
    url = Server.query.filter(Server.preview_image == url).first()
    if url:
        raise ValidationError('Image is already used by another server')

class New_server(FlaskForm):

    name = StringField('Server Name', validators=[DataRequired(), name_exists])
    preview_image = StringField('Image', validators=[image_exists])
    private = BooleanField('Private')
    server_description=TextAreaField('Description')
    is_DM = BooleanField('Direct Message', default = False)
