from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


class Channel(db.Model):
    __tablename__='channels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    is_voice = db.Column(db.Boolean, default=False)
    description = db.Column(db.String(255))
    server_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("servers.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
 #relationship
    servers = db.relationship('Server', back_populates = 'channels')
    messages = db.relationship('Message', back_populates = 'channels', cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'is_voice': self.is_voice,
            'description': self.description,
            'server_id':self.server_id,
            'messages': [message.mess_to_dict() for message in self.messages]
        }
