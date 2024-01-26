from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Voluntario, Ongs, Campaign
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager





# Crear el Blueprint
api = Blueprint('api', __name__)

# Configuración de Flask


# Inicialización del JWTManager


# Allow CORS requests to this API
CORS(api)

@api.route('/ong', methods=['GET'])
# @jwt_required()
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
    try:
        body = request.get_json()

        # Verifica la existencia de las claves requeridas en el cuerpo de la solicitud
        required_keys = ['nif', 'nombre', 'email', 'ciudad', 'actividad', 'aprobado', 'password', 'lat', 'lng']
        for key in required_keys:
            if key not in body:
                raise APIException(f"Campo '{key}' no proporcionado en el cuerpo de la solicitud", status_code=400)

        ong = Ongs(
            nif=body['nif'],
            nombre=body['nombre'],
            email=body['email'],
            ciudad=body['ciudad'],
            actividad=body['actividad'],
            aprobado=body['aprobado'],
            password=body['password'],
            lat=body['lat'],
            lng=body['lng']
        )

        db.session.add(ong)
        db.session.commit()

        response_body = {
            "msg": "ONG creada correctamente"
        }

        return jsonify(response_body), 200

    except APIException as api_exception:
        # Captura y maneja excepciones específicas definidas en tu aplicación
        return jsonify({"error": str(api_exception)}), api_exception.status_code

    except Exception as e:
        # Captura excepciones genéricas
        print("Error:", str(e))
        return jsonify({"error": "Error interno del servidor"}), 500

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
    



@api.route("/ongLogin", methods=["POST"])
def ong_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    ong = Ongs.query.filter_by(email=email).first()

    if ong is None or password != ong.password:
        return jsonify({"msg": "Wrong email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



# Get all campaigns
@api.route('/campaign', methods=['GET'])
def get_campaigns():
    all_campaigns = Campaign.query.all()
    print(all_campaigns)
    results = list(map(lambda campaign: campaign.serialize(),all_campaigns))
    return jsonify(results), 200


#  Get a specific campaign by ID
@api.route('/campaign/<int:campaign_id>', methods=['GET'])
def get_campaign_id(campaign_id):
    print(campaign_id)
    campaign = Campaign.query.filter_by(id=campaign_id).first()
    
    if campaign:
        result = campaign.serialize()
        return jsonify(result)
    else:
        return jsonify({"error": "Campaign not found"}), 404

# # Create a new campaign
@api.route('/campaign', methods=['POST'])
def post_campaign():
    body = request.get_json()
    new_campaign = Campaign(
                articulos =body["articulos"],
                fecha_inicio=body['fecha_inicio'],
                fecha_finalizacion=body['fecha_finalizacion'],
                nombre=body['nombre'],
                objetivo=body['objetivo'],
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
        campaign.articulos = body.get('articulos', campaign.articulos)
        campaign.fecha_inicio = body.get('fecha_inicio', campaign.fecha_inicio)
        campaign.fecha_finalizacion = body.get('fecha_finalizacion', campaign.fecha_finalizacion)
        campaign.nombre = body.get('nombre', campaign.nombre)
        campaign.objetivo = body.get('objetivo', campaign.objetivo)
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
    
#### admin login routes ####

@api.route('/user', methods=['GET'])
@jwt_required()
def get_users():
    all_users = User.query.all()
    results = list(map(lambda user: user.serialize(), all_users))
    return jsonify(results),200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    results = User.query.filter_by(id=user_id).first()
    return jsonify(results.serialize()), 200

@api.route("/adminLogin", methods=["POST"])
def admin_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    print(user)

    if user == None:
        return jsonify({"msg":"Could not find email"}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Wrong email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

#route to let the user signup 
@api.route("/adminSignup", methods=["POST"])
def admin_signup():
    #request_body = request.get_jason()
    request_body = request.get_json()
    user = User.query.filter_by(email=request_body["email"]).first()
    if user is None:
        new_user = User(email=request_body["email"], password=request_body["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body ={
            "msg": "User created suscessfully"
         }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg": "An user associated with this email has already been created" }),401
    

# Protect a route with jwt_required, which will kick out requests
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

