# O APP principal do flask se encontra aqui (root folder).
import os
#Flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

basedir = os.path.abspath(os.path.dirname(__file__)) # Criação de PATH para futuros items
dir = os.path.join(basedir,'view')
app = Flask(__name__,template_folder=dir) # Setar Dir padrão para futuros templates assim como criação do APP

# Criar db, con e confs
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'

db = SQLAlchemy(app) 
Migrate(app, db)

# blueprints, ESTES IMPORTS NÃO PODEM FICAR ACIMA, ELES TEM QUE FICAR ABAIXO DA DB E APP

from main_app.routes.mocks import mocks_blueprint
from main_app.routes.form_city import city_blueprint
from main_app.routes.temp import temp_blueprint

app.register_blueprint(mocks_blueprint, url_prefix='/mocks')
app.register_blueprint(city_blueprint, url_prefix='/city')
app.register_blueprint(temp_blueprint, url_prefix='/temp')