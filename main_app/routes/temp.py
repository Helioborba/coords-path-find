from flask import Blueprint,render_template,jsonify,send_file
from main_app.model.city import City

temp_blueprint = Blueprint('temp',__name__) # Interessante! caso seja utilizado ./templates/city, pode dar conflito com outros! então, colocar /city apenas no rendertemplate

@temp_blueprint.route('/coordinate_view', methods=['GET','POST'])
def test():
    return render_template('coordinate_view.html', titulo='Visualizador')

@temp_blueprint.route('/list', methods=['GET'])
def list():
    query_city = City.query.all()
    # Criamos um JSON por causa do SQL não enviar da forma correta
    json = []
    for value in query_city:
        json.append(
            {
                "name":value.name,
                "x":value.coordinate_x,
                "y":value.coordinate_y
            }
        )
    
    return jsonify(json)

@temp_blueprint.route('/image', methods=['GET'])
def image():
    return send_file('static/images/building.svg', mimetype='image/svg')