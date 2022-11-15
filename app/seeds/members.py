from app.models import db, Member, environment, SCHEMA
# REVIEW  do i need to import Roles?

def seed_members():
  mem1= Member(
    user_id=1,
    server_id=1,
    roles='Owner'
    )

  mem2= Member(
    user_id=2,
    server_id=2,
    roles='Owner'
    )

  mem3= Member(
    user_id=3,
    server_id=3,
    roles='Owner'
    )

  mem4= Member(
    user_id=4,
    server_id=4,
    roles='Owner'
    )

  mem5= Member(
    user_id=5,
    server_id=5,
    roles='Owner'
    )

  mem6= Member(
    user_id=6,
    server_id=6,
    roles='Owner'
    )

  mem7= Member(
    user_id=7,
    server_id=7,
    roles='Owner'
    )

  mem8= Member(
    user_id=8,
    server_id=8,
    roles='Owner'
    )

  mem9= Member(
    user_id=9,
    server_id=9,
    roles='Owner'
    )

  mem10= Member(
    user_id=10,
    server_id=10,
    roles='Owner'
    )

  mem11= Member(
    user_id=11,
    server_id=1,
    roles='Member'
    )

  mem12= Member(
    user_id=12,
    server_id=2,
    roles='Member'
    )

  mem13= Member(
    user_id=13,
    server_id=8,
    roles='Member'
    )

  mem14= Member(
    user_id=14,
    server_id=3,
    roles='Member'
    )
  mem15 = Member(
    user_id=15,
    server_id=4,
    roles='Member'
    )
  mem16 = Member(
    user_id=16,
    server_id=9,
    roles='Member'
    )
  mem17 = Member(
    user_id=17,
    server_id=10,
    roles='Member'
    )
  mem18 = Member(
    user_id=18,
    server_id=5,
    roles='Member'
    )
  mem19 = Member(
    user_id=19,
    server_id=6,
    roles='Member'
    )
  mem20 = Member(
    user_id=20,
    server_id=7,
    roles='Member'
    )
  db.session.add(mem1)
  db.session.add(mem2)
  db.session.add(mem3)
  db.session.add(mem4)
  db.session.add(mem5)
  db.session.add(mem6)
  db.session.add(mem7)
  db.session.add(mem8)
  db.session.add(mem9)
  db.session.add(mem11)
  db.session.add(mem12)
  db.session.add(mem13)
  db.session.add(mem14)
  db.session.add(mem15)
  db.session.add(mem16)
  db.session.add(mem17)
  db.session.add(mem18)
  db.session.add(mem19)
  db.session.add(mem20)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the members table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE type {SCHEMA}.roles;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM members")
        db.session.execute("DROP TYPE roles")

    db.session.commit()
