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
# Get all campaigns
@app.route('/campaign', methods=['GET'])
def get_campaigns():
    all_campaigns = Campaign.query.all()
    print(all_campaigns)
    results = list(map(lambda campaign: campaign.serialize(),all_campaigns))


#  Get a specific campaign by ID
@app.route('/campaign/<int:campaign_id>', methods=['GET'])
def get_campaign_id(campaign_id):
    print(campaign_id)
    
    campaign = Campaign.query.filter_by(id=campaign_id).first()
    
    if campaign:
        # Assuming `serialize` is a method in your Campaign model
        result = campaign.serialize()
        return jsonify(result)
    else:
        return jsonify({"error": "Campaign not found"}), 404



# # Create a new campaign
@app.route('/campaign', methods=['POST'])
def post_campaign():
    body = request.get_json()
    new_campaign = Campaign(
                fecha_inicio=body['fecha_inicio'],
                fecha_finalizacion=body['fecha_finalizacion'],
                nombre=body['nombre'],
                ong_id=body['ong_id'])
    db.session.add(new_campaign)
    db.session.commit()
    response_body = {
        "msg": "new campaign created"
    }
    return jsonify(response_body), 200




# # Update a campaign by ID
@app.route('/campaign/<int:campaign_id>', methods=['PUT'])
def update_campaign(campaign_id):
    try:
        body = request.get_json()
        print("Request Body:", body)
        campaign = Campaign.query.filter_by(id=campaign_id).first()
        if campaign is None:
            raise APIException("Campaign not found", status_code=404)
        # Actualiza solo los campos que se proporcionan en la solicitud
        campaign.fecha_inicio = body.get('fecha_inicio', campaign.fecha_inicio)
        campaign.fecha_finalizacion = body.get('fecha_finalizacion', campaign.fecha_finalizacion)
        campaign.nombre = body.get('nombre', campaign.nombre)
        campaign.ong_id = body.get('ong_id', campaign.ong_id)
       
        db.session.commit()
        response_body = {
            "msg": "Campaign updated correctly"
        }
        return jsonify(response_body), 200
    except Exception as e:
        print("Error:", str(e))
        raise APIException("Campaign updating error", status_code=500)



# # Delete a campaign by ID
@app.route('/campaign/<int:campaign_id>', methods=['DELETE'])
def delete_campaign(campaign_id):
    try:
        campaign = Campaign.query.get(campaign_id)
        if not campaign:
            raise APIException("Campaign not found", status_code=404)
        db.session.delete(campaign)
        db.session.commit()
        response_body = {
            "msg": "Campaign deleted correctly"
        }
        return jsonify(response_body), 200
    except Exception as e:
        print("Error:", str(e))
        raise APIException("Campaign deleting error", status_code=500)



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


@app.route('/ong', methods=['POST'])
def post_ong():
    body = request.get_json()

    ong = Ongs(nif= body['nif'],
                nombre= body['nombre'],
                email= body['email'],
                ciudad= body['ciudad'],
                actividad= body['actividad'],
                aprobado= body['aprobado'],
                password= body['password'],
                lat= body['lat'],
                lng= body['lng'])

    db.session.add(ong)
    db.session.commit()

    response_body = {
        "msg": "ONG creada correctamente"
    }

    return jsonify(response_body), 200


@app.route('/ong/<int:ong_id>', methods=['PUT'])
def update_ong(ong_id):
    try:
        body = request.get_json()
        print("Request Body:", body)

        ong = Ongs.query.filter_by(id=ong_id).first()

        if ong is None:
            raise APIException("ONG no encontrada", status_code=404)

        # Actualiza solo los campos que se proporcionan en la solicitud
        ong.nif = body.get('nif', ong.nif)
        ong.nombre = body.get('nombre', ong.nombre)
        ong.email = body.get('email', ong.email)
        ong.ciudad = body.get('ciudad', ong.ciudad)
        ong.actividad = body.get('actividad', ong.actividad)
        ong.aprobado = body.get('aprobado', ong.aprobado)
        ong.password = body.get('password', ong.password)
        ong.lat = body.get('lat', ong.lat)
        ong.lng = body.get('lng', ong.lng)

        db.session.commit()

        response_body = {
            "msg": "ONG actualizada correctamente"
        }

        return jsonify(response_body), 200
    except Exception as e:
        print("Error:", str(e))
        raise APIException("Error al actualizar ONG", status_code=500)
        

@app.route('/ong/<int:ong_id>', methods=['DELETE'])
def delete_ong(ong_id):
    try:
        ong = Ongs.query.get(ong_id)

        if not ong:
            raise APIException("ONG no encontrada", status_code=404)

        db.session.delete(ong)
        db.session.commit()

        response_body = {
            "msg": "ONG eliminada correctamente"
        }

        return jsonify(response_body), 200
    except Exception as e:
        print("Error:", str(e))
        raise APIException("Error al eliminar ONG", status_code=500)       



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
    
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
