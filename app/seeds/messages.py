from app.models import db, Message
def seed_messages():
  # member 1 in Pride Eye(private) channel 
  msg1=Message(
    message_body='Hey there, friend! How are you?',
    server_id= 10,
    channel_id=19,
    owner_id=10
    ),
  # member 2 in Pride Eye(private) channel
  msg2=Message(
    message_body="I'm good, just relaxing. How's it going?",
    server_id=10,
    channel_id=19,
    owner_10=17
    )
  # member 1 in Pride Eye(private) channel
  msg3=Message(
    message_body="That's sounds nice. I just got home! Going to enjoy my favorite book before heading to bed.",
    server_id= 10,
    channel_id= 19,
    owner_id = 10
    )
  # member 2 in Pride Eye(private) channel
  msg4=Message(
    message_body="Sounds like a great plan, enjoy your night buddy. Let's talk again soon.",
    server_id=10,
    channel_id=19,
    owner_id=17
    )
  # member 1 in general channel
  msg5=Message(
    message_body= "Hello!",
    server_id=1,
    channel_id=2,
    owner_id=1
    )
   # member 2 in general channel
  msg6=Message(
    message_body= "Hi, everyone",
    server_id= 2,
    channel_id= 2,
    owner_id= 2
    )
   # member 3 in general channel
  msg7=Message(
    message_body= "What's up?",
    server_id=3,
    channel_id=2,
    owner_id=3
    )
   # member 4 in general channel
  msg8=Message(
    message_body= "helloooo from the otheerrr siiiiiiiiddeeeee",
    server_id=4,
    channel_id=2,
    owner_id=4
    )
   # member 5 in general channel
  msg9=Message(
    message_body= "Sup, friends!",
    server_id=5,
    channel_id=2,
    owner_id=5
    )
   # member 6 in general channel
  msg10=Message(
    message_body= "Welcome new friends",
    server_id=6,
    channel_id=2,
    owner_id=6
    )
   # member 7 in general channel
  msg11=Message(
    message_body= "Hi",
    server_id=7,
    channel_id=2,
    owner_id=7
    )
   # member 8 in general channel
  msg12=Message(
    message_body= "Yo, who wants to be friends?",
    server_id=8,
    channel_id=2,
    owner_id=8
    )
   # member 9 in general channel
  msg13=Message(
    message_body= "Hello.... it's me",
    server_id=9,
    channel_id=2,
    owner_id=9
    )
   # member 10 in general channel
  msg14=Message(
    message_body= "I'm so glad we are all friends here.",
    server_id=10,
    channel_id=2,
    owner_id=10
    )


  db.session.add(msg1)
  db.session.add(msg2)
  db.session.add(msg3)
  db.session.add(msg4)
  db.session.add(msg5)
  db.session.add(msg6)
  db.session.add(msg7)
  db.session.add(msg8)
  db.session.add(msg9)
  db.session.add(msg10)
  db.session.add(msg11)
  db.session.add(msg12)
  db.session.add(msg13)
  db.session.add(msg14)

  db.session.commit()

def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
