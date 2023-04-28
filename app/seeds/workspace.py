from app.models import db, User, Workspace, environment, SCHEMA
from sqlalchemy.sql import text

def seed_workspaces():
    workspace1 = Workspace(name='Workspace 1', description='This is the first workspace', owner_id=1, image_url ="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677815579/photo-1493711662062-fa541adb3fc8_fqkzqb.jpg" )
    workspace2 = Workspace(name='Workspace 2', description='This is the second workspace', owner_id=1, image_url ="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677815579/photo-1493711662062-fa541adb3fc8_fqkzqb.jpg" )
    workspace3 = Workspace(name='Workspace 3', description='This is the third workspace', owner_id=2, image_url ="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677815579/photo-1493711662062-fa541adb3fc8_fqkzqb.jpg" )

    db.session.add(workspace1)
    db.session.add(workspace2)
    db.session.add(workspace3)
    db.session.commit()


def undo_workspaces():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workspaces RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workspaces"))

    db.session.commit()
