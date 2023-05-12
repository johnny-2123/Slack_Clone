from .db import db, environment, SCHEMA, add_prefix_for_prod
direct_message_member = db.Table(
    'direct_message_members',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
    db.Column('direct_message_id', db.Integer, db.ForeignKey(add_prefix_for_prod('direct_messages.id')), nullable=False),
    schema=SCHEMA if (environment == "production") else None,
)

if environment == "production":
    direct_message_member.schema = SCHEMA
