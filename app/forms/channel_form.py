from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Channel


def unique_name(form, field):
    name = field.data
    channel = (
        Channel.query.filter(Channel.workspace_id == request.workspace.id)
        .filter(Channel.name == name)
        .first()
    )
    if channel:
        raise ValidationError("Channel with that name already exists in this workspace")


class ChannelForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), unique_name])
    description = StringField("description", validators=[])
    topic = StringField("topic", validators=[])
    private = BooleanField("private", validators=[])
