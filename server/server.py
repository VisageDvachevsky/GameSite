import sys
import os
import socket
import webbrowser
import logging
from flask import Flask, send_from_directory

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

if getattr(sys, 'frozen', False):  
    static_folder = os.path.join(sys._MEIPASS, 'build')
    logger.info(f"Application is running as a frozen bundle. Static folder path: {static_folder}")
else:
    static_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'build'))
    logger.info(f"Application is running in a development environment. Static folder path: {static_folder}")

app = Flask(__name__, static_folder=static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    file_path = os.path.join(app.static_folder, path if path != "" else 'index.html')
    
    if path != "" and os.path.exists(file_path):
        logger.info(f"Serving file: {file_path}")
        return send_from_directory(app.static_folder, path)
    else:
        logger.info(f"Serving default index.html from: {app.static_folder}")
        return send_from_directory(app.static_folder, 'index.html')

def open_browser(url):
    try:
        webbrowser.open(url)
    except Exception as e:
        logger.error(f"Failed to open browser: {e}")

if __name__ == "__main__":
    host = socket.gethostbyname(socket.gethostname())
    port = 5000  
    url = f"http://{host}:{port}"

    logger.info(f"Starting Flask server at {url}")
    open_browser(url)
    
    app.run(host=host, port=port)
