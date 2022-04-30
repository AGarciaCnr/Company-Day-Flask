# Configuración Flask
from datetime import timedelta

class Config:

    # App
    BASE_URL = 'http://localhost:5000'

    # JWT (Json Web Token)
    JWT_SECRET_KEY = 't0k3n_D3v3l0p3r'
    JWT_TOKEN_LOCATION = ['headers', 'query_string']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=1)

    # Base de datos

    SQLALCHEMY_DATABASE_URI = 'sqlite:///./deportes.db?check_same_thread=False'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'app.deportes.utad.2022@gmail.com'
    MAIL_PASSWORD = 'D3VTD3rbMQCndLS'
    FLASKY_MAIL_SUBJECT_PREFIX = '[Confirmar cuenta]'
    FLASKY_MAIL_SENDER = 'David Villaverde'