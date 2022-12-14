# from app.models import Server
from wtforms.validators import DataRequired
from wtforms import StringField,BooleanField,TextAreaField
from flask_wtf import FlaskForm


# def name_exists(_form, field):
#     #checking if name of server exists
#     name = field.data
#     server = Server.query.filter(Server.name == name).first()
#     if server:
#         raise ValidationError('Server name already in use')


# def image_exists(form, field):
#     url = field.data
#     url = Server.query.filter(Server.preview_image == url).first()
#     if url:
#         raise ValidationError('Image is already used by another server')

class New_server(FlaskForm):

    name = StringField('Server Name', validators=[DataRequired()])
    preview_image = StringField('Image')
    private = BooleanField('Private')
    server_description=TextAreaField('Description')
    is_DM = BooleanField('Direct Message', default = False)
