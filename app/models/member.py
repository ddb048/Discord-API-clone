
from .db import db
from .user import User
from .server import Server
from enum import Enum


#REVIEW - take a second look at Enum, when initializing
#         db we get: ValueError: <enum 'Roles'> is not a valid Enum

class Roles(Enum):
    PENDING = 'pending'
    OWNER = 'owner'
    MEMBER = 'member'

#FIXME -issue migrating
class Member(db.Model):

   roles = db.Column(db.Enum(Roles))
   user_Id = db.Column(db.Integer, db.ForeignKey("users.id")),
   server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))
