
from .db import db
from models.user import User
from models.server import Server
import enum

class Roles(enum.Enum):
    PENDING = 'pending'
    OWNER = 'owner'
    MEMBER = 'member'
        

class Member(db.Model):

   roles = db.Column(enum.Enum(Roles)) 
   user_Id = db.Column(db.Integer, db.ForeignKey("users.id")),
   server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))
    