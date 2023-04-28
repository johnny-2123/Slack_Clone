from .db import db, environment, SCHEMA


class WorkspaceMember(db.Model):
    __tablename__ = 'workspace_members'

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'))
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    status = db.Column(db.String(25), nullable=False)

    # workspace = db.relationship('Workspace', backref=db.backref(
    #     'worksapce_members', lazy='dynamic'))
    # user = db.relationship('User', backref=db.backref(
    #     'workspaces_members', lazy='dynamic'))
