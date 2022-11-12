from app.models import db, Channel

def seed_channels():
  channel1 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=1
    )
  channel2 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=1
    )
  channel3 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=2
    )
  channel4 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=2
    )
  channel5 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=3
    )
  channel6 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=3
    )
  channel7 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=4
    )
  channel8 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=4
    )
  channel9 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=5
    )
  channel10 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=5
    )
  channel11 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=6
    )
  channel12 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=6
    )
  channel13 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=7,
    )
  channel14=Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=7
    )
  channel15 = Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=8
    )
  channel16 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=8
    )
  channel17= Channel(
    name="welcome",
    is_voice=False,
    description="Welcome all new members",
    server_id=9
    )
  channel18 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=9
    )
  channel19 = Channel(
    name="Direct Messages",
    is_voice=False,
    description="",
    server_id=10
    )
  channel20 = Channel(
    name="general",
    is_voice=False,
    description="General chat",
    server_id=10
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
  db.session.add(channel11)
  db.session.add(channel12)
  db.session.add(channel13)
  db.session.add(channel14)
  db.session.add(channel15)
  db.session.add(channel16)
  db.session.add(channel17)
  db.session.add(channel18)
  db.session.add(channel19)
  db.session.add(channel20)

  db.session.commit()

  # Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
