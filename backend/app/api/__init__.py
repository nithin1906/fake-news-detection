from flask import Blueprint

check_bp = Blueprint('check', __name__, url_prefix='/api/v1')

from . import check  # Import routes to register them with the blueprint
