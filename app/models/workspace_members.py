from .db import db, environment, SCHEMA,add_prefix_for_prod


# class WorkspaceMember(db.Model):
#     __tablename__ = "workspace_members"
#     id = db.Column(db.Integer, primary_key=True)

#     workspace_id = db.Column(db.Integer, db.ForeignKey("workspaces.id"), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     status = db.Column(db.String(20))

#     workspace = db.relationship("Workspace", back_populates="members")
#     user = db.relationship("User",  back_populates="workspace_memberships", lazy="joined")

#     def to_dict(self):
#         return {"user": self.user.to_dict(), "status": self.status}

#     def to_deleted_dict(self):
#         return {
#             "workspace_id": self.workspace_id,
#             "user_id": self.user_id,
#             "status": self.status,
#         }


# workspace = db.relationship('Workspace', backref=db.backref(
#     'members', lazy='dynamic'))
# user = db.relationship('User', backref=db.backref(
#     'workspace_membership', lazy='dynamic'))


workspace_member = db.Table(
    "workspace_members",
    db.Column("workspace_id", db.Integer, db.ForeignKey(add_prefix_for_prod("workspaces.id"))),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    schema=SCHEMA if (environment == "production") else None,
)
