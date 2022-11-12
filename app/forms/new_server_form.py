from app.models import Server
from wtforms.validators import DataRequired, Email, ValidationError
from wtforms import StringField,BooleanField,IntegerField
from flask_wtf import FlaskForm


def server_exists(form, field):
    name = field.data
    server_name = Server.query.filter(Server.name == name).first()
    if name:
        raise ValidationError('Server with this name is already in use')

class new_server(FlaskForm):

    name = StringField('Server name', validators=[DataRequired(),server_exists()])
    preview_image = StringField('Image')
    private = BooleanField('Private')
    is_DM = BooleanField('Direct massege', default = False)
    owner_id = IntegerField('Server master', default = current_user.id)



    