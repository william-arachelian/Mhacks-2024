from database.helpers import is_valid_ingredient, is_valid_id, is_valid_recipe
from datetime import datetime
from database.mongoConnection import get_database
from bson.objectid import ObjectId
from bson.json_util import dumps, loads 
import re
# Schemas:

# ingredients {
#     name: str
#     quantity(?): float
#     unit(?): {set of units to choose from}
#     expirationDate: datetime object
# }

# recipes {
#     name: str
#     ingredients[]: arr[Obj]
#     instructions[]: arr[str]
#     description: str
#     estimatedCookTime: str
#     rating(?): int
# }

def get_ingredients():
    # returns a list of all ingredient objects in ingredients collection
    try:
        db = get_database()
        ingredientsCollection = db['ingredients']

        res = list(ingredientsCollection.find())
        res = list(map(lambda obj : {**obj, "_id": str(obj["_id"])}, res))
    
        return res
    
    except Exception as e:
        print(e)
        return {"error": e}

def get_ingredient(id: str):
    # returns ingredient object with an _id of id

    try:
        if not is_valid_id(id):
            raise ValueError('invalid id string')
        
        db = get_database()
        ingredientsCollection = db['ingredients']

        filter = {"_id": ObjectId(id)}
        res = ingredientsCollection.find_one(filter)
        
        res = {**res, "_id": str(res["_id"])}
        if res:
            return res
        else:
            raise ValueError(f"ingredient with id {id} not found")
    except Exception as e:
        print(e)
        return {"error": e}

def search_ingredient_by_name(name: str):
    try:
        db = get_database()
        ingredeintsCollection = db['ingredients']

        filter = {"name": re.compile(f"^{re.escape(name)}.*", re.IGNORECASE)}
        res = list(ingredeintsCollection.find(filter))

        res = list(map(lambda obj : {**obj, "_id": str(obj["_id"])}, res))
        return res
    
    except Exception as e:
        print(e)
        return {"error": e}

def add_ingredient(input:dict):
    # adds a new ingredient object with parameters in input dictionary
    # input{name, Date=currentDate, quantity=None}
    # returns success or failure
    try:
        print(input)
        if not is_valid_ingredient(input):
            raise ValueError("invalid ingredient input")
        
       
        ingredientObj = {
            "name": input.get('name'),
            "expirationDate": input.get("expirationDate"),
            "quantity": input.get('quantity'),
            "unit": input.get('unit')
        }

        db = get_database()
        ingredientsCollection = db['ingredients']

        res = ingredientsCollection.insert_one(ingredientObj)
        if res:
            ingredientObj["_id"] = str(res.inserted_id)
            return ingredientObj
        else:
            raise ValueError("Insertion Failed")
        
        
    except Exception as e:
        print(e)
        return {"error": e}

def delete_ingredient(id: str):
    # deletes ingredient object with _id of id
    # returns success or failure

    try:
        if not is_valid_id(id):
            raise ValueError('invalid id string')
        
        db = get_database()
        ingredientsCollection = db['ingredients']

        filter={"_id": ObjectId(id)}
        res = ingredientsCollection.delete_one(filter)

        if (res.deleted_count > 0):
            return {"deleted": filter}
        else:
            raise ValueError("Delete failed")


    except Exception as e:
        print(e)
        return {"error": e}

def get_recipes():
    # returns a list of all recipe objects in recipes collection
    try:
        db = get_database()
        recipesCollection = db['recipes']

        res = list(recipesCollection.find())
        res = list(map(lambda obj : {**obj, "_id":str(obj["_id"])}, res))

        return res
    
    except Exception as e:
        print(e)
        return {"error": e}

def get_recipe(id: str):
    # returns recipe object with an _id of id

    try:
        if not is_valid_id(id):
            raise ValueError('invalid id string')
        
        db = get_database()
        ingredientsCollection = db['recipes']

        filter = {"_id": ObjectId(id)}
        res = ingredientsCollection.find_one(filter)
        
        if res:
            res = {**res, "_id": str(res["_id"])}
            return res
        else:
            raise ValueError(f"recipe with id {id} not found")
    except Exception as e:
        print(e) 
        return {"error": e}

def add_recipe(input: dict):
    # adds a new recipe object with parameters in input dictionary
    # input{name, description, rating=none, ingredients[]}
    # returns success or failure
    try:
        if not is_valid_recipe(input):
            raise ValueError("invalid recipe input")
        
        recipeObj = {
            "name": input['name'],
            "instructions": input['instructions'],
            "rating": input['rating'] if input.get('rating') != None else -1,
            "ingredients": input['ingredients'],
            "description": input['description'],
            "cookTime": input["cookTime"]
        }

        db = get_database()
        recipesCollection = db['recipes']

        res = recipesCollection.insert_one(recipeObj)

        if res.inserted_id:
            insertedRecipeObj = recipesCollection.find_one({"_id": res.inserted_id})
            insertedRecipeObj["_id"] = str(insertedRecipeObj["_id"] )
            print(insertedRecipeObj)

            return insertedRecipeObj
        else:
            raise ValueError("Insertion Failed")
       
        
    except Exception as e:
        print(e)
        return {"error": e}

def search_recipe_by_name(name: str):
    try:
        
        db = get_database()
        recipesCollection = db['recipes']
        filter = {"name": re.compile(f"^{re.escape(name)}.*", re.IGNORECASE)}
        res = list(recipesCollection.find(filter))
        res = list(map(lambda obj : {**obj, "_id": str(obj["_id"])}, res))
        return res

    except Exception as e:
        print(e)
        return {"error": e}

def delete_recipe(id: str):
    # deletes recipe object with _id of id
    # returns success or failure

    try:
        if not is_valid_id(id):
            raise ValueError('invalid id string')
        
        db = get_database()
        recipesCollection = db['recipes']

        filter={"_id": ObjectId(id)}
        res = recipesCollection.delete_one(filter)

        if (res.deleted_count > 0):
            return {"deleted": filter} 
        else:
            raise ValueError("recipe deletion failed")

    except Exception as e:
        print(e)
        return {"error": e}
