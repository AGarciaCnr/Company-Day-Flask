from flask import Blueprint, request, jsonify
from models import db, User, Insignias
from flask_jwt_extended import get_jwt_identity, jwt_required

admin = Blueprint('admin', __name__)

@admin.route('/darInsignia', methods=['GET'])
@jwt_required()
def darInsignia():

    if get_jwt_identity() != 1:
        respuesta = jsonify({'status':'ERROR', 'message': 'No tiene permisos'})
        respuesta.headers.add('Access-Control-Allow-Origin', '*')
        return respuesta
    elif request.args.get('id') == None:
        respuesta = jsonify({'status':'ERROR', 'message': 'Falta id'})
        respuesta.headers.add('Access-Control-Allow-Origin', '*')
        return respuesta
    elif request.args.get('insignia') == None:
        respuesta = jsonify({'status':'ERROR', 'message': 'Falta insignia'})
        respuesta.headers.add('Access-Control-Allow-Origin', '*')
        return respuesta

    id = request.args.get('id')
    insignia = request.args.get('insignia')
    
    user = User.query.filter_by(id=id).first()

    if user == None:
        respuesta = jsonify({'status':'ERROR', 'message': 'No existe el usuario'})
        respuesta.headers.add('Access-Control-Allow-Origin', '*')
        return respuesta
    
    insignia = Insignias(id_usuario=id, id_insignia=insignia)
    db.session.add(insignia)
    db.session.commit()

    respuesta = jsonify({'status':'OK', 'message': 'Insignia dada'})
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta