from flask import Blueprint,render_template,redirect,url_for
from flask.helpers import flash
from main_app import db
from main_app.model.city import City
from main_app.controller.form_city import FormAdd, FormClear, FormSearch

city_blueprint = Blueprint('city',__name__) # Interessante! caso seja utilizado ./templates/city, pode dar conflito com outros! então, colocar /city apenas no rendertemplate

@city_blueprint.route('/add_city', methods=['GET','POST'])
def add_city():
    form = FormAdd() # Cria a instância do form da cidade
    if form.validate_on_submit():
        city = form.city.data
        coordinate_x = form.coordinate_x.data
        coordinate_y = form.coordinate_y.data
        coordinates = {
            "x":coordinate_x,
            "y":coordinate_y
        }
        
        city = City(city, coordinates)
        db.session.add(city)
        db.session.commit()

        flash(f'Cidade adicionada com sucesso.')
        return redirect(url_for('city.add_city'))
    return render_template('form_city.html', titulo='Adicionar Cidade',  form=form, teste='files')

# @city_blueprint.route('/excluir', methods=['GET','POST'])
# def excluir():
#     formulario = FormularioDelete()

#     if formulario.validate_on_submit():
#         id = formulario.id.data
#         query_id = Pessoa.query.get(id)
        
#         db.session.delete(query_id)
#         db.session.commit()
#         return redirect(url_for('home'))

#     return render_template('usuarios/excluir.html', titulo='Excluir Usuários', formulario=formulario)

@city_blueprint.route('/list_city', methods=['GET','POST'])
def list_city():
    form = FormSearch()
    clear = FormClear()
    query_city = None
    # Buscar no form
    if form.validate_on_submit():
        city = form.city.data
        query_city = City.query.filter(City.name.like(f"{city}%"))
        return render_template('list.html', titulo='City List', city_data=query_city, form=form, clear=clear)

    # Limpa o form após pesquisa feita.
    if clear.validate_on_submit():
        query = City.query.all()
        return render_template('list.html', titulo='City List', city_data=query, form=form)

    # Roda sempre na primeira vez
    if query_city == None:
        query_city = City.query.all()
        
    return render_template('list.html', titulo='City List', city_data=query_city, form=form)

