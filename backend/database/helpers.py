from bson.objectid import ObjectId
from datetime import datetime
def is_valid_ingredient(input):
        
        if input.get('name') == None:
            print('name attribute does not exist')
            return False
        
        if type(input['name']) is not str:
            print('name attribute must be of type string')
            return False
        
        if (input.get('quantity') != None and type(input['quantity']) is not int):
            print('quantity attribute must be of type int')    
            return False
        
        #later need to check if its in valid list of units
        if (input.get('unit') != None and type(input['unit']) is not str):
            print('unit attribute must be of type string')
            return False

        if (input.get('exiprationDate') != None):
            if type(input['expirationdate']) is not str:
                print("expirationDate string must be of type")
                return False
            
            try:
                datetime.strptime(input['expirationDate'], "%Y-%m-%d %H:%M:%S")
                
            except Exception as e:
                print("exiprationDate string is not a valid date")
                return False

        for key in input.keys():
            if not ("name" == key or "expirationDate" == key or "quantity" == key or "unit" == key or "_id" == key):
                print("schema not correct")
                return False
        
        return True

def is_valid_recipe(input):
    
    if input.get('name') == None:
        print('name attribute does not exist')
        return False
    
    if type(input['name']) is not str:
        print('name attribute must be of type string')
        return False
    
    if input.get('instructions') == None:
        print('instructions attribute does not exist')
        return False
    
    for i in range(0, len(input['instructions'])):
        instruction = input['instructions'][i]
        if type(instruction) is not str:
            print(f'instruction in instructions attribute is invalid')
            return False
    
    if input.get('ingredients') == None:
        print('ingredients attribute does not exist')
        return False
    
    for key in input.keys():
            if not ("ingredients" == key or "instructions" == key or "ratings" == key  or "name" == key or "_id" == key or "description" == key or "cookTime" == key):
                print("schema not correct")
                return False
    
    
    # for i in range(0, len(input['ingredients'])):
    #     ingredient = input['ingredients'][i]
    #     if not is_valid_ingredient(ingredient):
    #         print(f'ingredient in ingredients attribute is invalid')

    #         return False
    
    return True

def is_valid_id(id):
     

    if type(id) is not str:
        return False
     
    try:
        obj_id = ObjectId(id)
        return True
    
    except Exception as e:
        print(e)
        return False
    
        

