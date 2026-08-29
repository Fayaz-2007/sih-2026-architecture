#!/usr/bin/env python3
"""Tiny static server for the architecture section.

Run:  python serve.py           (defaults to port 4173)
      python serve.py 8080       (custom port)
Then open the printed URL in a browser.
"""
import http.server
import socketserver
import sys
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


try:
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"[OK] Architecture section:  http://localhost:{PORT}/")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n[OK] Server stopped")
except OSError as e:
    print(f"[ERROR] {e}  (port {PORT} may already be in use — try: python serve.py 4174)")
