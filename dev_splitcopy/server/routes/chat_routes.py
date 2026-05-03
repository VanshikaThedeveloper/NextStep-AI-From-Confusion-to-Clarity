from fastapi import APIRouter
from models.chat_model import UserData, ChatRequest
from controllers.chat_controller import save_user_controller, chat_controller

router = APIRouter()

@router.post("/user")
def save_user(data: UserData):
    return save_user_controller(data)

@router.post("/message")
def chat(data: ChatRequest):
    return chat_controller(data)