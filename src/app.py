"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Campaign, Voluntario, Ongs
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
        return generate_sitemap(app)
    

# any other endpoint will try to serve it like a static file


@app.route('/ong', methods=['GET'])
def get_ongs():
    all_ongs = Ongs.query.all()
    print(all_ongs)
    results = list(map(lambda ongs: ongs.serialize(),all_ongs))
    print(results)

    return jsonify(results), 200

@app.route('/ong/<int:ong_id>', methods=['GET'])
def get_ong(ong_id):
    print(ong_id)
    ong = Ongs.query.filter_by(id=ong_id).first()
    print(ong)
    all_ongs = Ongs.query.all()
    results = list(map(lambda ong: ong.serialize(),all_ongs))
    
    return jsonify(ong.serialize()), 200






# fin


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
