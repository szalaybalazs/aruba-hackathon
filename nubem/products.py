import hashlib
from uuid import uuid1
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from pymongo import MongoClient
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo.errors import WriteError
from error import SchemaValidationError

from db import Connection

app2 = Flask(__name__)
CORS(app2)
CORS(app2, origins=["http://localhost:8001"])
db=Connection('products')

limiter = Limiter(
    app=app2,
    key_func=get_remote_address,  # Az alapértelmezett kulcs funkció az ügyfél IP-címének használata
    default_limits=["200 per day", "50 per hour"]
)

# JWT Setup
app2.config["JWT_SECRET_KEY"] = "please-remember-to-change-me" #TODO CHANGE
app2.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app2)


@app2.post('/product')
def add_product():

    content=request.json
    content["_id"]= str( uuid1().hex )
    
    try:
        result = db.product.insert_one(content)
        insert_product=db.product.find_one(
            {"_id":result.inserted_id}
        )

        return {
            "message":"Product successfully inserted",
            "data":insert_product
        }, 201

    except WriteError as e:
        return {
            "message":SchemaValidationError(e)
        }, 400


@app2.get('/product')
def get_product_info():
    request_data = request.json
    product_name = request_data.get("name", None)

    if not product_name:
        return {"message": "Product name is required"}, 400

    product_info = db.product.find_one({"name": product_name})
    
    if not product_info:
        return {"message": "Product not found"}, 404
    else:
        return {"message":"Product found", "data": product_info}, 201


@app2.get('/products')
def get_all_products():
    products_cursor = db.product.find({})
    products_list = list(products_cursor)
    
    # Optional: Convert MongoDB's ObjectIDs to strings
    for product in products_list:
        product["_id"] = str(product["_id"])

    return jsonify({"message":"Product successfully listed", "data": products_list}), 201

if __name__ == '__main__':
    app2.run(debug=True)#, port=8887) # host='0.0.0.0',