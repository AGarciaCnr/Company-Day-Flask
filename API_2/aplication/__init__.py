from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail

# Base de datos
db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def init_app():
    # Inicializar la aplicación
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Inicializar los plugins
    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    with app.app_context():
        
        # Incluir rutas
        from .modules.login import login
        from .modules.uRegister import uRegister
        from .modules.admin import admin

        # Registrar blueprints
        app.register_blueprint(login, url_prefix='/API_2/login')
        app.register_blueprint(uRegister, url_prefix='/API_2/uRegister')
        app.register_blueprint(admin, url_prefix='/API_2/admin')

        return app