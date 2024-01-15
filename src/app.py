"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Campaign
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
#Inicio





# Get all campaigns
@app.route('/campaign', methods=['GET'])
def get_campaigns():
    all_campaigns = Campaign.query.all()
    print(all_campaigns)
    results = list(map(lambda campaign: campaign.serialize(),all_campaigns))
    print(results)

    return jsonify(results), 200


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





#Fin
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
