from app.models import db, Workspace, Channel, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channels():
    acme_workspace = Workspace.query.filter_by(name="Acme Corporation").first()
    stark_workspace = Workspace.query.filter_by(name="Stark Industries").first()
    wayne_workspace = Workspace.query.filter_by(name="Wayne Enterprises").first()

    demo = User.query.filter_by(username="Demo").first()
    luke = User.query.filter_by(username="luke").first()
    bruce = User.query.filter_by(username="WayneBruce").first()

    # ACME channels
    acme_general = Channel(
        name="general",
        description="General channel for ACME Corporation",
        topic="General discussion",
        owner=demo,
        workspace=acme_workspace,
    )
    db.session.add(acme_general)

    acme_work_discussion = Channel(
        name="work-discussion",
        description="Channel to talk seriously about work",
        topic="Work Topics Only",
        owner=demo,
        workspace=acme_workspace,
    )
    db.session.add(acme_work_discussion)

    acme_off_topic = Channel(
        name="off-topic",
        description="A place to talk about whatever",
        topic="Anything you want",
        owner=demo,
        workspace=acme_workspace,
    )
    db.session.add(acme_off_topic)

    # Stark channels
    stark_general = Channel(
        name="general",
        description="General channel for Stark Industries",
        topic="General discussion",
        owner=luke,
        workspace=stark_workspace,
    )
    db.session.add(stark_general)

    stark_engineering = Channel(
        name="engineering",
        description="The main channel for the engineering team",
        topic="Building Robots and stuff",
        owner=luke,
        workspace=stark_workspace,
    )
    db.session.add(stark_engineering)

    stark_random = Channel(
        name="random",
        description="Here you can talk about anything",
        topic="Anything but engineering",
        owner=luke,
        workspace=stark_workspace,
    )
    db.session.add(stark_random)

    # Wayne Channels
    wayne_general = Channel(
        name="general",
        description="General channel for wayne",
        topic="General discussion",
        owner=demo,
        workspace=wayne_workspace,
    )
    db.session.add(wayne_general)

    wayne_batcave = Channel(
        name="the-batcave",
        description="The secret batcave, very private",
        topic="Batman stuff",
        owner=demo,
        workspace=wayne_workspace,
        private=True,
    )
    db.session.add(wayne_batcave)

    wayne_batcave.members.append(bruce)

    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
