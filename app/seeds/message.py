from app.models import db, Message, User, Channel, environment, SCHEMA
from sqlalchemy.sql import text

from datetime import datetime


def seed_messages():
    wayne_general = Channel.query.filter_by(name="general").first()
    demo = User.query.filter_by(username="Demo").first()
    luke = User.query.filter_by(username="luke").first()

    message1 = Message(
        user=demo,
        channel=wayne_general,
        content="Hey everyone, just wanted to remind you about the meeting today at 2pm.",
        timestamp=datetime(2023, 4, 29, 13, 30, 0),
    )
    message2 = Message(
        user=luke,
        channel=wayne_general,
        content="Thanks for the reminder Demo!",
        timestamp=datetime(2023, 4, 29, 13, 35, 0),
    )
    message3 = Message(
        user=luke,
        channel=wayne_general,
        content="By the way, has anyone seen the new Batman trailer? It looks amazing!",
        timestamp=datetime(2023, 4, 29, 13, 40, 0),
    )
    message4 = Message(
        user=demo,
        channel=wayne_general,
        content="I haven't seen it yet, but I'll check it out later.",
        timestamp=datetime(2023, 4, 29, 13, 45, 0),
    )
    message5 = Message(
        user=luke,
        channel=wayne_general,
        content="You should definitely watch it. I'm a huge Batman fan and this looks like it might be the best one yet.",
        timestamp=datetime(2023, 4, 29, 13, 50, 0),
    )

    message6 = Message(
        user=demo,
        channel=wayne_general,
        content="I'll add it to my list.",
        timestamp=datetime(2023, 4, 29, 13, 55, 0),
    )
    message7 = Message(
        user=demo,
        channel=wayne_general,
        content="By the way, has anyone seen the latest financial report? We're doing pretty well this quarter.",
        timestamp=datetime(2023, 4, 29, 14, 0, 0),
    )
    message8 = Message(
        user=luke,
        channel=wayne_general,
        content="That's great news. Keep up the good work, Demo!",
        timestamp=datetime(2023, 4, 29, 14, 5, 0),
    )
    message9 = Message(
        user=luke,
        channel=wayne_general,
        content="I have to run to a meeting, but I'll catch up with you guys later.",
        timestamp=datetime(2023, 4, 29, 14, 10, 0),
    )

    db.session.add(message9)
    db.session.add(message8)
    db.session.add(message7)
    db.session.add(message6)
    db.session.add(message5)
    db.session.add(message4)
    db.session.add(message3)
    db.session.add(message2)
    db.session.add(message1)

    db.session.commit()


def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
