from .db import db, environment, SCHEMA


class Chat(db.Model):
    __tablename__ = "chats"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    messages = db.relationship(
        "Message",
        back_populates="chat",
        cascade="all, delete, delete-orphan",
        passive_deletes=True,
    )

    __mapper_args__ = {
        "polymorphic_identity": "chat",
        "polymorphic_on": type,
    }
