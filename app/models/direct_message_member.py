from .db import db, environment, SCHEMA

direct_message_member = db.Table(
    "direct_message_members",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("direct_message_id", db.Integer, db.ForeignKey("direct_messages.id")),
)

# class DirectMessageMember(db.Model):
#     __tablename__ = "direct_message_members"

#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, nullable=False)
#     direct_message_id = db.Column(db.Integer, db.ForeignKey("direct_messages.id"), nullable=False)

#     direct_message = db.relationship("DirectMessage", back_populates="members")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "direct_message_id": self.direct_message_id,
#         }
