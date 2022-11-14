from .db import db
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    message_body = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey("users.id"))
    channel_id = db.Column(db.Integer, ForeignKey("channels.id"))
    server_id = db.Column(db.Integer, ForeignKey('servers.id'))
    created_at = db.Column(db.DateTime(),nullable = False ,server_default = func.now())
    updated_at = db.Column(db.DateTime(), nullable = False, onupdate = func.now(), default = func.now())
 #relationship
    servers = db.relationship('Server', back_populates='messages')
    users = db.relationship('User', back_populates='messages')
    channels = db.relationship('Channel', back_populates='messages')

    def mess_to_dict(self):
      return{
            'id':self.id,
            'message_body':self.message_body,
            'owner_id':self.owner_id,
            'channel_id':self.channel_id,
            'server_id':self.server_id,
            'created_at':self.created_at,
            'updated_at':self.updated_at
        }
