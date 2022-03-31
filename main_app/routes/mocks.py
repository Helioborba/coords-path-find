import os
import json
from main_app.helpers.errorHandlers.responses import ApiRaisedError
from flask import Blueprint, jsonify, request

mocks_blueprint = Blueprint('mocks', __name__)

# Endpoints de test
@mocks_blueprint.route('/mock', methods=['GET']) # api
def dataApi():
    fileDir = os.path.join(os.path.dirname('app'), 'static', 'mock.json') # Busca por arquivos no diretório (no caso um JSON)
    print(fileDir)
    with open(fileDir) as json_file: 
        data = json.load(json_file) # Abrir e processar o arquivo
    return jsonify(data) # serve os arquivos no JSON

@mocks_blueprint.route('/mock_no_value', methods=['GET']) # api
def noDataApi():
    data = {}
    return jsonify(data)

@mocks_blueprint.route('/mock_err', methods=['GET']) # api
def dataErr():
    raise ApiRaisedError(500, "sevidor não tinha arquvios para enviar")

@mocks_blueprint.route('/mock_post', methods=['POST']) # api
def dataSetA():
    input_json = request.get_json(force=True) 
    # force=True, é necessário caso algum DEV esqueça de colocar o 'MIME type' como 'application/json'
    print('dados do cliente: ', input_json)
    resolve = {'message':'trabalhando'}
    return jsonify(resolve)