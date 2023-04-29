from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Workspace


def workspace_name_exists(form, field):
    name = field.data
    workspace = Workspace.query.filter(Workspace.name == name).first()
    if workspace:
        raise ValidationError("Workspace name is already in use")


class WorkspaceForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), workspace_name_exists])
    description = StringField("description", validators=[DataRequired()])
    image_url = StringField("image url")
    # owner_id = IntegerField('owner id')
