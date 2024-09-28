from groq import Groq
import ast

def generate_recipe(ingredients_list):
#get ingredients list from backend
    ingredients_list = [ingredient['name'] for ingredient in ingredients_list]

    ingredients_list = ['spaghetti', 'marinara sauce', 'cheese', 'meatballs']
    ingredients_toString = ", ".join(ingredients_list)

    client = Groq(
        api_key="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"
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Create a recipe that can be made with the following ingredients: {ingredients_toString} and format it as a python dictionary with a format: name (string), instructions (list of each instruction step, ordered by number), ingredients(list of ingredient names)",
            }
        ],
        model="mixtral-8x7b-32768",
    )

    response = chat_completion.choices[0].message.content
    print("original response: ",response)

    #format response into dictionary:
    start = response.index('{')
    end = response.rindex('}')

    recipe_dict_string = response[start: end+1]
    recipe_dict = ast.literal_eval(recipe_dict_string)

    return recipe_dict