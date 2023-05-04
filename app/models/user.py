from .direct_message_member import direct_message_member
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .channel_members import channel_member
from .workspace_members import workspace_member
from .workspace import Workspace
from .direct_message import DirectMessage


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(35), nullable=False)
    last_name = db.Column(db.String(35), nullable=False)
    # image_url = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    workspaces = db.relationship("Workspace", back_populates="owner")
    workspace_memberships = db.relationship(
        "Workspace", secondary=workspace_member, back_populates="members"
    )
    messages = db.relationship("Message", back_populates="user")
    # channel_reads = db.relationship("UserChannelRead", back_populates="user")
    message_reactions = db.relationship("MessageReaction", back_populates="user")
    channels = db.relationship("Channel", back_populates="owner")

    channel_memberships = db.relationship(
        "Channel", secondary=channel_member, back_populates="private_members"
    )

    # Define the many-to-many relationship with the direct_messages table
    direct_messages = db.relationship(
        "DirectMessage", secondary=direct_message_member, back_populates="members",
        primaryjoin="User.id == direct_message_member.c.user_id",
        secondaryjoin="DirectMessage.id == direct_message_member.c.direct_message_id"
    )

    dm_memberships = db.relationship(
        "DirectMessage", secondary=direct_message_member, back_populates="members"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}
