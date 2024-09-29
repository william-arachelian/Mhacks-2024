from database.mongoCollections import * 
from database.mongoCollections import get_database
from random import randint

db = get_database()
ingredientsCollection = db['ingredients']

ingredient_names = [
    'Flour',
    'Sugar',
    'Eggs',
    'Milk',
    'Baking Powder',
    'Salt',
    'Butter',
    'Vanilla Extract',
    'Olive Oil',
    'Garlic',
    'Onion',
    'Tomato',
    'Chicken Breast',
    'Ground Beef',
    'Rice',
    'Pasta',
    'Cheese',
    'Spinach',
    'Lettuce',
    'Carrots',
    'Bell Peppers',
    'Potatoes',
    'Broccoli',
    'Zucchini',
    'Mushrooms'
]

for i in range(0, len(ingredient_names)):
    try:
        ingredientObj = {
            "name": ingredient_names[i]
        }
        
        res = add_ingredient(ingredientObj)
        print(res)
    except Exception as e:
        print(e)


for i in range(1, 26):
    try:
        name = f"test {i}"
        instructions = [f"instruction {i}" for i in range(0, randint(5, 20))]
        ingredients = [ingredient_name  for ingredient_name in [ingredient_names[j] for j in [randint(0, len(ingredient_names)-1) for _ in range(1, randint(2, 10))]]]
        
        recipeObj = {
            "name": name,
            "instructions": instructions,
            "ingredients": ingredients
        }

        res = add_recipe(recipeObj)
        print(res)

    except Exception as e:
        print(e)

get_ingredients()