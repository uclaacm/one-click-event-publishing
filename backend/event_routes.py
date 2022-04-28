# from crypt import methods
from route_config import *
from flask import Flask, request, make_response
import json
from utilities import create_discord_event


@app.route("/create-event", methods=['POST'])
def create_event():
    if request.is_json:
        try:
            # Fetch data from json
            json_data = request.get_json()
            name = json_data['name']
            description = json_data['description']
            start_time = json_data['start_time']
            end_time = json_data['end_time']
            location = json_data['location']
            image = json_data['image']
        except:
            return make_response(jsonify({"message": "improper data format, must include a name, description, start_time, end_time, location, image"}), 400)

        # Post the event to different websites
        try:
            create_discord_event(
                name, description, start_time, end_time, location, image)
        except SystemError as e:
            return make_response(jsonify({"message": f"Environment variable {str(e)} not set correctly"}, 501))
        except Exception as e:
            return make_response(jsonify({"message": str(e)}, 501))
    else:
        return make_response(jsonify({"message": "improper data format, must be a json"}), 400)

    return make_response(jsonify({"message": "coolio"}), 200)
