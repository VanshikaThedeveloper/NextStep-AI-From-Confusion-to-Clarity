from pydantic import BaseModel

class UserData(BaseModel):
    user_id: str
    domain: str
    level: str

class ChatRequest(BaseModel):
    user_id: str
    message: str