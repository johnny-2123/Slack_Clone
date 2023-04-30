from .db import db, environment, SCHEMA
from .channel_members import channel_member


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255))
    topic = db.Column(db.String(40))
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    date_created = db.Column(db.Date, nullable=False, server_default=db.func.now())
    workspace_id = db.Column(db.Integer, db.ForeignKey("workspaces.id"))
    private = db.Column(db.Boolean, default=False)
    last_sent_message_timestamp = db.Column(db.Date)

    channel_reads = db.relationship("UserChannelRead", back_populates="channel")
    messages = db.relationship('Message', back_populates='channel')

    owner = db.relationship("User", back_populates="channels")
    workspace = db.relationship("Workspace", back_populates="channels")
    private_members = db.relationship(
        "User", secondary=channel_member, back_populates="channel_memberships"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "topic": self.topic,
            "owner_id": self.owner_id,
            "date_created": self.date_created,
            "workspace_id": self.workspace_id,
            "private": self.private,
            "last_sent_message_timestamp": self.last_sent_message_timestamp,
            "messages": [message.to_dict() for message in self.messages]
        }
