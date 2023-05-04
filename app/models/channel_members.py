from .db import db, environment, SCHEMA

channel_member = db.Table(
    "channel_members",
    db.Column("member_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("channel_id", db.Integer, db.ForeignKey("channels.id"), primary_key=True),
)
