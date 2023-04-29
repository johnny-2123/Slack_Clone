from .db import db, environment, SCHEMA


class Workspace(db.Model):
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(300), nullable=False)
    image_url = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    owner = db.relationship("User", back_populates="workspaces")
    members = db.relationship(
        'WorkspaceMember', back_populates='workspace')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'owner': self.owner.to_dict(),
            'members': [member.to_dict() for member in self.members]
        }
