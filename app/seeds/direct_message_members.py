# from app.models import db, User, DirectMessage, direct_message_member

# def seed_direct_message_members():
#     # get some users and direct messages
#     demo = User.query.filter_by(username="Demo").first()
#     luke = User.query.filter_by(username="luke").first()
#     acme_dm = DirectMessage.query.filter_by(topic="Acme DM").first()
#     stark_dm = DirectMessage.query.filter_by(topic="Stark DM").first()

#     # seed some direct message members
#     values = [
#         {"user_id": demo.id, "direct_message_id": acme_dm.id},
#         {"user_id": luke.id, "direct_message_id": acme_dm.id},
#         {"user_id": demo.id, "direct_message_id": stark_dm.id},
#     ]

#     # add the direct message members to the session and commit
#     db.session.execute(direct_message_member.insert().values(values))
#     db.session.commit()


# #UNDO
# def undo_direct_message_members():
#     db.session.execute(direct_message_member.delete())
#     db.session.commit()

