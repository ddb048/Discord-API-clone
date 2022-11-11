from app.models import db, Member, Roles
# REVIEW roles: do we use the Enum name or value?
# FIXME user_id in member model is both snake case and camel case, must be fixed
def seed_members():
  mem1= Member(
    roles='Owner, Pending, Member',
    user_id=1,
    server_id=1
    )

  db.session.add(mem1)

def undo_members():
  db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
  db.session.commit()
