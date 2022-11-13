from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import Member, Server, Channel, db
from ..forms.new_server_form import New_server

servers_routes = Blueprint('servers', __name__)


# SECTION -  - Get all server/ Discoveries
# TODO - error handling needs to be added
@servers_routes.route('/')
def servers():
    servers = Server.query.all()
    for server in servers:
        print(server.users)
    return {'servers': [server.to_dict() for server in servers]}


# SECTION - Get all sever that are_owned by curr_user
#           and curr_user is_member.
# TODO - error handling needs to be added
@servers_routes.route('/@me')
@login_required
def user_servers():
    id = current_user.id
    all_servers = Server.query.all()
    all_servers_list = [server.to_dict() for server in all_servers]
    print(all_servers_list)
    res = []
    for server in all_servers_list:
        # print("=======>",server['owner_id'])
        if server['owner_id'] == id:
            res.append(server)
        elif id in server['members']:
            res.append(server)
    return {'servers': res}, 200


# SECTION - Create a new server
# TODO - error handling needs to be added
@servers_routes.route('/@me', methods=["POST"])
@login_required
def create_server():
    form = New_server()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server()
        # name=form.data['name'],
        # preview_image=form.data['preview_image'],
        # private=form.data['private'],
        # server_description=form.data['server_description'],
        # is_DM= form.data['is_DM'],
        # owner_id=current_user.id

        form.populate_obj(server)
        server.owner_id = current_user.id
# NOTE - needed to add/commit first to be able to have access to newly
#       created server data before adding member.
        db.session.add(server)
        db.session.commit()

        channel = Channel()
        channel.name = "General"
        channel.is_voice = False
        channel.description = 'General Chat'
        channel.server_id = server.id

        channel1 = Channel()
        channel1.name = "Welcome"
        channel1.is_voice = False
        channel1.description = "Welcome all new members"
        channel1.server_id = server.id

        db.session.add(channel)
        db.session.add(channel1)
        db.session.commit()

        member = Member(
            roles='Owner',
            user_id=current_user.id,
            server_id=server.to_dict()['id']
        )
        db.session.add(member)
        db.session.commit()

        return server.to_dict(), 200
    else:
        return {
            'message': 'unable to add server',
            'code': 404
        }, 404


# SECTION - update a server
# TODO - error handling needs to be added
@servers_routes.route('/@me/<int:id>', methods=['PUT'])
@login_required
def update_server(id):
    server = Server.query.get(int(id))
    if server:
        form = New_server()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(server)

            db.session.commit()
            return server.to_dict(), 201

    else:
        return {
            'message': 'server not found',
            'code': 404
        }, 404



#SECTION - delete a serve
# TODO - error handling needs to be added
@servers_routes.route('/@me/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    server=Server.query.get(int(id))
    if server:
        db.session.delete(server)
        db.session.commit()
        redirect('/@me')
        return {
            'message': 'Server successfully deleted',
            'Status code':302
        }, 302
    else:
        return {
            'message': 'server not found',
            'Status code': 404
        }, 404
