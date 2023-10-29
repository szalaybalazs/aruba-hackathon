from uuid import uuid1
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from pymongo import MongoClient, ReturnDocument
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo.errors import WriteError
from error import SchemaValidationError

from db import Connection

app3 = Flask(__name__)
CORS(app3)
CORS(app3, origins=["http://localhost:8001"])
db=Connection('carts')

limiter = Limiter(
    app=app3,
    key_func=get_remote_address,  # Az alapértelmezett kulcs funkció az ügyfél IP-címének használata
    default_limits=["200 per day", "50 per hour"]
)

# JWT Setup
app3.config["JWT_SECRET_KEY"] = "please-remember-to-change-me" #TODO CHANGE
app3.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app3)


def add_to_cart():
    content = request.json
    content["_id"] = str(uuid1().hex)

    try:
        existing_product = db.cart.find_one({'name': content.get("name", None)})

        if existing_product is None:
            # Insert the new product into the cart
            content["quantity"] = 1
            result = db.cart.insert_one(content)
            insert_product = db.product.find_one({"_id": result.inserted_id})
        else:
            # Update the quantity of the existing product in the cart
            new_quantity = existing_product["quantity"] + 1
            db.cart.find_one_and_update({'name': content["name"]}, {'$set': {"quantity": new_quantity}}, return_document=ReturnDocument.AFTER)
            insert_product = existing_product  # Or fetch the updated document from the database if needed

        return {
            "message": "Product was successfully added to cart",
            "data": insert_product
        }, 201

    except WriteError as e:
        return {
            "message": "SchemaValidationError: {}".format(e)
        }, 400



# @app3.post('/prod-info')
# def get_product_info():
#     request_data = request.json
#     product_name = request_data.get("name", None)

#     if not product_name:
#         return {"message": "Product name is required"}, 400

#     product_info = db.product.find_one({"name": product_name})
    
#     if not product_info:
#         return {"message": "Product not found"}, 404
#     else:
#         return {"message":"Product successfully inserted", "data": product_info}, 201


# @app3.get('/get-products')
# def get_all_products():
#     products_cursor = db.product.find({})
#     products_list = list(products_cursor)
    
#     # Optional: Convert MongoDB's ObjectIDs to strings
#     for product in products_list:
#         product["_id"] = str(product["_id"])

#     return jsonify({"message":"Product successfully inserted", "data": products_list}), 201

if __name__ == '__main__':
    app3.run(debug=True)#, port=8887) # host='0.0.0.0',