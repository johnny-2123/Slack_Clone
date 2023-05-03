from app.models import db, User, Workspace, environment, SCHEMA
from flask import current_app

from sqlalchemy.sql import text


def seed_workspace_members():
    # with current_app.app_context():

    acme_workspace = Workspace.query.filter_by(name="Acme Corporation").first()
    stark_workspace = Workspace.query.filter_by(name="Stark Industries").first()
    wayne_workspace = Workspace.query.filter_by(name="Wayne Enterprises").first()

    demo = User.query.filter_by(username="Demo").first()
    marnie = User.query.filter_by(username="marnie").first()
    bobbie = User.query.filter_by(username="bobbie").first()
    luke = User.query.filter_by(username="luke").first()
    leia = User.query.filter_by(username="leia").first()
    han = User.query.filter_by(username="han").first()

    # member1 = WorkspaceMember(workspace=acme_workspace, user=demo, status="admin")
    # member2 = WorkspaceMember(workspace=acme_workspace, user=marnie, status="member")
    # member3 = WorkspaceMember(workspace=acme_workspace, user=bobbie, status="member")
    # member4 = WorkspaceMember(workspace=acme_workspace, user=luke, status="member")
    # member5 = WorkspaceMember(workspace=acme_workspace, user=han, status="member")
    acme_workspace.members.extend([demo, marnie, bobbie, luke, han])
    

    # member6 = WorkspaceMember(workspace=stark_workspace, user=luke, status="admin")
    # member7 = WorkspaceMember(workspace=stark_workspace, user=leia, status="member")
    # member8 = WorkspaceMember(workspace=stark_workspace, user=han, status="member")
    stark_workspace.members.extend([luke, leia, han])

    # member9 = WorkspaceMember(workspace=wayne_workspace, user=demo, status="admin")
    # member10 = WorkspaceMember(workspace=wayne_workspace, user=marnie, status="member")
    # member11 = WorkspaceMember(workspace=wayne_workspace, user=bobbie, status="member")
    # member12 = WorkspaceMember(workspace=wayne_workspace, user=luke, status="admin")
    # member13 = WorkspaceMember(workspace=wayne_workspace, user=leia, status="member")
    wayne_workspace.members.extend([demo, marnie, bobbie, luke, leia])

    # db.session.add(member1)
    # db.session.add(member2)
    # db.session.add(member3)

    # db.session.add(member4)
    # db.session.add(member5)
    # db.session.add(member6)
    # db.session.add(member7)
    # db.session.add(member8)
    # db.session.add(member9)
    # db.session.add(member10)
    # db.session.add(member11)
    # db.session.add(member12)
    # db.session.add(member13)
    db.session.commit()


def undo_workspace_members():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.workspace_members RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM workspace_members"))

    db.session.commit()
