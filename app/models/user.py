from .db import db, environment, SCHEMA
from .member import Member
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
#TODO - add columns for first name and last name
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    profile_pic = db.Column(db.String(255))
    username = db.Column(db.String(10), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
    # relationship
    servers = db.relationship('Member', back_populates='users', cascade="all,delete")
    messages = db.relationship('Message', back_populates='users', cascade="all,delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

#TODO - add remaining columns to dictionary which match the backend
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'profile_pic': self.profile_pic,
        }
