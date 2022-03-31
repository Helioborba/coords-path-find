# Aqui se encontram os forms das coordinadas
from flask_wtf import FlaskForm
from wtforms import ( StringField, IntegerField, SubmitField )
from wtforms.validators import DataRequired,NumberRange

style={'class': 'form-check-input', 'style': 'width:50%; other_css_style;'}

class FormAdd(FlaskForm):

    city = StringField(u"Nome da cidade: ", validators=[DataRequired(message='É necessário preencher este campo')])
    coordinate_x = IntegerField("Coordenada X (Main axis): ", validators=[DataRequired(),NumberRange(min=0, message='Números negativos não são aceitos')])
    coordinate_y = IntegerField("Coordenada Y (Cross axis): ", validators=[DataRequired(),NumberRange(min=0, message='Números negativos não são aceitos')])
    submit = SubmitField('Enviar')

class FormSearch(FlaskForm):

    city = StringField(validators=[DataRequired(message='É necessário preencher este campo')])
    submit = SubmitField('Search')

class FormClear(FlaskForm):

    submit = SubmitField('Clear')