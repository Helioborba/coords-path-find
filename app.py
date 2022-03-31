# No caso atual, o flask é apenas utilizado para termos a base de chamadas com a DB local (SQlite) criada pelo flask e utilizada com flask-alchemy.
# O script que cria a DB (usando Migrate) esta no flask-run-win.sh caso você queria criar uma nova.
# O local principal do INIT está no MAIN_APP, isso é causado pelo ciclo de Import do python criar um bug caso seja diferente.
# Nós podiamos utilizar o coookiecutter para fazer o APP de forma mais concreta, utilizando a ideia do factory.
import os
from flask import render_template, send_from_directory
from main_app.helpers.errorHandlers.responses import ApiRaisedError, createJsonRaisedError # used for errors
from main_app import app

# Routes
@app.route('/', methods=['GET']) # home
def home():
    return render_template('home.html', titulo='Home')

@app.route('/favicon.ico')
def favicon(): 
    """Favicon route in case host does not find it"""
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.errorhandler(404) #Pagina caso não seja encontrado a requisição no servidor
def error404(err):
    """Handles the 404 error in case the route is not found"""
    res = {'error':str(err), 'status':404}
    return res

@app.errorhandler(ApiRaisedError) # Utilizado para enviar os erros globais pelo endpoint
def handle_exception(err):
    """Return JSON with the error for the client"""
    if len(err.description) > 0:
        res = err.description
    else:
        res = "Error happened; no status found."
    return createJsonRaisedError(err.code, res)


# Start the app as the main
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)

