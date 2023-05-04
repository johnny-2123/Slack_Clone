from .db import db, environment, SCHEMA, add_prefix_for_prod

channel_member = db.Table(
    "channel_members",
    db.Column("member_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("channel_id", db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), primary_key=True),
    schema=SCHEMA if (environment == "production") else None,
)
