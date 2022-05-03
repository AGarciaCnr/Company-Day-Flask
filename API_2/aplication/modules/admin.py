from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import get_jwt_identity, jwt_required

admin = Blueprint('admin', __name__)

@admin.route('/', methods=['GET'])
@jwt_required()
def getAdmin():

    query = db.session.query(User).filter_by(id=get_jwt_identity()).first()

     if query == None:
         response = jsonify({'status':'ERROR', 'message': 'No existe el usuario'})
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response
     elif query.isAlumn == 'True':
         response = jsonify({'status':'ERROR', 'message': 'No tiene permisos'})
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response
    data = []
    table = db.session.query(User).all()
    
    for row in table:
        json = {"id": row.id, "email": row.email, "isActive": row.isActive, "isAlumn" : row.isAlumn}

        data.append(json)

    response = jsonify({'status':'OK', 'message': 'Tabla de usuarios', 'data': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response