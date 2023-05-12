from .db import add_prefix_for_prod, db, environment, SCHEMA
from .direct_message_member import direct_message_member
from .chat import Chat


class DirectMessage(Chat):
    __tablename__ = "direct_messages"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("chats.id")), primary_key=True
    )

    topic = db.Column(db.String(255))
    workspace_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("workspaces.id")), nullable=False
    )
    last_sent_message_timestamp = db.Column(db.Date)

    # relationships
    # messages = db.relationship("Message", back_populates="direct_message")
    members = db.relationship(
        "User",
        secondary=direct_message_member,
        back_populates="dm_memberships",
    )
    workspace = db.relationship("Workspace", back_populates="direct_messages")

    __mapper_args__ = {
        "polymorphic_identity": "direct_message",
    }

    def to_dict(self):
        return {
            "id": self.id,
            "topic": self.topic,
            "workspace_id": self.workspace_id,
            "users": [member.to_dict() for member in self.members],
            "last_sent_message_timestamp": self.last_sent_message_timestamp,
        }
