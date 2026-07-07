#!/usr/bin/env python3
"""
NAVIONE — Local Python 3 server
In the terminal: python server.py
Then open http://localhost:8080 in your browser.
"""
import http.server, webbrowser, threading, os

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args): pass

print("========================================")
print("   NAVIONE - Local server active")
print(f"   http://localhost:{PORT}")
print("   Ctrl+C to stop")
print("========================================")
threading.Timer(1.2, lambda: webbrowser.open(f"http://localhost:{PORT}")).start()
http.server.HTTPServer(("", PORT), Handler).serve_forever()
