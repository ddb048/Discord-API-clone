from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel

servers_routes = Blueprint('servers',__name__)


@servers_routes.route('/')
@login_required
def servers():
    servers = Channel.query.all()
    return {'channels':[channel.to_dict() for channel in servers]}