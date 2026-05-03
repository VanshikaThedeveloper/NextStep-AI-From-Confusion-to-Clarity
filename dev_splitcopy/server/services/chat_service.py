import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

user_profiles = {}
conversation_history = {}

def build_prompt(domain, level):
    if level == "Beginner":
        tone = "Explain simply"
    elif level == "Intermediate":
        tone = "Explain with examples"
    else:
        tone = "Explain in technical depth"

    return f"You are an AI tutor for {domain}. {tone}"

def save_user(data):
    user_profiles[data.user_id] = {
        "domain": data.domain,
        "level": data.level
    }
    conversation_history[data.user_id] = []

def generate_reply(user_id, message):
    profile = user_profiles.get(user_id)

    if not profile:
        return "User not initialized"

    prompt = build_prompt(profile["domain"], profile["level"])

    chat = model.start_chat(history=[])

    response = chat.send_message(f"{prompt}\nUser: {message}")

    return response.text