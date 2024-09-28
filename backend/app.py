from flask import Flask, render_template
from database.mongoCollections import *
from datetime import date
app = Flask(__name__)
db = get_database

@app.route("/")
def get_index():
    return render_template("ingredients_list.html")
    
@app.route("/ingredients/")
def ingredients():
    res = get_ingredients()
    return render_template("ingredients_list.html", ingredients = res)

@app.route("/ingredients/add", methods=["POST"])
def ingredients_add_handler():
    
    name_input = "banana"
    quantity_input = 1
    
    ingredient = {
        "name": name_input,
        "quantity": quantity_input 
    }
    
    ingredients_add(ingredient)
    
    return app.jsonify(ingredient), 201


@app.route("/ingredients/delete", methods=["POST"])
def ingredients_delete_handler():
    
    id_input = "bananana"
    
    
    ingredients_delete(id_input)
    
    return app.jsonify({id_input}), 201
    
# @app.route("/recipes/", methods=["POST"])
# def ingredients_delete():
    
#     name_input = "banana"
    
#     return app.jsonify({name_input}), 201


