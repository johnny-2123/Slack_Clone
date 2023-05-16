from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        password="password",
        first_name="Demo",
        last_name="User",
    )
    marnie = User(
        username="marnie",
        email="marnie@aa.io",
        password="password",
        first_name="Marnie",
        last_name="Smith",
    )
    bobbie = User(
        username="bobbie",
        email="bobbie@aa.io",
        password="password",
        first_name="Bobbie",
        last_name="Jones",
    )
    luke = User(
        username="luke",
        email="luke@aa.io",
        password="password",
        first_name="Luke",
        last_name="Skywalker",
    )
    leia = User(
        username="leia",
        email="leia@aa.io",
        password="password",
        first_name="Leia",
        last_name="Organa",
    )
    han = User(
        username="han",
        email="han@aa.io",
        password="password",
        first_name="Han",
        last_name="Solo",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(luke)
    db.session.add(leia)
    db.session.add(han)

    melissa = User(
        username="SegoviaMelissa",
        email="SegoviaMelissa@aa.io",
        password="password",
        first_name="Melissa",
        last_name="Segovia",
    )
    edgar = User(
        username="GarciaEdgar",
        email="GarciaEdgar@aa.io",
        password="password",
        first_name="Edgar",
        last_name="Garcia",
    )
    valentina = User(
        username="FernandezValentina",
        email="FernandezValentina@aa.io",
        password="password",
        first_name="Valentina",
        last_name="Fernandez",
    )
    daniella = User(
        username="GonzalezDaniella",
        email="GonzalezDaniella@aa.io",
        password="password",
        first_name="Daniella",
        last_name="Gonzalez",
    )
    sofia = User(
        username="RodriguezSofia",
        email="RodriguezSofia@aa.io",
        password="password",
        first_name="Sofia",
        last_name="Rodriguez",
    )
    joel = User(
        username="LopezJoel",
        email="LopezJoel@aa.io",
        password="password",
        first_name="Joel",
        last_name="Lopez",
    )
    giovanny = User(
        username="TorresGiovanny",
        email="TorresGiovanny@aa.io",
        password="password",
        first_name="Giovanny",
        last_name="Torres",
    )
    john = User(
        username="PerezJohn",
        email="",
        password="password",
        first_name="John",
        last_name="Perez",
    )
    carlos = User(
        username="SanchezCarlos",
        email="SanchezCarlos@aa.io",
        password="password",
        first_name="Carlos",
        last_name="Sanchez",
    )
    steve = User(
        username="RomeroSteve",
        email="RomeroSteve@aa.io",
        password="password",
        first_name="Steve",
        last_name="Romero",
    )
    bruce = User(
        username="WayneBruce",
        email="WayneBruce@aa.io",
        password="password",
        first_name="Bruce",
        last_name="Wayne",
    )

    db.session.add(melissa)
    db.session.add(edgar)
    db.session.add(valentina)
    db.session.add(daniella)
    db.session.add(sofia)
    db.session.add(joel)
    db.session.add(giovanny)
    db.session.add(john)
    db.session.add(carlos)
    db.session.add(steve)
    db.session.add(bruce)

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
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
