"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Voluntario
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

#  inicio 
@app.route('/voluntario', methods=['GET'])
def get_voluntario():
    all_voluntario = Voluntario.query.all()
    print(all_voluntario)
    results = list(map(lambda voluntario: voluntario.serialize(),all_voluntario))
    print(results)

    return jsonify(results), 200


@app.route('/voluntario/<int:voluntario_id>', methods=['GET'])
def get_voluntario_id(voluntario_id):
    print(voluntario_id)
    
    voluntario = Voluntario.query.filter_by(id=voluntario_id).first()
    
    if voluntario:
        # Assuming `serialize` is a method in your Voluntario model
        result = voluntario.serialize()
        return jsonify(result)
    else:
        return jsonify({"error": "Voluntario not found"}), 404
    

@app.route('/voluntario', methods=['POST'])
def post_voluntario():
    body = request.get_json()

    new_voluntario = Voluntario(
                nombre= body['nombre'],
                email= body['email'],
                password= body['password'],
                ciudad= body['ciudad'],
                lat= body['lat'],
                lng= body['lng'])

    db.session.add(new_voluntario)
    db.session.commit()

    response_body = {
        "msg": "nuevo voluntario creado"
    }

    return jsonify(response_body), 200

@app.route('/voluntario/<int:voluntario_id>', methods = ['PUT'])
def update_voluntario(voluntario_id):
    try:
        body = request.get_json()
        print("Request Body:", body)

        voluntario = Voluntario.query.filter_by(id=voluntario_id).first()

        if voluntario is None:
            raise APIException("voluntario no encontrado", status_code=404)

        voluntario.nombre = body.get('nombre', voluntario.nombre)
        voluntario.email = body.get('email', voluntario.email)
        voluntario.password = body.get('password', voluntario.password)
        voluntario.ciudad = body.get('ciudad', voluntario.ciudad)
        voluntario.lat = body.get('lat', voluntario.lat)
        voluntario.lng = body.get('lng', voluntario.lng)

        db.session.commit()

        response_body = {
            "msg": "voluntario actualizado"
        }

        return jsonify(response_body), 200
    
    except Exception as e:
            print("Error:", str(e))
            raise APIException("Error al actualizar voluntario", status_code=500)

@app.route('/voluntario/<int:voluntario_id>', methods=['DELETE'])
def delete_voluntario(voluntario_id):
    try:
        voluntario = Voluntario.query.get(voluntario_id)
        if not voluntario:
            raise APIException("voluntario no encontrado", status_code=404)
        db.session.delete(voluntario)
        db.session.commit()
        response_body = {
            "msg": "voluntario eliminado correctamente"
        }
        return jsonify(response_body), 200
    except Exception as e:
        print("Error:", str(e))
        raise APIException("Error al eliminar voluntario", status_code=500)
    
    
#  fin

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
