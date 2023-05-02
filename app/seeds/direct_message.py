from app.models import db, DirectMessage, Workspace, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_direct_messages():
    acme_workspace = Workspace.query.filter_by(name="Acme Corporation").first()
    stark_workspace = Workspace.query.filter_by(name="Stark Industries").first()
    wayne_workspace = Workspace.query.filter_by(name="Wayne Enterprises").first()

    demo = User.query.filter_by(username="Demo").first()
    luke = User.query.filter_by(username="luke").first()
    bruce = User.query.filter_by(username="WayneBruce").first()

    dm1 = DirectMessage(
        topic="Project X",
        workspace_id=acme_workspace.id,
        last_sent_message_timestamp=datetime.utcnow()
    )

    dm2 = DirectMessage(
        topic="Budget",
        workspace_id=stark_workspace.id,
        last_sent_message_timestamp=datetime.utcnow()
    )

    dm3 = DirectMessage(
        topic="Marketing Strategy",
        workspace_id=wayne_workspace.id,
        last_sent_message_timestamp=datetime.utcnow()
    )

    dm1.members.extend([demo, luke])
    dm2.members.extend([demo, bruce])
    dm3.members.extend([luke, bruce])

    db.session.add_all([dm1, dm2, dm3])
    db.session.commit()

#UNDO
def undo_direct_messages():
    db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
