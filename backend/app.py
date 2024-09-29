from flask import Flask, render_template, jsonify, request
from database.mongoCollections import *
from llm.recipeGenerator import generate_recipes_langGroq


from datetime import date
app = Flask(__name__)
db = get_database
    
@app.route("/ingredients")
def ingredients():
    res = get_ingredients()
    return {"ingredients": res}

@app.route("/ingredients/findone/<string:ingredient_id>")
def ingredients_findone_handler(ingredient_id):
    res = get_ingredient(ingredient_id)
    return res


@app.route("/ingredients/add", methods=["POST"])
def ingredients_add_handler():
    
    ingredient = {
        "name": request.form['name'],
        "quantity": request.form['quantity'] if request.form.get('quantiy') else None
    }
    
    context = add_ingredient(ingredient)

    print(context)
    if "error" in context:
        return jsonify({"message": "Failure", "status_code": 404}) 
        
    return jsonify({"message": "Success", "status_code": 201}), 201


@app.route("/ingredients/delete/<string:ingredient_id>", methods=["DELETE"])
def ingredients_delete_handler(ingredient_id):
    
    context = delete_ingredient(ingredient_id)

    if "error" in context:
        return jsonify({"message": "Failure", "status_code": 404}) 
    return jsonify({"message": "Success", "status_code": 201}), 201
    
    
@app.route("/recipes/")
def recipes():
    res = get_recipes()
    return {"recipes": res}

@app.route("/recipes/findone/<string:recipe_id>")
def recipes_findone_handler(recipe_id):
    res = get_recipe(recipe_id)
    return res

@app.route("/recipes/add", methods=["POST"])
def recipes_add_handler():
    data = request.get_json()

    recipe = {
        "name": data['name'],
        "ingredients" : data["ingredients"],
        "instructions": data["instructions"],
        "ratings": data["ratings"] if data.get("ratings") != None else None
    }
    
    context = add_recipe(recipe)
    
    if "error" in context:
        return jsonify({"message": "Failure", "status_code": 404}) 
    
    return jsonify({"message": "Success", "status_code": 201}), 201


@app.route("/recipes/delete/<string:recipe_id>", methods=["DELETE"])
def recipes_delete_handler(recipe_id):
    
    context = delete_recipe(recipe_id)
    
    if "error" in context:
        return jsonify({"message": "Failure", "status_code": 404}) 
    
    return jsonify({"message": "Success", "status_code": 201}), 201
    

@app.route("/recipes/generate")
def recipes_generate_handler():

    res = generate_recipes_langGroq()

    return {"recipes": res}
