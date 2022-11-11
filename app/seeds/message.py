from app.models import db, Message

def seed_messages():
  msg1=Message(
    id=1,
    chat_name='Demo',
    is_voice=False,
    description='Hey there, friend!',
    server_id=1
    ),

  db.session.add(msg1)

def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
