from mongoCollections import * 
from mongoCollections import get_database

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
        # print(res)
    except Exception as e:
        print(e)

get_ingredients()