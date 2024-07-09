import sys
import os
import socket
import webbrowser
from flask import Flask, send_from_directory

if getattr(sys, 'frozen', False):  
    static_folder = os.path.join(sys._MEIPASS, 'build')
else:
    static_folder = os.path.join(os.path.abspath('.'), 'build')

app = Flask(__name__, static_folder=static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def open_browser(url):
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Failed to open browser: {e}")

if __name__ == "__main__":
    host = socket.gethostbyname(socket.gethostname())
    port = 5000  
    url = f"http://{host}:{port}"
    open_browser(url)
    app.run(host=host, port=port)
