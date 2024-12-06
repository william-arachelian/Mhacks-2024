from flask import Flask, render_template, jsonify, request
from database.mongoCollections import *
from llm.recipeGenerator import generate_recipes_langGroq


from datetime import date
app = Flask(__name__)
db = get_database
    
@app.route("/ingredients/")
def ingredients():
    res = get_ingredients()
    return {"ingredients": res}

@app.route("/ingredients/findone/<string:ingredient_id>")
def ingredients_findone_handler(ingredient_id):
    res = get_ingredient(ingredient_id)
    return res

@app.route("/ingredients/searchByName/<string:ingredient_name>")
def ingredients_searchByName_handler(ingredient_name):
    res = search_ingredient_by_name(ingredient_name)
    return {"ingredients" : res}

@app.route("/ingredients/add", methods=["POST"])
def ingredients_add_handler():
    data = request.get_json()
    print(data)
    
    context = add_ingredient(data)

    print(context)
    if "error" in context:
        return jsonify({"message": "Failure", "status_code": 404}) 
        
    return jsonify({"message": "Success", "status_code": 201, "output": context}), 201


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
        "ratings": data["ratings"] if data.get("ratings") != None else None,
        "description": data['description'],
        "cookTime": data['cookTime']

    }
    
    context = add_recipe(recipe)

    if "error" in context:
        return jsonify({"message": "Failure", "status_code": 404}) 
    
    return jsonify({"message": "Success", "status_code": 201, "output": context}), 201

@app.route("/recipes/findOneByName/<string:recipe_name>")
def recipes_findOneByName_handler(recipe_name):
    print(recipe_name)
    res = find_one_recipe_by_name(str(recipe_name))
    return {"recipe" : res}

@app.route("/recipes/searchByName/<string:recipe_name>")
def recipes_searchByName_handler(recipe_name):
    print(recipe_name)
    res = search_recipe_by_name(str(recipe_name))
    return {"recipes" : res}

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
