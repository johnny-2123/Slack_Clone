from .db import db, environment, SCHEMA

class Reaction(db.Model):
    __tablename__ = "reactions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    emoji = db.Column(db.String(255), nullable=False)

    message_reactions = db.relationship("MessageReaction", back_populates='reaction')
