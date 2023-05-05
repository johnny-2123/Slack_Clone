from app.models import db, User, Workspace, environment, SCHEMA
from flask import current_app

from sqlalchemy.sql import text


def seed_workspace_members():

    acme_workspace = Workspace.query.filter_by(name="Acme Corporation").first()
    stark_workspace = Workspace.query.filter_by(name="Stark Industries").first()
    wayne_workspace = Workspace.query.filter_by(name="Wayne Enterprises").first()

    demo = User.query.filter_by(username="Demo").first()
    marnie = User.query.filter_by(username="marnie").first()
    bobbie = User.query.filter_by(username="bobbie").first()
    luke = User.query.filter_by(username="luke").first()
    leia = User.query.filter_by(username="leia").first()
    han = User.query.filter_by(username="han").first()
    bruce = User.query.filter_by(username="WayneBruce").first()

    acme_workspace.members.extend([demo, marnie, bobbie, luke, han, bruce])


    stark_workspace.members.extend([luke, leia, han])

    wayne_workspace.members.extend([demo, marnie, bobbie, luke, leia, bruce])

    db.session.commit()


def undo_workspace_members():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.workspace_members RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM workspace_members"))

    db.session.commit()
