from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Message(db.Model):
    __tablename__ = 'messages'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    message_body = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    channel_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("channels.id")))
    server_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('servers.id')))
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
            'owner_pic':self.users.profile_pic,
            'owner_name':self.users.username,
            'created_at':self.created_at,
            'updated_at':self.updated_at
        }
