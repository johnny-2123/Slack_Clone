from .db import db, environment, SCHEMA, add_prefix_for_prod
from .channel_members import channel_member
from .chat import Chat


class Channel(Chat):
    __tablename__ = "channels"

    id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("chats.id")), primary_key=True
    )

    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255))
    topic = db.Column(db.String(40))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    date_created = db.Column(db.DateTime, nullable=False, default=db.func.now())
    workspace_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("workspaces.id"))
    )
    private = db.Column(db.Boolean, default=False)
    last_sent_message_timestamp = db.Column(db.Date)

    channel_reads = db.relationship("UserChannelRead", back_populates="channel")
    # messages = db.relationship("Message", back_populates="channel")

    owner = db.relationship("User", back_populates="channels")
    workspace = db.relationship("Workspace", back_populates="channels")
    private_members = db.relationship(
        "User", secondary=channel_member, back_populates="channel_memberships"
    )

    __table_args__ = (
        # A constraint that says each channel
        # name in a workspace must be unique
        db.UniqueConstraint("workspace_id", "name", name="workspace_channel_uc"),
        {"schema": SCHEMA} if (environment == "production") else {},
    )

    __mapper_args__ = {"polymorphic_identity": "channel"}

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
        }
