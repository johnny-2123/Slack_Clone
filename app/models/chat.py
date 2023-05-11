from .db import db


class Chat(db.Model):
    __tablename__ = "chats"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    messages = db.relationship("Message", back_populates="chat")

    __mapper_args__ = {
        "polymorphic_identity": "chat",
        "polymorphic_on": type,
    }
