import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "hrms_lite")

class MongoDB:
    _client = None
    _db = None

    @classmethod
    def get_db(cls):
        if cls._client is None:
            try:
                cls._client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
                # Trigger a call to verify connection
                cls._client.admin.command('ping')
                cls._db = cls._client[DB_NAME]
                print(f"\n✅ MongoDB Connected Successfully to: {DB_NAME}")
            except Exception as e:
                print(f"\n❌ MongoDB Connection Failed: {e}")
                raise e
        return cls._db

db = MongoDB.get_db()
