from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server

servers_routes = Blueprint('servers',__name__)


@servers_routes.route('/')
@login_required
def servers():
    servers = Server.query.all()
    return {'servers':[server.to_dict() for server in servers]}