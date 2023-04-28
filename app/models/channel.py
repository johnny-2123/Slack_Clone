from .db import db, environment, SCHEMA


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255))
    topic = db.Column(db.String(40))
    owner_id = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.Date, nullable=False)
    workspace_id = db.Column(db.Integer, nullable=False)
    private = db.Column(db.Boolean)
    last_sent_message_timestamp = db.Column(db.Date)

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
