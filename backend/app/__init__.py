from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Import and register blueprints
    from .api import check_bp
    app.register_blueprint(check_bp)

    @app.route('/')
    def health_check():
        return {'status': 'healthy', 'service': 'ZeroReview API', 'version': '1.0.0'}

    return app
