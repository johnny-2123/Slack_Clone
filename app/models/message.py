from .db import db, environment, SCHEMA

from sqlalchemy import func

class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    channel_id = db.Column(db.Integer)
    parent_id = db.Column(db.Integer)
    attachment_id = db.Column(db.Integer)
    timestamp = db.Column(db.Date)

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user_id": self.user_id,
            "channel_id": self.channel_id,
            "parent_id": self.parent_id,
            "attachment_id": self.attachment_id,
            "timestamp": self.timestamp,
        }
        if environment == "production":
            __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id= db.Column(db.Integer, db.ForeignKey('channels.id'))
    direct_message_id = db.Column(db.Integer, db.ForeignKey('direct_messages.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    timestamp = db.Column(db.DateTime, default=func.now(), nullable=False)
    # attachment_id = db.Column(db.Integer, db.ForeignKey('attachments.id'))

    user = db.relationship("User", back_populates="messages")
    # channel = db.relationship('Channel', back_populates='messages')
    # direct_message = db.relationship('DirectMessage', back_populates='messages')
    parent = db.relationship('Message', remote_side=[id], back_populates='replies')
    replies = db.relationship('Message', remote_side=[parent_id], back_populates='parent')
    # attachment = db.relationship('Attachment', back_populates='message')
