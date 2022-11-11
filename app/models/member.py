
from .db import db
# from .user import User
# from .server import Server
import enum
from sqlalchemy.sql import func

#REVIEW - take a second look at Enum, when initializing
#         db we get: ValueError: <enum 'Roles'> is not a valid Enum

class Roles(enum.Enum):
    PENDING = 'Pending'
    OWNER = 'Owner'
    MEMBER = 'Member'

#FIXME -issue migrating
class Member(db.Model):
   __tablename__= 'members'

   id = db.Column(db.Integer, primary_key=True)
   roles = db.Column(db.Enum(Roles, values_callable=lambda x: [str(user.value) for user in Roles]), nullable=False)
   user_id = db.Column(db.Integer, db.ForeignKey("users.id")),
   server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))
   created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
   updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
