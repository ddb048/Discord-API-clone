
from .db import db, SCHEMA, environment, add_prefix_for_prod
# from .user import User
# from .server import Server
# import enum
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

# REVIEW - take a second look at Enum, when initializing
#         db we get: ValueError: <enum 'Roles'> is not a valid Enum

# class Roles(enum.Enum):
#     PENDING = 'Pending'
#     OWNER = 'Owner'
#     MEMBER = 'Member'

# FIXME -issue migrating


class Member(db.Model):
    __tablename__ = 'members'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    roles = db.Column(db.String(50), nullable=False)
    user_id = db.Column(ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True)
    server_id = db.Column(ForeignKey(
        add_prefix_for_prod("servers.id")), primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())
    servers = db.relationship('Server', back_populates='users')
    users = db.relationship('User', back_populates='servers')

    def to_dict(self):
        return {
            'role': self.roles,
            'user_id': self.user_id,
            'server_id': self.server_id,
            'user_info': self.users.to_dict()
        }
