from pymongo import MongoClient
def get_database():
    # connects to mhacks2024 db
    CONNECTION_STRING = "mongodb://localhost:27017"
    client = MongoClient(CONNECTION_STRING)
 
    return client['mhacks2024']

if __name__ == '__main__':
    get_database()