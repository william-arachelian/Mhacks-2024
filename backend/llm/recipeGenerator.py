from groq import Groq
import ast
from langchain_groq import ChatGroq

def generate_recipe_groq():
#get ingredients list from backend
    ingredients_list = [ingredient['name'] for ingredient in ingredients_list]
    # ingredients_list = [
    #     'Flour',
    #     'Sugar',
    #     'Eggs',
    #     'Milk',
    #     'Baking Powder',
    #     'Salt',
    #     'Butter',
    #     'Vanilla Extract',
    #     'Olive Oil',
    #     'Garlic',
    #     'Onion',
    #     'Tomato',
    #     'Chicken Breast',
    #     'Ground Beef',
    #     'Rice',
    #     'Pasta',
    #     'Cheese',
    #     'Spinach',
    #     'Lettuce',
    #     'Carrots',
    #     'Bell Peppers',
    #     'Potatoes',
    #     'Broccoli',
    #     'Zucchini',
    #     'Mushrooms'
    # ]    
    ingredients_toString = ", ".join(ingredients_list)

    client = Groq(
        api_key="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"
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Create 10 recipes that can be made with the following ingredients (you dont have to use the whole list): {ingredients_toString}. The recipe must be returned as a python dictionary with the following format: recipe_(number) = {{name: (string name of recipe), instructions: (list of each instruction step in order), ingredients: (list of ingredient names)}}",
            }
        ],
        model="mixtral-8x7b-32768",
    )
    response = chat_completion.choices[0].message.content
    #print("original response: ",response)

    #format response into dictionary:

    recipes = []
    lower_bound = 0

    while response[lower_bound:].find('{') != -1: 
    
        parseString = response[lower_bound:]
        start = parseString.find('{') + lower_bound
        end =  parseString.find('}') + lower_bound

        recipe_dict_string = response[start: end+1]
        recipe_dict = ast.literal_eval(recipe_dict_string)

        recipes.append(recipe_dict)
        #print("parsed string index:", (start, end))
        lower_bound = end + 5

    return recipes

def generate_recipes_langGroq(ingredients_list=[]):
    ingredients_list = [ingredient['name'] for ingredient in ingredients_list]

    ingredients_toString = ", ".join(ingredients_list)

    llm = ChatGroq(
        api_key="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",
        model="mixtral-8x7b-32768",
        temperature=0.2,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )

    messages = [
        ("system", f"You are a chef. Make 5 recipes {' with the ingredients that the user lists out' if len(ingredients_list) != 0 else ' with affordable ingredients'}. The recipes must be in the form of a python dictionary with three attributes, name, instructions, and ingredients: recipe = {{name: (title of recipe), instructions: (array of steps in order), ingredients: (list of ingredients for the recipe)}} "),
        ("human", ingredients_toString),
    ]
    llm.invoke(messages)

    stream = llm.stream(messages)
    full = next(stream)
    for chunk in stream:
        full += chunk
    
    response = full.content

    recipes = []
    lower_bound = 0

    while response[lower_bound:].find('{') != -1: 
    
        parseString = response[lower_bound:]
        start = parseString.find('{') + lower_bound
        end =  parseString.find('}') + lower_bound

        recipe_dict_string = response[start: end+1]
        recipe_dict = ast.literal_eval(recipe_dict_string)

        recipes.append(recipe_dict)
        lower_bound = end + 5

    return recipes

# recipes = generate_recipes_langGroq()

# for r in recipes:
#     print("title: ", r["name"], "\nIngredients: ",r["ingredients"], "\nInstructions: ", r["instructions"], "\n")