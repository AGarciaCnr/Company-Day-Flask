import random
import string
import bcrypt
from flask import current_app
from flask_mail import Mail, Message

mail = current_app.extensions['mail']

def hashPassword(plain_text_password):
    return bcrypt.hashpw(plain_text_password.encode("utf8"), bcrypt.gensalt())

def verifyPassword(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password.encode("utf8"), hashed_password)

def generateRandomToken():
    return ''.join(random.choice(string.ascii_letters + string.digits) for i in range(128))

def generateRandomPassword():
    return ''.join(random.choice(string.ascii_letters + string.digits) for i in range(12))

def sendEmailConfirmation(email, token):
    msg = Message('Confirmación de cuenta de Company Day', sender=current_app.config['MAIL_USERNAME'], recipients=[email])
    msg.body = f'''Hola, para confirmar tu cuenta, por favor haz click en el siguiente enlace:'''
    msg.html = f'''<p>Hola, para confirmar tu cuenta, por favor haz click en el siguiente enlace:</p>'''
    msg.html += f'''<p><a href="{current_app.config['BASE_URL']}/API_2/uRegister/confirmar?token={token}">Confirmar cuenta</a></p>'''
    msg.html += f'''<p>O copia y pega el siguiente enlace en tu navegador:</p>'''
    msg.html += f'''<p>{current_app.config['BASE_URL']}/API_2/uRegister/confirmar?token={token}</p>'''
    msg.html += f'''<p>Si no has solicitado una cuenta, ignora este mensaje.</p>'''
    
    mail.send(msg)

def sendCompanyEmailConfirmation(email, token, password):
    msg = Message('Confirmación de cuenta de Company Day', sender=current_app.config['MAIL_USERNAME'], recipients=[email])
    msg.body = f'''Hola, para confirmar tu cuenta, por favor haz click en el siguiente enlace:'''
    msg.html = f'''<p>Hola, para confirmar tu cuenta, por favor haz click en el siguiente enlace:</p>'''
    msg.html += f'''<p><a href="{current_app.config['BASE_URL']}/API_2/uRegister/confirmar?token={token}">Confirmar cuenta</a></p>'''
    msg.html += f'''<p>O copia y pega el siguiente enlace en tu navegador:</p>'''
    msg.html += f'''<p>{current_app.config['BASE_URL']}/API_2/uRegister/confirmar?token={token}</p>'''
    msg.html += f'''<p>Su contraseña es la siguiente:</p>'''
    msg.html += f'''<p>{password}</p>'''
    msg.html += f'''<p>Si no has solicitado una cuenta, ignora este mensaje.</p>'''
    
    mail.send(msg)