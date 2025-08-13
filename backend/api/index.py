from http.server import BaseHTTPRequestHandler
import sys
import os

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app

app = create_app()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Handle GET requests
        with app.test_request_context(self.path):
            response = app.full_dispatch_request()
            self.send_response(response.status_code)
            for header, value in response.headers:
                self.send_header(header, value)
            self.end_headers()
            self.wfile.write(response.get_data())
    
    def do_POST(self):
        # Handle POST requests
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        with app.test_request_context(self.path, data=post_data, method='POST'):
            response = app.full_dispatch_request()
            self.send_response(response.status_code)
            for header, value in response.headers:
                self.send_header(header, value)
            self.end_headers()
            self.wfile.write(response.get_data())
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
