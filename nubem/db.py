from pymongo import MongoClient

class Connection:
    def __new__(cls, database):
        connection=MongoClient("mongodb+srv://admin:asdf1234@clusterforflask.veflymh.mongodb.net/")
        return connection[database]