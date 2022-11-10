from .db import db
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    is_voice = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(2000))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    created_at = db.Column(db.DateTime(),nullable = False ,server_default = func.now())
    updated_at = db.Column(db.DateTime(), nullable = False, onupdate = func.now(), default = func.now())
 #relationship
    server = db.relationship('Server', back_populate='messages')
