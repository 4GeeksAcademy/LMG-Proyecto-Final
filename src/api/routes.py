"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Voluntario, Ongs, Campaign
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)
cors = CORS(api, resources={r"/api/*": {"origins": "*"}})
# Allow CORS requests to this API
CORS(api)
@api.route('/campaign', methods=['GET'])
def get_campaigns():
    all_campaigns = Campaign.query.all()
    print(all_campaigns)
    results = list(map(lambda campaign: campaign.serialize(),all_campaigns))


#  Get a specific campaign by ID
@api.route('/campaign/<int:campaign_id>', methods=['GET'])
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
@api.route('/campaign', methods=['POST'])
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
@api.route('/campaign/<int:campaign_id>', methods=['PUT'])
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
@api.route('/campaign/<int:campaign_id>', methods=['DELETE'])
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

@api.route('/ong', methods=['GET'])
def get_ongs():
    all_ongs = Ongs.query.all()
    print(all_ongs)
    results = list(map(lambda ongs: ongs.serialize(),all_ongs))
    print(results)

    return jsonify(results), 200

@api.route('/ong/<int:ong_id>', methods=['GET'])
def get_ong(ong_id):
    print(ong_id)
    ong = Ongs.query.filter_by(id=ong_id).first()
    print(ong)
    all_ongs = Ongs.query.all()
    results = list(map(lambda ong: ong.serialize(),all_ongs))
    
    return jsonify(ong.serialize()), 200


@api.route('/ong', methods=['POST'])
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


@api.route('/ong/<int:ong_id>', methods=['PUT'])
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
        

@api.route('/ong/<int:ong_id>', methods=['DELETE'])
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


# fin

#  inicio 
@api.route('/voluntario', methods=['GET'])
def get_voluntario():
    all_voluntario = Voluntario.query.all()
    print(all_voluntario)
    results = list(map(lambda voluntario: voluntario.serialize(),all_voluntario))
    print(results)

    return jsonify(results), 200


@api.route('/voluntario/<int:voluntario_id>', methods=['GET'])
def get_voluntario_id(voluntario_id):
    print(voluntario_id)
    
    voluntario = Voluntario.query.filter_by(id=voluntario_id).first()
    
    if voluntario:
        # Assuming `serialize` is a method in your Voluntario model
        result = voluntario.serialize()
        return jsonify(result)
    else:
        return jsonify({"error": "Voluntario not found"}), 404
    

@api.route('/voluntario', methods=['POST'])
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

@api.route('/voluntario/<int:voluntario_id>', methods = ['PUT'])
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

@api.route('/voluntario/<int:voluntario_id>', methods=['DELETE'])
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
    
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
