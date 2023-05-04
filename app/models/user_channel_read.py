from .db import db, environment, SCHEMA,add_prefix_for_prod

class UserChannelRead(db.Model):
    __tablename__ = "user_channels_read"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    last_seen_timestamp = db.Column(db.DateTime, nullable=False)

    # user = db.relationship('User', back_populates='channel_reads')
    channel = db.relationship('Channel', back_populates='channel_reads')
