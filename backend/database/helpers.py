from bson.objectid import ObjectId

def is_valid_ingredient(input):
        print(input)
        if input.get('name') == None:
            print('name attribute does not exist')
            return False
        
        if type(input['name']) is not str:
            print('name attribute must be of type string')
            return False
        
        if (input.get('quantity') != None and type(input['quantity']) is not int):
            print('quantity attribute must be of type int')    
            return False
        
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
    
        

