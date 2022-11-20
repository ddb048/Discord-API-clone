from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Member, Server, Channel, db
from .auth_routes import validation_errors_to_error_messages
from ..forms.new_server_form import New_server

servers_routes = Blueprint('servers', __name__)


# SECTION - Get all channels by server id
@servers_routes.route('/<int:id>/channels')
@login_required
def get_channels(id):

    channels = Channel.query.filter(Channel.server_id == int(id)).all()

    return {'channels': [channel.to_dict() for channel in channels]}


# SECTION - Get all members of a server
@servers_routes.route('/<int:id>/members')
# @login_required
def get_all_member(id):
    member = Member.query.filter_by(server_id=int(id)).all()
    if len(member):
        res = []
        for x in member:
            res.append(x.users.to_dict())
        return res, 200
    else:
        return {
            "errors": 'no members found',
            'Status code': 404
        }, 404


# SECTION - Add a user to a server
@servers_routes.route('/<int:server_id>/members/<int:user_id>', methods=['POST'])
@login_required
def add_a_member(user_id, server_id):
    member = Member(
        roles='Pending',
        user_id=user_id,
        server_id=server_id
    )
    db.session.add(member)
    db.session.commit()
    print('====>', member.to_dict())
    print('ROLES====>', member.roles)
    return member.to_dict()


# SECTION -  Update roles
@servers_routes.route('/<int:server_id>/members/<int:user_id>', methods=["PUT"])
@login_required
def update_role(server_id, user_id):
    member_server_list = Member.query.filter_by(user_id=int(user_id)).all()
    member = None
    for x in member_server_list:
        print('====>', x)
        if x.server_id == server_id:
         member=x
    member.roles='Member'
    db.session.commit()

    return member.to_dict()



# SECTION - Remove a user from a server
@servers_routes.route('/<int:server_id>/members/<int:user_id>', methods=["DELETE"])
@login_required
def delete_user_from_server(server_id,user_id):
    member_server_list = Member.query.filter_by(user_id=int(user_id)).all()
    member = None
    if len(member_server_list):
      for x in member_server_list:
        if x.server_id == server_id:
         member=x
      db.session.delete(member)
      db.session.commit()
      return{
        'message': 'Member removed',
        'Status code':404
      },302
    else:
        return {
            'errors': 'User is not a member of this server',
            'Status code': 404
        }, 404


# SECTION -  - Get all servers/ Discoveries
# TODO - error handling needs to be added
@servers_routes.route('/')
def servers():
    servers = Server.query.all()
    for server in servers:
        print(server.users)
    return {'servers': [server.to_dict() for server in servers]}


# SECTION - Get all servers that are_owned by curr_user
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
        elif id in [x["user_id"] for x in server['members']]:
            res.append(server)
        # for x in server['members']:
        #     print('===========',x)
    return {'servers': res}, 200


# SECTION - get single server
@servers_routes.route('/<int:id>')
def server(id):
    server = Server.query.get(int(id))
    if server:
        return server.to_dict(), 200
    else:
        return {
            'errors': 'server not found',
            'Status code': 404
        }, 404


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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


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
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    else:
        return {
            'errors': 'server not found',
            'code': 404
        }, 404


# SECTION - delete a serve
# TODO - error handling needs to be added
@servers_routes.route('/@me/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    server = Server.query.get(int(id))
    if server:
        db.session.delete(server)
        db.session.commit()
        return {
            'message': 'Server successfully deleted',
            'Status code': 302
        }, 302
    else:
        return {
            'errors': 'server not found',
            'Status code': 404
        }, 404
