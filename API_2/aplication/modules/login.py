from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from models import db, User
from security import verifyPassword

login = Blueprint('login', __name__)

@login.route('/', methods=['POST'])
def uLogin():
    email = request.form['email']
    password = request.form['password']

    if email == None or password == None:
        return jsonify({'status': 'ERROR', 'message': 'Missing parameters'})

    user = getUser(email, password)

    print("Usuario: ", user)

    if user:
        if user['isActive'] == True:
            user['status'] = 'OK'
            user['access_token'] = create_access_token(identity=user['id']) 
            response = jsonify(user)
        else:
            user['status'] = 'ERROR'
            user['message'] = 'Usuario no activado'
            response = jsonify(user)
    else:
        response = jsonify({'status':'ERROR', 'message': 'Usuario o contraseña incorrectos'})

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@login.route('/getUser', methods=['GET'])
@jwt_required()
def cookie_login():
    
        if request.args.get('jwt') == None:
            response = jsonify({'status':'ERROR', 'message': 'Falta token'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    
        current_user_id = get_jwt_identity()
        user = getTokenUser(current_user_id)
        user['status'] = 'OK'
    
        response = jsonify(user)
    
        response.headers.add('Access-Control-Allow-Origin', '*')
    
        return response

def getUser(email, password):
    query = db.session.query(User).filter_by(email=email)
    if query.count() == 0:
        return None
    else:
        user = query.one()
        if user.isActive == True:
            if verifyPassword(password, user.hash_password):
                return user
            else:
                return None
        else:
            return None

def getTokenUser(user_id):
    query = db.session.query(User).filter_by(user_id=user_id)
    if query.count() == 0:
        return None
    else:
        user = query.one()
        data = {'id': user.id, 'email': user.email, 'isAlumn': user.isAlumn, 'isActive': user.isActive}
        return data