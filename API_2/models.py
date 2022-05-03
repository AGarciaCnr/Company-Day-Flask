from sqlalchemy import Column, Integer, String, Boolean, DateTime, Time, ForeignKey
from flask import current_app

db = current_app.extensions['sqlalchemy'].db

# Crear tabla de usuarios
class User(db.Model):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(50), nullable=False, unique=True)
    hash_password = Column(String(128))
    isActive = Column(Boolean, default=False)
    isAlumn = Column(String(10))

# Crear tabla de tokens
class Token(db.Model):
    __tablename__ = 'Tokens'
    token = Column(String(128), nullable=False, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.id'), nullable=False)

db.create_all()