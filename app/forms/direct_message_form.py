from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import DirectMessage

class DirectMessageForm(FlaskForm):
    topic = StringField('Topic', validators=[DataRequired()])
    workspace_id = StringField('Workspace ID', validators=[DataRequired()])
    submit = SubmitField('Submit')
