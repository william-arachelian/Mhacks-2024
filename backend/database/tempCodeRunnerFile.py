ingredientsCollection = db['ingredients']

    res =  ingredientsCollection.find()
    for items in res:
        print(items)