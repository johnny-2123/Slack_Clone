from app.models import db, User, DirectMessage, direct_message_member

def seed_direct_message_members():
    # get some users and direct messages
    demo = User.query.filter_by(username="Demo").first()
    luke = User.query.filter_by(username="luke").first()
    acme_dm = DirectMessage.query.filter_by(topic="Acme DM").first()
    stark_dm = DirectMessage.query.filter_by(topic="Stark DM").first()

    # seed some direct message members
    member1 = DirectMessageMember(user=demo, direct_message=acme_dm)
    member2 = DirectMessageMember(user=luke, direct_message=acme_dm)
    member3 = DirectMessageMember(user=demo, direct_message=stark_dm)

    # add the direct message members to the session and commit
    db.session.add_all([member1, member2, member3])
    db.session.commit()

#UNDO

def undo_direct_message_members():
    db.session.execute('TRUNCATE direct_message_members RESTART IDENTITY CASCADE;')
    db.session.commit()
