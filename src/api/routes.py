from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Voluntario, Ongs, Campaign
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager



# Crear el Blueprint
api = Blueprint('api', __name__)
cors = CORS(api, resources={r"/api/*": {"origins": "*"}})

# Allow CORS requests to this API
CORS(api)


# Get all campaigns
@api.route('/campaign', methods=['GET'])
def get_campaigns():
    all_campaigns = Campaign.query.all()
    print(all_campaigns)
    results = list(map(lambda campaign: campaign.serialize(),all_campaigns))

    return jsonify(results), 200

# Get all ONGS

@api.route('/ong', methods=['GET'])
# @jwt_required()
def get_ongs():
    all_ongs = Ongs.query.all()
    print(all_ongs)
    results = list(map(lambda ongs: ongs.serialize(),all_ongs))
    print(results)

    return jsonify(results), 200


# Get all voluntarios
@api.route('/voluntarios', methods=['GET'])
def get_voluntarios():
    all_voluntarios = Voluntario.query.all()
    print(all_voluntarios)
    results = list(map(lambda voluntario: voluntario.serialize(),all_voluntarios))
    print(results)

    return jsonify(results), 200

#  Get an specific campaign by ID
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

#  Get an specific ONG by ID   
@api.route('/ong/<int:ong_id>', methods=['GET'])
def get_ong(ong_id):
    print(ong_id)
    ong = Ongs.query.filter_by(id=ong_id).first()
    print(ong)
    all_ongs = Ongs.query.all()
    results = list(map(lambda ong: ong.serialize(),all_ongs))
    
    return jsonify(ong.serialize()), 200

#  Get an specific Voluntario by ID  
@api.route('/voluntario/<int:voluntario_id>', methods=['GET'])
def get_voluntario(voluntario_id):
    print(voluntario_id)
    voluntario = Voluntario.query.filter_by(id=voluntario_id).first()
    print(voluntario)
    all_voluntarios = Voluntario.query.all()
    results = list(map(lambda voluntario: voluntario.serialize(),all_voluntarios))
    
    return jsonify(voluntario.serialize()), 200
    
# Create a new campaign

@api.route('/campaign', methods=['POST'])
def post_campaign():
    body = request.get_json()
    new_campaign = Campaign(

                fecha_inicio=body['fecha_inicio'],
                fecha_finalizacion=body['fecha_finalizacion'],
                nombre=body['nombre'],
                ong_id=body['ong_id'],
                objetivo=body['objetivo'],
                articulos=body['articulos'])
    

    db.session.add(new_campaign)
    db.session.commit()
    response_body = {
        "msg": "new campaign created"
    }
    return jsonify(response_body), 200


# Create a new ONG
@api.route('/ong', methods=['POST'])
def post_ong():
    try:
        body = request.get_json()
        # Verifica la existencia de las claves requeridas en el cuerpo de la solicitud
        required_keys = ['nif', 'nombre', 'email', 'ciudad', 'actividad', 'aprobado', 'password', 'direccion']
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
            direccion=body['direccion']
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

# Create a new voluntario
@api.route('/voluntario', methods=['POST'])
def post_voluntario():
    try:
        body = request.get_json()

        # Validar que todos los campos necesarios estén presentes
        required_fields = ['nombre', 'email', 'password', 'ciudad', 'lat', 'lng']
        for field in required_fields:
            if field not in body:
                return jsonify({"error": f"El campo '{field}' es obligatorio"}), 400

        # Crear un nuevo voluntario
        new_voluntario = Voluntario(
            nombre=body['nombre'],
            email=body['email'],
            password=body['password'],  # Deberías almacenar la contraseña de forma segura
            ciudad=body['ciudad'],
            lat=body['lat'],
            lng=body['lng']
        )

        # Guardar en la base de datos
        db.session.add(new_voluntario)
        db.session.commit()

        # Respuesta exitosa
        return jsonify({"msg": "Nuevo voluntario creado"}), 201

    except Exception as e:
        # Manejar errores generales
        return jsonify({"error": str(e)}), 500



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

# # Update an ONG by ID
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
        ong.direccion = body.get('direccion', ong.direccion)
        

        db.session.commit()

        response_body = {
            "msg": "ONG actualizada correctamente"
        }

        return jsonify(response_body), 200
    except Exception as e:
        print("Error:", str(e))
        raise APIException("Error al actualizar ONG", status_code=500)

# # Update a voluntario by ID
 
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
    

# # Delete an ONG by ID
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

# # Delete a Voluntario by ID
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



# Login Admin

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

# Login ONG
# @api.route("/ongLogin", methods=["POST"])
# def ong_login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     ong = Ongs.query.filter_by(email=email).first()

#     if ong is None or password != ong.password:
#         return jsonify({"msg": "Wrong email or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

@api.route("/ongLogin", methods=["POST"])
def ong_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    ong = Ongs.query.filter_by(email=email).first()

    if ong is None:
        return jsonify({"msg": "No se pudo encontrar el correo electrónico"}), 401

    if email != ong.email or password != ong.password:
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401

    # Obtener los detalles del voluntario
    ong_data = {
        "id": ong.id,
        "nombre": ong.nombre,
        "email": ong.email
    }

    # Crear un token de acceso
    access_token = create_access_token(identity=email)

    # Enviar el token de acceso y los datos del ong en la respuesta
    return jsonify(access_token=access_token, ong_data=ong_data), 200


@api.route('/tuOng/<int:ong_id>', methods=['GET'])
def get_tuOng(ong_id):
    ong = Ongs.query.filter_by(id=ong_id).first()
    
    if ong is None:
        return jsonify({"msg": "No se pudo encontrar la ong"}), 404

    ong_data = {
        "id": ong.id,
        "nombre": ong.nombre,
        "email": ong.email,
        "aprobado": ong.aprobado,
        "ciudad": ong.ciudad,
        "lat":ong.lat,
        "lng":ong.lng
    }

    return jsonify(ong_data), 200
# Login Voluntario        

@api.route("/voluntarioLogin", methods=["POST"])
def voluntario_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    voluntario = Voluntario.query.filter_by(email=email).first()

    if voluntario is None:
        return jsonify({"msg": "No se pudo encontrar el correo electrónico"}), 401

    if email != voluntario.email or password != voluntario.password:
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401

    # Obtener los detalles del voluntario
    voluntario_data = {
        "id": voluntario.id,
        "nombre": voluntario.nombre,
        "email": voluntario.email
    }

    # Crear un token de acceso
    access_token = create_access_token(identity=email)

    # Enviar el token de acceso y los datos del voluntario en la respuesta
    return jsonify(access_token=access_token, voluntario_data=voluntario_data), 200

@api.route('/voluntarioDashboard/<int:voluntario_id>', methods=['GET'])
def get_voluntarioDashboard(voluntario_id):
    voluntario = Voluntario.query.filter_by(id=voluntario_id).first()
    
    if voluntario is None:
        return jsonify({"msg": "No se pudo encontrar el voluntario"}), 404

    voluntario_data = {
        "id": voluntario.id,
        "nombre": voluntario.nombre,
        "email": voluntario.email
    }

    return jsonify(voluntario_data), 200

# Signup Admin

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


# Signup Voluntario
@api.route("/voluntarioSignup", methods=["POST"])
def voluntario_signup():
  #request_body = request.get_jason()
    request_body = request.get_json()
    voluntario = Voluntario.query.filter_by(email=request_body["email"]).first()
    if voluntario is None:
        new_voluntario = Voluntario(email=request_body["email"], password=request_body["password"], is_active=True)
        db.session.add(new_voluntario)
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

