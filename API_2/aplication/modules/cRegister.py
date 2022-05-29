import email
from flask import Blueprint, request, jsonify
from models import db, Company, User, Token
from security import hashPassword, generateRandomToken, sendEmailConfirmation

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
        return company
    else:
        return None