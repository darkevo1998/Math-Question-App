import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.routes import register_routes
from src.db import init_db

load_dotenv()

def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("APP_SECRET_KEY", "dev")
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize DB with retry logic
    try:
        init_db()
        print("Database connection successful")
    except Exception as e:
        print(f"Database connection failed: {e}")
        # Continue without database for now

    # Register routes
    register_routes(app)

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    @app.get("/test")
    def test():
        return {"status": "ok", "message": "Flask app is working!"}

    return app

# Create the app instance
app = create_app()

# For Vercel serverless function
def handler(request):
    """Vercel serverless function handler"""
    with app.test_request_context(request):
        return app.full_dispatch_request()
