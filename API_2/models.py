from email.policy import default
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

# Crear tabla empresas
class Company(db.Model):
    __tablename__ = 'Companies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False, unique=True)
    contactPersonName = Column(String(50), nullable=False)
    contactPhone = Column(String(20))
    contactEmail = Column(String(50))
    address = Column(String(100))
    city = Column(String(50))
    province = Column(String(50))
    postalCode = Column(String(10))
    country = Column(String(50))
    website = Column(String(50))
    logo = Column(String(50), default='default.png')
    lookingForCandidates = Column(String(10))

db.create_all()