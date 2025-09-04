#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stdout.write(f"{self.log_date_time_string()} - {format%args}\n")
        sys.stdout.flush()
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    # Change to the webapp directory
    os.chdir('/home/user/webapp')
    
    # Start server on port 8000
    server = HTTPServer(('0.0.0.0', 8000), CustomHandler)
    print("🚀 HeyGen Landing Page Server running on port 8000")
    print("📂 Serving files from: /home/user/webapp")
    sys.stdout.flush()
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        server.server_close()