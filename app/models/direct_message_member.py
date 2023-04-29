from .db import db, environment, SCHEMA


class DirectMessageMember(db.Model):
    __tablename__ = "direct_message_members"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    direct_message_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "direct_message_id": self.direct_message_id,
        }
