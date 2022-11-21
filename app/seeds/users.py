from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        first_name='Demo',
        last_name='Smith',
        profile_pic='https://www.pwnandpatch.com/wp-content/uploads/2019/07/50-Security-icons_31.png',
        username='Demo',
        email='demo@aa.io',
        password='password'
    )
    user2 = User(
        first_name='Lyda',
        last_name='Rodriguez',
        profile_pic='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-556.jpg',
        username='Lyda',
        email='lyda@aa.io',
        password='password'
    )
    user3 = User(
        first_name='Bobbie',
        last_name='Koss',
        profile_pic='https://www.pwnandpatch.com/wp-content/uploads/2019/07/50-Security-icons_31.png',
        username='Bobbie',
        email='bobbie@aa.io',
        password='password'
    )
    user4 = User(
        first_name='Johnny',
        last_name='Anderson',
        profile_pic='https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png',
        username='Johnny',
        email='johnny@aa.io',
        password='password'
    )
    user5 = User(
        first_name='Keshaun',
        last_name='Huels',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        username='Keshaun',
        email='keshaun@aa.io',
        password='password'
    )
    user6 = User(
        first_name='Ryder',
        last_name='Schmitt',
        profile_pic='https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Programmer-512.png',
        username='Ryder',
        email='ryder@aa.io',
        password='password'
    )
    user7 = User(
        first_name='Kane',
        last_name='Gislason',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        username='kane',
        email='kane@aa.io',
        password='password'
    )
    user8 = User(
        first_name='Isom',
        last_name='Walsh',
        profile_pic='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-562.jpg',
        username='Isom',
        email='isom@aa.io',
        password='password'
    )
    user9 = User(
        first_name='Catherine',
        last_name='Rempel',
        profile_pic='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg',
        username='Catherine',
        email='catherine@aa.io',
        password='password'
    )
    user10 = User(
        first_name='Lazaro',
        last_name='Ankunding',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg',
        username='Lazaro',
        email='lazaro@aa.io',
        password='password'
    )
    user11 = User(
        first_name='Melvina',
        last_name='Mante',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
        username='Melvina',
        email='melvina@aa.io',
        password='password'
    )
    user12 = User(
        first_name='Emery',
        last_name='Rosenbaum',
        profile_pic='https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.jpg',
        username='Emery',
        email='emery@aa.io',
        password='password'
    )
    user13 = User(
        first_name='Lenora',
        last_name='Donnelly',
        profile_pic='https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg',
        username='Lenora',
        email='lenora@aa.io',
        password='password'
    )
    user14 = User(
        first_name='Sammy',
        last_name='Green',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/253/non_2x/beautiful-woman-wearing-sunglasses-avatar-character-icon-free-vector.jpg',
        username='Sammy',
        email='sammy@aa.io',
        password='password'
    )
    user15 = User(
        first_name='Malinda',
        last_name='White',
        profile_pic='https://static.vecteezy.com/system/resources/previews/002/002/247/non_2x/beautiful-black-woman-avatar-character-icon-free-vector.jpg',
        username='Malinda',
        email='malinda@aa.io',
        password='password'
    )
    user16 = User(
        first_name='Kaelyn',
        last_name='Lemke',
        profile_pic='https://static.vecteezy.com/ti/gratis-vektor/p1/2002297-schone-frau-avatar-charakter-ikone-kostenlos-vektor.jpg',
        username='Kaelyn',
        email='kaelyn@aa.io',
        password='password'
    )
    user17 = User(
        first_name='Raphaelle',
        last_name='Jacobi',
        profile_pic='https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Programmer-512.png',
        username='Raphaellee',
        email='raphaelle@aa.io',
        password='password'
    )
    user18 = User(
        first_name='Billie',
        last_name='Gulgowski',
        profile_pic='https://www.nicepng.com/png/detail/804-8049853_med-boukrima-specialist-webmaster-php-e-commerce-web.png',
        username='Billie',
        email='billie@aa.io',
        password='password'
    )
    user19 = User(
        first_name='Elton',
        last_name='Schaefer',
        profile_pic='https://www.pwnandpatch.com/wp-content/uploads/2019/07/50-Security-icons_31.png',
        username='Elton',
        email='elton@aa.io',
        password='password'
    )
    user20 = User(
        first_name='Arvilla',
        last_name='Wolff',
        profile_pic='https://cdn-icons-png.flaticon.com/512/1154/1154462.png',
        username='Arvilla',
        email='arvilla@aa.io',
        password='password'
    )


    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)
    db.session.add(user16)
    db.session.add(user17)
    db.session.add(user18)
    db.session.add(user19)
    db.session.add(user20)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
