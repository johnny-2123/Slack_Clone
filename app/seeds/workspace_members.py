from app.models import db, User, Workspace, WorkspaceMember, environment, SCHEMA
from sqlalchemy.sql import text

demo = User.query.filter_by(username="demo").first()


def seed_workspace_members():

    acme_workspace = Workspace.query.filter_by(name='Acme Corporation').first()
    stark_workspace = Workspace.query.filter_by(
        name='Stark Enterprises').first()
    wayne_workspace = Workspace.query.filter_by(
        name='Wayne Enterprises').first()

    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()
    luke = User.query.filter_by(username='luke').first()
    leia = User.query.filter_by(username='leia').first()
    han = User.query.filter_by(username='han').first()

    member1 = WorkspaceMember(
        workspace_id=acme_workspace.id, member_id=marnie.id, role='admin')
    member2 = WorkspaceMember(
        workspace_id=acme_workspace.id, member_id=bobbie.id, role='member')
    member3 = WorkspaceMember(
        workspace_id=acme_workspace.id, member_id=luke.id, role='member')
    member4 = WorkspaceMember(
        workspace_id=acme_workspace.id, member_id=leia.id, role='member')
    member5 = WorkspaceMember(
        workspace_id=acme_workspace.id, member_id=han.id, role='member')
    member6 = WorkspaceMember(
        workspace_id=stark_workspace.id, member_id=han.id, role='admin')
    member7 = WorkspaceMember(
        workspace_id=stark_workspace.id, member_id=leia.id, role='member')

    member8 = WorkspaceMember(
        workspace_id=wayne_workspace.id, member_id=han.id, role='member')
    member9 = WorkspaceMember(
        workspace_id=wayne_workspace.id, member_id=leia.id, role='admin')
    member10 = WorkspaceMember(
        workspace_id=wayne_workspace.id, member_id=demo.id, role='member')
    member11 = WorkspaceMember(
        workspace_id=wayne_workspace.id, member_id=han.id, role='member')
    member12 = WorkspaceMember(
        workspace_id=wayne_workspace.id, member_id=leia.id, role='admin')
    member13 = WorkspaceMember(
        workspace_id=wayne_workspace.id, member_id=demo.id, role='member')

    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.add(member5)
    db.session.add(member6)
    db.session.add(member7)
    db.session.add(member8)
    db.session.add(member9)
    db.session.commit()


def undo_workspace_members():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.workspace_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workspace_members"))

    db.session.commit()
