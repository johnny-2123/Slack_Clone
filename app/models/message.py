from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4000), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    # channel_id = db.Column(
    #     db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id"))
    # )
    # direct_message_id = db.Column(
    #     db.Integer, db.ForeignKey(add_prefix_for_prod("direct_messages.id"))
    # )
    chat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("chats.id")))
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("messages.id")))
    timestamp = db.Column(db.DateTime, nullable=False)
    # attachment_id = db.Column(db.Integer, db.ForeignKey('attachments.id'))

    user = db.relationship("User", back_populates="messages")
    # channel = db.relationship("Channel", back_populates="messages")
    # direct_message = db.relationship("DirectMessage", back_populates="messages")
    chat = db.relationship("Chat", back_populates="messages")
    parent = db.relationship("Message", remote_side=[id], back_populates="replies")
    replies = db.relationship(
        "Message", remote_side=[parent_id], back_populates="parent"
    )
    # attachment = db.relationship('Attachment', back_populates='message')
    message_reactions = db.relationship("MessageReaction", back_populates="message")

    # def to_dict(self):
    #     return {
    #         "user": self.user.to_dict(),
    #         "content": self.content,
    #         "timestamp": self.timestamp,
    #         "replies": [reply.to_dict() for reply in self.replies],
    #         "parent_id": self.parent.id if self.parent else None,
    #     }

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user": self.user.to_dict(),
            "timestamp": self.timestamp.isoformat(),
            "chat_id": self.chat_id,
            "chat_type": self.chat.type,
            "replies": [reply.to_dict() for reply in self.replies],
            "parent_id": self.parent.id if self.parent else None,
        }
