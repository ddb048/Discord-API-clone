from app.models import db, Server

def seed_servers():
  server1 = Server(
    name='Genderqueer',
    preview_image='',
    is_DM=False,
    owner_id=1
    )

  db.session.add(server1)

    # Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
