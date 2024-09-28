from pymongo import MongoClient

def get_database():
 
    CONNECTION_STRING = "mongodb://localhost:27017"
    client = MongoClient(CONNECTION_STRING)
 
    return client['mhacks2024']

def get_ingredients():
    db = get_database()

    ingredientsCollection = db['ingredients']
    res = ingredientsCollection.find()
    
    return res

res = get_ingredients()
for item in res:
    print(item['name'])