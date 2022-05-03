import email
from flask import Blueprint, request, jsonify
from models import db, User, Token
from security import hashPassword, generateRandomToken, sendEmailConfirmation

uRegister = Blueprint('uRegister', __name__)

@uRegister.route('/', methods=['POST'])
def registerRoute():
    email = request.form['email']
    password = request.form['password']
    isAlumn = request.form['isAlumn']

    if email == None or password == None or isAlumn == None:
        answer = jsonify({'status': 'ERROR', 'message': 'Missing parameters'})
        answer.headers.add('Access-Control-Allow-Origin', '*')
        return answer

    user = register(email, password, isAlumn)

    if user:
        answer = jsonify({'status': 'OK', 'id': user.id, 'email': user.email, 'isAlumn': user.isAlumn})
    else:
        answer = jsonify({'status': 'ERROR', 'message': 'User already exist'})

    answer.headers.add('Access-Control-Allow-Origin', '*')
    return answer

@uRegister.route('/test', methods=['GET'])
def test():
    email = request.args.get('email')
    # Prueba insert
    user = createUser(
    email = email,
    password = '12345',
    isAlumn = True
    )

    db.session.add(user)
    db.session.commit()
    print(user)

    return 'OK'


@uRegister.route('/confirmar', methods=['GET'])
def confirmRoute():
    token = request.args.get('token')

    if token == None:
        answer = {'status': 'ERROR', 'message': 'Missing parameters'}
        return jsonify(answer)

    token = db.session.query(Token).filter_by(token=token)

    if token.count() == 0:
        answer = {'status': 'ERROR', 'message': 'Token dont exist'}
        return jsonify(answer)

    token = token.one()

    user = activateUser(token.user_id)

    answer = {'status': 'OK', 'id': user.id, 'email': user.email, 'isAlumn': user.isAlumn}

    return jsonify(answer)

def register(email, password, isAlumn):
    user = db.session.query(User).filter_by(email=email)
    if user.count() == 0:
        user = createUser(email, password, isAlumn)
        
        token = generateRandomToken()
        createToken(token, user.id)

        sendEmailConfirmation(email, token)

        return user
    else:
        return None

def createUser(email, password, isAlumn):
    user = User(email=email, hash_password=password, isAlumn=isAlumn)
    db.session.add(user)
    db.session.commit()
    return user

def createToken(token, user_id):
    token = Token(token=token, user_id=user_id)
    db.session.add(token)
    db.session.commit()
    return token

def activateUser(id):
    user = db.session.query(User).filter_by(id=id)
    
    if user.count() == 0:
        answer = {'status': 'ERROR', 'message': 'User dont exist'}
        return jsonify(answer)

    user = user.one()

    user.isActive = True

    # Eliminar el token
    token = db.session.query(Token).filter_by(user_id=user.id)
    token = token.one()
    db.session.delete(token)

    db.session.commit()

    return user