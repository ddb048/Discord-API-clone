from app.models import db, Channel

def seed_channels():
  channel1 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel2 = Channel(
    name="Astrology Lovers",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel3 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel4 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel5 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel6 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel7 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel8 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel9 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    ),
  channel10 = Channel(
    name="",
    is_voice=False,
    description="",
    server_id=1,
    )

  db.session.add(channel1)
  db.session.add(channel2)
  db.session.add(channel3)
  db.session.add(channel4)
  db.session.add(channel5)
  db.session.add(channel6)
  db.session.add(channel7)
  db.session.add(channel8)
  db.session.add(channel9)
  db.session.add(channel10)



  # Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
