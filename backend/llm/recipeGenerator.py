from groq import Groq
import ast
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain.chains import LLMChain
from database.mongoCollections import get_ingredients
import re

def generate_recipes_langGroq():
    
    ingredients_list = get_ingredients()
    ingredients_list = [ingredient['name'] for ingredient in ingredients_list]

    llm = ChatGroq(
        api_key="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",
        model="mixtral-8x7b-32768",
        temperature=0.2,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )

    response_schemas = [
        ResponseSchema(name="name", description="The name of the recipe."),
        ResponseSchema(name="ingredients", description="Array List of ingredients with measurements to make recipe."),
        ResponseSchema(name="instructions", description="Array List of step-by-step instructions for making recipe."),
        ResponseSchema(name="description", description="100 word description of recipe."),
        ResponseSchema(name="cookTime", description="Estimated cook time for recipe."),
    ]

    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

    format_instructions = output_parser.get_format_instructions()
    prompt = PromptTemplate(
        template="Generate a JSON object:\n{format_instructions}\nInput: {input}",
        input_variables=["input"],
        partial_variables={"format_instructions": format_instructions},
    )

    input_data = f"Create 5 recipes based off of these ingredients: {ingredients_list}"
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    response = llm_chain.run(input=input_data)
    print(response)

    pattern = r"```json\n(.*?)\n```"
    matches = re.findall(pattern, response, re.DOTALL)
    recipes = [output_parser.parse(match) for match in matches]
    
    return recipes

    # messages = [
    #     ("system", f"You are a chef. Make 5 recipes {' with the ingredients that the user lists out. If you recognize a type in the ingredients list, you can correct it.' if len(ingredients_list) != 0 else ' with affordable ingredients'}. The recipes must be in the form of a python dictionary with 5 attributes, name, instructions, ingredients, description, cookTime: recipe = {{name: string, instructions: array[], ingredients: array[], description: string, cookTime: string}}"),
    #     ("human", ingredients_toString),
    # ]
    # llm.invoke(messages)

    # stream = llm.stream(messages)
    # full = next(stream)
    # for chunk in stream:
    #     full += chunk
    
    # response = full.content

    # recipes = []
    # lower_bound = 0

    # while response[lower_bound:].find('{') != -1: 
    
    #     parseString = response[lower_bound:]
    #     start = parseString.find('{') + lower_bound
    #     end =  parseString.find('}') + lower_bound

    #     recipe_dict_string = response[start: end+1].replace('\"', '"')
    #     recipe_dict = json.loads(recipe_dict_string)
    #     #recipe_dict = ast.literal_eval(recipe_dict_string)

    #     recipes.append(recipe_dict)
    #     lower_bound = end + 5

    # return recipes

    #return {'recipes' : response}
# recipes = generate_recipes_langGroq()

# for r in recipes:
#     print("title: ", r["name"], "\nIngredients: ",r["ingredients"], "\nInstructions: ", r["instructions"], "\n")