from .db import db, environment, SCHEMA
from sqlalchemy import func


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        if environment == "production":
            __table_args__ = {"schema": SCHEMA, "idx_timestamp": db.timestamp}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
    # direct_message_id = db.Column(db.Integer, db.ForeignKey('direct_messages.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey("messages.id"))
    timestamp = db.Column(db.DateTime, default=func.now(), nullable=False)
    # attachment_id = db.Column(db.Integer, db.ForeignKey('attachments.id'))

    user = db.relationship("User", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages")
    # direct_message = db.relationship('DirectMessage', back_populates='messages')
    parent = db.relationship("Message", remote_side=[id], back_populates="replies")
    replies = db.relationship(
        "Message", remote_side=[parent_id], back_populates="parent"
    )
    # attachment = db.relationship('Attachment', back_populates='message')
    message_reactions = db.relationship("MessageReaction", back_populates="message")

    def to_dict(self):
        return {
            "content": self.content,
            "replies": [reply.to_dict() for reply in self.replies],
            "timestamp": self.timestamp,
        }
