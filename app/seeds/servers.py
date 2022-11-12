from app.models import db, Server
 
def seed_servers():
  server1 = Server(
    name='Genderqueer',
    preview_image='https://images.vexels.com/media/users/3/167644/isolated/preview/9834ba3f6ebddaaed684f147f4df140c-genderqueer-heart-stripe-pixel-flat.png',
    server_description='A place for any genderqueer person within the nonbinary spectrum to be supported and make friends, or for binaries who support us!',
    private=False,
    is_DM=False,
    owner_id=1
    )
  server2 = Server(
    name="The Aspace",
    preview_image="https://64.media.tumblr.com/a0fdbdc482793b8dd5491fade0970673/5dc7c87ab456d574-3b/s540x810/56ebea18d5a1d1c23b23963732ccb61ff52b0c65.jpg",
    server_description="The Aspace is a chill and SFW server designed for people on the asexual, aromantic, aplatonic, and/or agender spectrums! We're welcoming to all identities.",
    private=False,
    is_DM=False,
    owner_id=2
    )
  server3 = Server(
    name="Queer Christians",
    preview_image="https://i.dlpng.com/static/png/6889926_preview.png",
    server_description="We are a welcoming community for LGBTQ+ Christians looking for a safe space to be themselves! There's also opportunities to play games, get help with school, discuss hobbies, and build new friendships.",
    private=False,
    is_DM=False,
    owner_id=3
    )
  server4 = Server(
    name="The Drag Haven",
    preview_image="https://i.dlpng.com/static/png/6889926_preview.png",
    server_description="Come join a small community of likeminded individuals who like the art of drag.",
    private=False,
    is_DM=False,
    owner_id=4
    )
  server5 = Server(
    id=5,
    name="Queer Alliance",
    preview_image='https://www.prnewsonline.com/wp-content/uploads/2020/06/shutterstock_1124164049-540x304.jpg',
    server_description="This space is dedicated to non cisgender people, which includes but is not limited to: agender, genderqueer, nonbinary, trans, genderfluid, bigender, multigender, and all of those who fall under the gender expansive umbrella.",
    private=False,
    is_DM=False,
    owner_id=5
    )
  server6 = Server(
    name="Rainbow Cafe",
    preview_image='https://www.rainbowcafe.org/uploads/b/88eaa357def2b9bd201afbeea6c328d24114262c58e00514a10f61328aa339a7/2021-10-27_12-34-24_1635356108.png',
    server_description="Welcome to the Rainbow Cafe, we have been a safe place for over a year with very different people from heterosexual to polyamourus and between bi and transgender, conversely everything is there.",
    private=False,
    is_DM=False,
    owner_id=6
    )
  server7 = Server(
    name="Pots and Pans",
    preview_image='https://ih1.redbubble.net/image.3775945049.4155/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg',
    server_description="Hiya! Our server is a safe space for pansexuals, panromantics, & gender-fluids as long as you're one of above feel free to join.",
    private=False,
    is_DM=False,
    owner_id=7
    )
  server8 = Server(
    name="Sapphic Gardens",
    preview_image="https://www.flagcolorcodes.com/data/Sapphic-Pride-Flag.png",
    server_description="Hello there! We would love to have you here, this is a fun server for any and all lesbians.",
    private=False,
    is_DM=False,
    owner_id=8
    )
  server9 = Server(
    name="The Aro & Ace Café",
    preview_image='https://i.pinimg.com/736x/12/d1/cd/12d1cddb7a3cd2b3b9d2f133f14a00b0.jpg',
    server_description="We are a chill and supportive server for aros and aces of all ages (13+). You are also welcome if you are questioning or want to learn more about aromanticism and asexuality!",
    private=False,
    is_DM=False,
    owner_id=9
    )
  server10 = Server(
    name="Pride Eye",
    preview_image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/LGBTQ%2B_rainbow_flag_Quasar_%22Progress%22_variant.svg/2560px-LGBTQ%2B_rainbow_flag_Quasar_%22Progress%22_variant.svg.png",
    server_description="This is an all welcoming community. No matter what your race, gender, sexuality, or disabilities are you're welcome here.",
    private=False,
    is_DM=True,
    owner_id=10
    )

  db.session.add(server1)
  db.session.add(server2)
  db.session.add(server3)
  db.session.add(server4)
  db.session.add(server5)
  db.session.add(server6)
  db.session.add(server7)
  db.session.add(server8)
  db.session.add(server9)
  db.session.add(server10)

  db.session.commit()


    # Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
