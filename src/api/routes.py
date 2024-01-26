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

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_ong = get_jwt_identity()
    return jsonify(logged_in_as=current_ong), 200