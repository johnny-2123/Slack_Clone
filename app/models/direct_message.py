from .db import db, environment, SCHEMA


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(255))
    workspace_id = db.Column(db.Integer, nullable=False)
    last_sent_message_timestamp = db.Column(db.Date)

    def to_dict(self):
        return {
            "id": self.id,
            "topic": self.topic,
            "workspace_id": self.workspace_id,
            "last_sent_message_timestamp": self.last_sent_message_timestamp,
        }
