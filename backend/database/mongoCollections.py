from database.helpers import is_valid_ingredient, is_valid_id, is_valid_recipe
from datetime import datetime
from database.mongoConnection import get_database
from bson.objectid import ObjectId

# Schemas:

# ingredients {
#     name: str
#     date: date
#     quantity(?): float
# }

# recipes {
#     name: str
#     ingredients[]: arr[Obj]
#     description: str
#     rating(?): int
# }

def get_ingredients():
    # returns a list of all ingredient objects in ingredients collection
    try:
        db = get_database()
        ingredientsCollection = db['ingredients']

        res = ingredientsCollection.find()
        
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

        if res:
            return res
        else:
            raise ValueError(f"ingredient with id {id} not found")
    except Exception as e:
        print(e)
        return {"error": e}

def add_ingredient(input:dict):
    # adds a new ingredient object with parameters in input dictionary
    # input{name, Date=currentDate, quantity=None}
    # returns success or failure

    try:
        if not is_valid_ingredient(input):
            raise ValueError("invalid ingredient input")
        
        ingredientObj = {
            "name": input['name'],
            "date": datetime.now(),
            "quantity": input['quantity'] if input.get('quantity') != None else 1
        }

        db = get_database()
        ingredientsCollection = db['ingredients']

        res = ingredientsCollection.insert_one(ingredientObj)

        return res
        
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
            print("ingredient successfully deleted")
        else:
            print("deletion failed")


    except Exception as e:
        print(e)
        return {"error": e}

def get_recipes():
    # returns a list of all recipe objects in recipes collection
    try:
        db = get_database()
        recipesCollection = db['recipes']

        res = recipesCollection.find()
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
            "description": input['description'],
            "rating": input['rating'] if input.get('rating') != None else -1,
            "ingredients": input['ingredients']
        }

        db = get_database()
        recipesCollection = db['recipes']

        res = recipesCollection.insert_one(recipeObj)

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
        recipesCollection = db['recipe']

        filter={"_id": ObjectId(id)}
        res = recipesCollection.delete_one(filter)

        if (res.deleted_count > 0):
            print("recipe successfully deleted")
        else:
            print("deletion failed")

    except Exception as e:
        print(e)
        return {"error": e}
