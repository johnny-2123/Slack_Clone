from .db import db, environment, SCHEMA


class WorkspaceMember(db.Model):
    __tablename__ = "workspace_members"
    id = db.Column(db.Integer, primary_key=True)

    workspace_id = db.Column(db.Integer, db.ForeignKey("workspaces.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    status = db.Column(db.String(20))

    workspace = db.relationship("Workspace", back_populates="members")
    user = db.relationship("User")

    def to_dict(self):
        return {
            "user": self.user.to_dict(),
            "status": self.status
        }

    def to_deleted_dict(self):
        return {
            "workspace_id": self.workspace_id,
            "user_id": self.user_id,
            "status": self.status
        }

   # workspace = db.relationship('Workspace', backref=db.backref(
   #     'members', lazy='dynamic'))
   # user = db.relationship('User', backref=db.backref(
   #     'workspace_membership', lazy='dynamic'))


# workspace_members = db.Table(
#     "workspace_members",
#     db.Column("id", db.Integer, primary_key=True),
#     db.Column("workspace_id", db.Integer, db.ForeignKey("workspaces.id")),
#     db.Column("user_id", db.Integer, db.ForeignKey(
#         "users.id"), nullable=False),
# )
