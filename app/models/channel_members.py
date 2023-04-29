from .db import db, environment, SCHEMA

channel_member = db.Table(
    "channel_members",
    db.Column("member_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("channel_id", db.Integer, db.ForeignKey("channels.id")),
)
