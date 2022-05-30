import email
from hashlib import new
from flask import Blueprint, request, jsonify
from models import db, Company, User, Token
from security import sendCompanyEmailConfirmation, generateRandomToken, generateRandomPassword

cRegister = Blueprint('cRegister', __name__)

cRegister.route('/', methods=['POST'])
def registerRoute():
    name = request.form['name']
    contactPersonName = request.form['contactPersonName']
    contactPhone = request.form['contactPhone']
    contactEmail = request.form['contactEmail']
    address = request.form['address']
    city = request.form['city']
    province = request.form['province']
    postalCode = request.form['postalCode']
    country = request.form['country']
    website = request.form['website']
    lookingForCandidates = request.form['lookingForCandidates']

    if name == None or contactPersonName == None or contactPhone == None or contactEmail == None or address == None or city == None or province == None or postalCode == None or country == None or website == None or lookingForCandidates == None:
        answer = jsonify({'status': 'ERROR', 'message': 'Missing parameters'})
        answer.headers.add('Access-Control-Allow-Origin', '*')
        return answer

    company = register(name, contactPersonName, contactPhone, contactEmail, 
    address, city, province, postalCode, country, 
    website, lookingForCandidates)

    if company:
        answer = jsonify({'status': 'OK', 'id': company.id, 'name': company.name, 'contactPersonName': company.contactPersonName, 'contactPhone': company.contactPhone, 'contactEmail': company.contactEmail, 'address': company.address, 'city': company.city, 'province': company.province, 'postalCode': company.postalCode, 'country': company.country, 'website': company.website, 'lookingForCandidates': company.lookingForCandidates})
    else:
        answer = jsonify({'status': 'ERROR', 'message': 'Company already exist'})

    answer.headers.add('Access-Control-Allow-Origin', '*')
    return answer


@cRegister.route('/confirmar', methods=['GET'])
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


def register(name, contactPersonName, contactPhone, contactEmail, 
address, city, province, postalCode, country, 
website, lookingForCandidates):
    company = db.session.query(Company).filter_by(name=name)
    if company.count() == 0:
        company = Company(
            name = name,
            contactPersonName = contactPersonName,
            contactPhone = contactPhone,
            contactEmail = contactEmail,
            address = address,
            city = city,
            province = province,
            postalCode = postalCode,
            country = country,
            website = website,
            lookingForCandidates = lookingForCandidates
        )
        db.session.add(company)
        db.session.commit()

        user = db.session.query(User).filter_by(email=contactEmail)
        if user.count() == 0:
            newPassword = generateRandomPassword()
            user = User(
                email = contactEmail,
                password = newPassword,
                isAlumn = 'False'
            )
            db.session.add(user)
            db.session.commit()

            token = generateRandomToken()
            newToken = Token(
                token = token,
                user = user
            )
            db.session.add(newToken)
            db.session.commit()

            sendCompanyEmailConfirmation(contactEmail, token, newPassword)

            return company

        return company
    else:
        return None

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