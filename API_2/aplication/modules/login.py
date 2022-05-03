from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from models import db, User
from security import verifyPassword

login = Blueprint('login', __name__)

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