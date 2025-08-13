import os
from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from dotenv import load_dotenv

from src.routes import register_routes
from src.db import init_db

load_dotenv()

def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("APP_SECRET_KEY", "dev")
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize API with Swagger documentation
    api = Api(
        app,
        version='1.0',
        title='MathQuest API',
        description='Interactive Math Learning App API',
        doc='/docs',
        prefix='/api'
    )

    # Initialize DB
    init_db()

    # Register routes with API
    register_routes(api)

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=True) 