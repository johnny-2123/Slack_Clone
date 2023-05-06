from .db import db, environment, SCHEMA,add_prefix_for_prod

workspace_member = db.Table(
    "workspace_members",
    db.Column("workspace_id", db.Integer, db.ForeignKey(add_prefix_for_prod("workspaces.id"))),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    schema=SCHEMA if (environment == "production") else None,
)
