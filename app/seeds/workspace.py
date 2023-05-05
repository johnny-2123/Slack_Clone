from app.models import db, User, Workspace, environment, SCHEMA
from sqlalchemy.sql import text


def seed_workspaces():

    demo = User.query.filter_by(username="Demo").first()
    marnie = User.query.filter_by(username="marnie").first()

    demo.create_workspace(
        name="Acme Corporation",
        description="A company that sells anvils and other contraptions",
        image_url="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677815579/photo-1493711662062-fa541adb3fc8_fqkzqb.jpg",
    )

    demo.create_workspace(
        name="Stark Industries",
        description="A leading manufacturer of advanced technology, including the Iron Man suit",
        image_url="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677815579/photo-1493711662062-fa541adb3fc8_fqkzqb.jpg",
    )

    marnie.create_workspace(
        name="Wayne Enterprises",
        description="A multinational conglomerate with interests in various industries, including defense and technology",
        image_url="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677815579/photo-1493711662062-fa541adb3fc8_fqkzqb.jpg",
    )

    db.session.commit()


def undo_workspaces():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.workspaces RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM workspaces"))

    db.session.commit()
