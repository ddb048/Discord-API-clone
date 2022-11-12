from .member import Member
from .user import User
from .db import db
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    preview_image = db.Column(db.String(255))
    private = db.Column(db.Boolean)
    is_DM = db.Column(db.Boolean)
    server_description = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, ForeignKey("users.id"))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
 #relationship
    users = db.relationship('Member', back_populates='servers', cascade="all,delete-orphan")
    messages = db.relationship('Message', back_populates='servers', cascade="all,delete")
    channels = db.relationship('Channel', back_populates='servers', cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'preview_image': self.preview_image,
            'private': self.private,
            'is_DM': self.is_DM,
            'owner_id':self.owner_id
        }