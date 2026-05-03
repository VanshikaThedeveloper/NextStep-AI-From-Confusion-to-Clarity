from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import MONGO_URL

client = AsyncIOMotorClient(MONGO_URL)
db = client["dev_split"]

user_collection = db["users"]
roadmap_collection = db["roadmaps"]