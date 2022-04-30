from sqlalchemy import Column, Integer, String, Boolean, DateTime, Time, ForeignKey
from flask import current_app

db = current_app.extensions['sqlalchemy'].db

# Creamos la tabla usuario
class User(db.Model):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_completo = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    hash_password = Column(String(128))
    matriculacion = Column(String(4), nullable=False)
    descripcion = Column(String(250))
    activo = Column(Boolean, default=False)

class Token(db.Model):
    __tablename__ = 'Tokens'
    token = Column(String(128), nullable=False, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.id'), nullable=False)

class Insignias(db.Model):
    __tablename__ = 'Insignias'
    id_insignia = Column(Integer, primary_key=True, nullable=False)
    id_usuario = Column(Integer, ForeignKey('Users.id'), primary_key=True, nullable=False)

# Creamos la tabla Participacion
class Integrante(db.Model):
    __tablename__ = 'Integrantes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('Users.id'), nullable=False)
    id_evento = Column(Integer, ForeignKey('Eventos.id_evento'), nullable=False)

# Creamos la tabla Deportes
class Deporte(db.Model):
    __tablename__ = 'Deportes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)

class Evento(db.Model):
    __tablename__ = 'Eventos'
    id_evento = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('Users.id'), nullable=False) 
    id_deporte = Column(Integer, ForeignKey('Deportes.id'), nullable=False) 
    max_participantes = Column(Integer, nullable=False)
    nombre_evento = Column(String(50), nullable=False)
    descripcion_evento = Column(String(250))
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)

# Ejecutamos create_all() para crear la tabla en la base de datos

db.create_all()