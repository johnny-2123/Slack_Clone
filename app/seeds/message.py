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

    message10 = Message(
    user=luke,
    channel=wayne_general,
    content="I'll catch up with you later, Demo.",
    timestamp=datetime(2023, 4, 29, 14, 15, 0),
    parent=message9
    )

    message11 = Message(
    user=demo,
    channel=wayne_general,
    content="Sounds good, Luke. Take care!",
    timestamp=datetime(2023, 4, 29, 14, 20, 0),
    parent=message9
    )

    message12 = Message(
        user=luke,
        channel=wayne_general,
        content="Hey Demo, did you see the email from HR about the new benefits package?",
        timestamp=datetime(2023, 4, 29, 15, 0, 0),
    )
    message13 = Message(
        user=demo,
        channel=wayne_general,
        content="No, I haven't had a chance to check my email yet. What's in it?",
        timestamp=datetime(2023, 4, 29, 15, 5, 0),
    )
    message14 = Message(
        user=luke,
        channel=wayne_general,
        content="They're adding some new perks like free gym memberships and monthly massages.",
        timestamp=datetime(2023, 4, 29, 15, 10, 0),
    )
    message15 = Message(
        user=demo,
        channel=wayne_general,
        content="That sounds amazing! I'll definitely check it out.",
        timestamp=datetime(2023, 4, 29, 15, 15, 0),
    )

    message16 = Message(
    user=luke,
    channel=wayne_general,
    content="Hey Demo, I saw your latest commit on Github. Looks like you're making some great progress!",
    timestamp=datetime(2023, 4, 29, 16, 0, 0),
)

    message17 = Message(
    user=demo,
    channel=wayne_general,
    content="Thanks, Luke! I'm really excited about this project.",
    timestamp=datetime(2023, 4, 29, 16, 5, 0),
    parent=message16
    )

    message18 = Message(
    user=demo,
    channel=wayne_general,
    content="By the way, has anyone heard about the company retreat? When is it happening?",
    timestamp=datetime(2023, 4, 29, 16, 10, 0),
)

    message19 = Message(
    user=luke,
    channel=wayne_general,
    content="I think it's scheduled for next month. They sent out an email about it last week.",
    timestamp=datetime(2023, 4, 29, 16, 15, 0),
    parent=message18
    )

    message20 = Message(
    user=demo,
    channel=wayne_general,
    content="Oh, I must have missed that. Thanks for letting me know!",
    timestamp=datetime(2023, 4, 29, 16, 20, 0),
    parent=message18
    )

    message21 = Message(
    user=demo,
    channel=wayne_general,
    content="Hey Luke, do you want to grab drinks after work tonight?",
    timestamp=datetime(2023, 4, 29, 17, 0, 0),
    )

    message22 = Message(
    user=luke,
    channel=wayne_general,
    content="Sure, that sounds great! What time and where?",
    timestamp=datetime(2023, 4, 29, 17, 5, 0),
    parent=message21
    )

    message23 = Message(
    user=demo,
    channel=wayne_general,
    content="How about 7pm at that new bar on 5th street?",
    timestamp=datetime(2023, 4, 29, 17, 10, 0),
    parent=message21
    )

    message24 = Message(
    user=luke,
    channel=wayne_general,
    content="Sounds good to me! I'll see you guys there.",
    timestamp=datetime(2023, 4, 29, 17, 15, 0),
    parent=message22
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.add(message13)
    db.session.add(message14)
    db.session.add(message15)
    db.session.add(message16)
    db.session.add(message17)
    db.session.add(message18)
    db.session.add(message19)
    db.session.add(message20)
    db.session.add(message21)
    db.session.add(message22)
    db.session.add(message23)
    db.session.add(message24)

    db.session.commit()


def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
