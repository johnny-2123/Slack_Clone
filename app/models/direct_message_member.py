from .db import db, environment, SCHEMA

direct_message_member = db.Table(
    "direct_message_members",
    db.Column("id", db.Integer, primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("direct_message_id", db.Integer, db.ForeignKey("direct_messages.id"), nullable=False),
)
