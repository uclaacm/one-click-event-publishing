from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def hello():
    return "Our backend server!"
