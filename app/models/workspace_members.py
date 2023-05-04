from .db import db, environment, SCHEMA

workspace_member = db.Table(
    "workspace_members",
    db.Column("workspace_id", db.Integer, db.ForeignKey("workspaces.id")),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
)
