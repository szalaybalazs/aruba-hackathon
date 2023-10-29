import json
from typing import Dict, Optional
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from pymongo import MongoClient
import hashlib
import re
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from uuid import uuid1
from flask import jsonify
from functools import wraps

from pymongo.errors import WriteError
from error import SchemaValidationError

from db import Connection

app1 = Flask(__name__)
#limiter = Limiter(app=app, key_func=get_remote_address)
CORS(app1)
CORS(app1, origins=["http://localhost:8001"])

def role_required(required_role):
    @wraps
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user_email = get_jwt_identity()
            current_user_data = db.user.find_one({"email": current_user_email})
            if current_user_data and current_user_data.get("role") == required_role:
                return fn(*args, **kwargs)
            else:
                return jsonify({"msg": "Permission denied"}), 403
        return decorator
    return wrapper



#limiter = Limiter(
#    app=app,
#    key_func=get_remote_address,  # Az alapértelmezett kulcs funkció az ügyfél IP-címének használata
#    default_limits=["200 per day", "50 per hour"]
#)

# JWT Setup
app1.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app1.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app1)

db=Connection('users')




# Create admin user
admin_password = hashlib.sha256("admin_password".encode()).hexdigest()

if not db.user.find_one({"email" : "admin@admin.com"}):
    db.user.insert_one(
        {
        "_id": str( uuid1().hex ),
        "email": "admin@admin.com",
        "first_name": "admin",
        "last_name": "admin",
        "user_name": "admin",
        "password": admin_password
        })


@app1.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app1.post('/register')
#@limiter.limit("5 per minute")
def register():

    # Extract all fields from POST request
    content=request.json
    
    # Extract information from POST request
    email = request.json.get("email", None)
    firstname = request.json.get("firstname", None)
    lastname = request.json.get("lastname", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    role = request.json.get("role", None)

    # Check for duplicate email or username
    if db.user.find_one({"email": email}):
        return {"msg": "Email already exists"}, 400
    if db.user.find_one({"username": username}):
        return {"msg": "Username already exists"}, 400

    # Validate field lengths
    if len(email) > 100:
        return {"msg": "Email length should not exceed 100 characters"}, 400
    if len(firstname) > 100:
        return {"msg": "First name length should not exceed 100 characters"}, 400
    if len(lastname) > 100:
        return {"msg": "Last name length should not exceed 100 characters"}, 400
    if len(password) > 1000:
        return {"msg": "Password length should not exceed 1000 characters"}, 400

    # Hash the password and insert the user into the database
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    try:
        db.user.insert_one({
            "_id": str( uuid1().hex ),
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "password": hashed_password,
            "role":role
        })
        
        return {
            "msg": "User created"
        }, 201

    except WriteError as e:
        return {
            "message":SchemaValidationError(e)
        }, 400


@app1.post('/login')
#@limiter.limit("5 per minute")
def create_token():
    email = request.json.get("email", None)
    password = hashlib.sha256(request.json.get("password", "").encode()).hexdigest()

    user = db.user.find_one({"email": email, "password": password})
    if not user:
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    return {"access_token": access_token, "username": user["username"], "email": user["email"], "firstname": user["firstname"],"lastname": user["lastname"]}


@app1.post("/logout")  
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app1.route('/profile')
@jwt_required()
def my_profile():
    current_user_email = get_jwt_identity()  # The current user's email address
    current_user_data: Optional[Dict] = db.user.find_one({"email": current_user_email})

    if current_user_data is None:
        return jsonify({"message": "User not found"}), 404

    # Remove sensitive information
    current_user_data.pop('password', None)
    current_user_data.pop('access_token', None)

    # Convert ObjectId to string or remove it
    if '_id' in current_user_data:
        current_user_data['_id'] = str(current_user_data['_id'])

    response = jsonify(current_user_data)
    return response, 200


@app1.post('/set-role')
@jwt_required()
def set_role():
    current_user_email = get_jwt_identity()
    current_user_data = db.user.find_one({"email": current_user_email})

    # Ellenőrizzük, hogy az aktuális felhasználó admin-e
    if current_user_data.get("role") != "admin":
        return {"msg": "Permission denied"}, 403

    # Kapjuk el az inputot (az email címet és a beállítandó role-t)
    target_email = request.json.get("email", None)
    new_role = request.json.get("role", None)

    if target_email is None or new_role is None:
        return {"msg": "Both 'email' and 'role' need to be provided"}, 400

    target_user = db.user.find_one({"email": target_email})

    if not target_user:
        return {"msg": "User not found"}, 404

    # Frissítjük a felhasználót az új role-lal
    db.user.update_one({"email": target_email}, {"$set": {"role": new_role}})
    return {"msg": f"Role of user {target_email} set to {new_role}"}, 200

if __name__ == '__main__':
    app1.run(debug=True)#,  port=8887) #host='0.0.0.0',