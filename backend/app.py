from flask import Flask, render_template, jsonify
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
    
    # name_input = "banana"
    quantity_input = 100
    
    ingredient = {
        # "name": name_input,
        "quantity": quantity_input
    }
    
    context = add_ingredient(ingredient)
    
    return jsonify({"message": "Success", "status_code": 201}), 201


@app.route("/ingredients/delete", methods=["POST"])
def ingredients_delete_handler():
    
    id_input = "66f85beaf41a839da5b15945"
    
    
    delete_ingredient(id_input)
    
    return jsonify({"message": "Success", "status_code": 201}), 201
    
    
@app.route("/recipes/")
def recipes():
    res = get_recipes()
    return render_template("recipes_list.html", recipes = res)


@app.route("/recipes/add", methods=["POST"])
def recipes_add_handler():
    
    # name_input = "banana"
    quantity_input = 100
    
    ingredient = {
        # "name": name_input,
        "quantity": quantity_input
    }
    
    context = add_ingredient(ingredient)
    
    return jsonify({"message": "Success", "status_code": 201}), 201


@app.route("/recipes/delete", methods=["POST"])
def recipes_delete_handler():
    
    id_input = "66f85beaf41a839da5b15945"
    
    
    delete_ingredient(id_input)
    
    return jsonify({"message": "Success", "status_code": 201}), 201
    
