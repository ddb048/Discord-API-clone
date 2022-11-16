from .member import Member
from .user import User
from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.schema import Index

class Server(db.Model):
    __tablename__ = 'servers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    preview_image = db.Column(db.String(255))
    private = db.Column(db.Boolean)
    is_DM = db.Column(db.Boolean)
    server_description = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
 #relationship
    users = db.relationship('Member', back_populates='servers', cascade="all, delete")
    messages = db.relationship('Message', back_populates='servers', cascade="all,delete")
    channels = db.relationship('Channel', back_populates='servers', cascade="all,delete")



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'Server_description':self.server_description,
            'preview_image': self.preview_image,
            'private': self.private,
            'is_DM': self.is_DM,
            'owner_id':self.owner_id,
            'created_at':self.created_at,
            'updated_at':self.updated_at,
            "messages": [message.mess_to_dict() for message in self.messages],
            'mess_count':len(self.messages),
            'num_member':len(self.users),
            'members':[user.to_dict() for user in self.users ],
            'channels':[channel.to_dict() for channel in self.channels]
        }

# Index('servers_owner_id_members_roles_idx', Server.owner_id, Member.roles)
