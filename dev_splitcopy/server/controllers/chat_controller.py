from services.chat_service import save_user, generate_reply

def save_user_controller(data):
    save_user(data)
    return {"message": "User saved"}

def chat_controller(data):
    reply = generate_reply(data.user_id, data.message)
    return {"reply": reply}