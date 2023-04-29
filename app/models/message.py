from .db import db, environment, SCHEMA


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
