from textwrap import wrap
from werkzeug.security import check_password_hash, generate_password_hash
from route_config import *
from flask import Flask, request, make_response
import os
import jwt
import datetime
from functools import wraps
# check if the pwd is correct. if it is, give user a JWT token

# authentication wrapper middleware for our routes


def auth_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        # try to find auth-token in the request headers, if it isn't present then the access is not authenticated
        auth_token = None
        if 'auth-token' in request.headers:
            auth_token = request.headers['auth-token']
            if not auth_token:
                return make_response(jsonify({'message': 'authorization required for this request'}, 401))
            try:
                # get env variables & check if they're there
                jwt_salt = os.getenv('JWT_SALT')
                jwt_secret = os.getenv("JWT_SECRET")
                if jwt_salt is None or jwt_secret is None:
                    return make_response(jsonify({'message': 'missing env variable'}, 404))

                # try to decode the jwt token
                jwt_data = jwt.decode(auth_token, jwt_salt, algorithms=["HS256"])

                # check if the token secret matches the one from .env
                try:
                    if jwt_data['secret'] != jwt_secret:
                        print(jwt_data['secret'])
                        return make_response(jsonify({'message': 'invalid jwt token'}, 403))
                except:
                    # secret missing
                    return make_response(jsonify({'message': 'jwt token is malformed: missing secret'}, 400))
                print('authenticated!')
            except jwt.ExpiredSignatureError:
                # jwt token decode: expired token
                return make_response(jsonify({'message': 'jwt token expired, must reauthenticate'}, 406))
            except jwt.InvalidTokenError:
                # jwt token decode: invalid token
                return make_response(jsonify({'message': 'invalid jwt token, reauthenticate'}, 406))
        else:
            # no auth-token in header
            return make_response(jsonify({'message': 'missing auth token'}, 401))
        return f(*args, **kwargs)
    return decorator


@app.route("/authenticate", methods=['POST'])
def check_password():
    auth = request.authorization
    # the user did not input a password to check
    if not auth or not auth.password:
        return make_response(jsonify({"message": "Authentication request requires password"}), 400)

    # checking if the password inputted matches the true password
    load_dotenv()
    hashed_pwd = generate_password_hash(os.getenv('EVENTS_PWD'))
    authenticated = check_password_hash(hashed_pwd, auth.password)
    if authenticated:
        jwt_secret = os.getenv("JWT_SECRET")
        jwt_salt = os.getenv("JWT_SALT")
        if jwt_salt is None or jwt_secret is None:
            return make_response(jsonify({'message': 'missing env variable'}, 404))
        
        jwt_token = jwt.encode({
            'secret': jwt_secret,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, os.environ.get("JWT_SALT"), "HS256")
        return make_response(jsonify({"token": jwt_token}), 200)
    else:
        return make_response(jsonify({"message": "Password is not correct"}), 403)

@app.route("/authorize-token", methods=['POST'])
def authorize_token():
    # try to find auth-token in the request headers, if it isn't present then the access is not authenticated
    auth_token = None
    if 'auth-token' in request.headers:
        auth_token = request.headers['auth-token']
        if not auth_token:
            return make_response(jsonify({'message': 'authorization token required for this request'}, 401))
        try:
            # get env variables & check if they're there
            jwt_salt = os.getenv('JWT_SALT')
            jwt_secret = os.getenv("JWT_SECRET")
            if jwt_salt is None or jwt_secret is None:
                return make_response(jsonify({'message': 'missing env variable'}, 404))

            # try to decode the jwt token
            jwt_data = jwt.decode(auth_token, jwt_salt, algorithms=["HS256"])

            # check if the token secret matches the one from .env
            try:
                if jwt_data['secret'] != jwt_secret:
                    return make_response(jsonify({'message': 'invalid jwt token'}, 403))
            except:
                # secret missing
                return make_response(jsonify({'message': 'jwt token is malformed: missing secret'}, 400))
        except jwt.ExpiredSignatureError:
            # jwt token decode: expired toke
            return make_response(jsonify({'message': 'jwt token expired, must reauthenticate'}, 406))
        except jwt.InvalidTokenError:
            # jwt token decode: invalid token
            return make_response(jsonify({'message': 'invalid jwt token, reauthenticate'}, 406))
    else:
        # no auth-token in header
        return make_response(jsonify({'message': 'missing auth token'}, 401))
    
    return make_response(jsonify({'message': 'valid jwt token'}, 200))
