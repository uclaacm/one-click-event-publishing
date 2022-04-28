from flask import Flask, request, jsonify
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)


@app.route("/", methods=['GET'])
def hello():
    return "Our backend server!"
