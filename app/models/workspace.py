from .db import db, environment, SCHEMA, add_prefix_for_prod
from .workspace_members import workspace_member


class Workspace(db.Model):
    __tablename__ = "workspaces"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(300), nullable=False)
    image_url = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    owner = db.relationship("User", back_populates="workspaces")
    members = db.relationship(
        "User", secondary=workspace_member, back_populates="workspace_memberships"
    )
    channels = db.relationship("Channel", back_populates="workspace")
    direct_messages = db.relationship("DirectMessage", back_populates="workspace")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "owner": self.owner.to_dict(),
            "members": [member.to_dict() for member in self.members],
        }
