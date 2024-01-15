"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import date
from api.models import db, User, Voluntario, Ongs, Campaign
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Create a new campaign
@api.route('/campaign', methods=['POST'])
def create_campaign():
    data = request.get_json()

    new_campaign = Campaign(
        fecha_inicio=data['fecha_inicio'],
        fecha_finalizacion=data['fecha_finalizacion'],
        nombre=data['nombre'],
        ong_id=data['ong_id']
    )

    db.session.add(new_campaign)
    db.session.commit()

    return jsonify({"message": "Campaign created successfully"}), 201


# Get all campaigns
@api.route('/campaign', methods=['GET'])
def get_campaigns():
    campaigns = Campaign.query.all()

    campaigns_list = []
    for campaign in campaigns:
        campaigns_list.append(campaign.serialize())

    return jsonify(campaigns_list), 200


# Get a specific campaign by ID
@api.route('/campaign/<int:campaign_id>', methods=['GET'])
def get_campaign(campaign_id):
    campaign = Campaign.query.get(campaign_id)

    if campaign is None:
        return jsonify({"message": "Campaign not found"}), 404

    return jsonify(campaign.serialize()), 200


# Update a campaign by ID
@api.route('/campaign/<int:campaign_id>', methods=['PUT'])
def update_campaign(campaign_id):
    campaign = Campaign.query.get(campaign_id)

    if campaign is None:
        return jsonify({"message": "Campaign not found"}), 404

    data = request.get_json()

    campaign.fecha_inicio = data['fecha_inicio']
    campaign.fecha_finalizacion = data['fecha_finalizacion']
    campaign.nombre = data['nombre']
    campaign.ong_id = data['ong_id']

    db.session.commit()

    return jsonify({"message": "Campaign updated successfully"}), 200


# Delete a campaign by ID
@api.route('/campaign/<int:campaign_id>', methods=['DELETE'])
def delete_campaign(campaign_id):
    campaign = Campaign.query.get(campaign_id)

    if campaign is None:
        return jsonify({"message": "Campaign not found"}), 404

    db.session.delete(campaign)
    db.session.commit()

    return jsonify({"message": "Campaign deleted successfully"}), 200