from flask import Blueprint, request, jsonify, current_app
from models import db, User, Token
from security import enviarEmailConfirmacion, hashearPassword, generarTokenAleatorio

registro = Blueprint('registro', __name__)

@registro.route('/' , methods=['POST'])
def register():
    nombre_completo = request.form['nombre_completo']
    email = request.form['email']
    password = request.form['password']
    matriculacion = request.form['matriculacion']

    if nombre_completo == None or email == None or password == None or matriculacion == None:
        respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}
        return jsonify(respuesta)

    usuario = registrar(nombre_completo, email, password, matriculacion)

    if usuario:
        respuesta = jsonify({'status':'OK','id': usuario.id, 'nombre_completo': usuario.nombre_completo, 'email': usuario.email, 'matriculacion': usuario.matriculacion})
    else:
        respuesta = jsonify({'status':'ERROR', 'message': 'Usuario ya existe'})

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

@registro.route('/confirmar', methods=['GET'])
def confirmar():
    token = request.args.get('token')
    print(token)

    if token == None:
        respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}
        return jsonify(respuesta)

    token_db = db.session.query(Token).filter_by(token=token)

    if token_db.count() == 0:
        respuesta = {'status': 'ERROR', 'message': 'Token no existe'}
        return jsonify(respuesta)
    
    token_db = token_db.one()

    activarUsuario(token_db.user_id)

    respuesta = {'status': 'OK', 'message': 'Cuenta activada'}

    return jsonify(respuesta)

# Funciones

def registrar(nombre_completo, email, password, matriculacion):

    user = db.session.query(User).filter_by(email=email)

    if user.count() == 0:
        usuario = crearUsuario(nombre_completo, email, password, matriculacion)

        # Creo un token aleatorio
        token = generarTokenAleatorio()

        # Lo guardo en la base de datos
        guardarToken(token=token, user_id=usuario.id)

        # Envio el email de confirmación
        enviarEmailConfirmacion(email, token)

        return usuario
    else:
        return None

def crearUsuario(nombre_completo, email, password, matriculacion):
    
    usuario = User(nombre_completo=nombre_completo,
                    email=email,
                    hash_password=hashearPassword(password),
                    matriculacion=matriculacion)
    db.session.add(usuario)
    db.session.commit()
    print("Usuario creado!")

    return usuario

def guardarToken(token, user_id):
    token_db = Token(token=token, user_id=user_id)
    db.session.add(token_db)
    db.session.commit()
    return token_db

def activarUsuario(id):
    usuario = db.session.query(User).filter_by(id=id)

    if usuario.count() == 0:
        respuesta = {'status': 'ERROR', 'message': 'Usuario no existe'}
        return jsonify(respuesta)

    usuario = usuario.one()

    usuario.activo = True

    # Elimino el token

    token = db.session.query(Token).filter_by(user_id=usuario.id)
    
    token = token.one()

    db.session.delete(token)

    db.session.commit()

    return usuario
