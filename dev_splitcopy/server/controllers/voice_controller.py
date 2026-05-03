from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.voice_service import handle_voice_ai, handle_text_ai


class TextQueryRequest(BaseModel):
    text: str


async def process_voice(audio_file):
    """Controller: process voice audio and return AI guidance.
    Always returns a valid JSON response — never an unhandled 500.
    """
    try:
        result = await handle_voice_ai(audio_file)
        return result
    except RuntimeError as e:
        return JSONResponse(
            status_code=500,
            content={
                "detail": str(e),
                "user_text": "",
                "ai_response": {
                    "title": "Error",
                    "summary": str(e),
                    "key_points": [],
                    "action_items": ["Please try again"],
                    "encouragement": "Don't worry, try again!",
                },
            },
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "detail": f"Voice processing failed: {str(e)}",
                "user_text": "",
                "ai_response": {
                    "title": "Error",
                    "summary": f"An unexpected error occurred: {str(e)}",
                    "key_points": [],
                    "action_items": ["Please try again"],
                    "encouragement": "Don't worry, try again!",
                },
            },
        )


async def process_text(req: TextQueryRequest):
    """Controller: process text query and return AI guidance.
    Always returns a valid JSON response — never an unhandled 500.
    """
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text query cannot be empty")

    try:
        result = await handle_text_ai(req.text.strip())
        return result
    except RuntimeError as e:
        return JSONResponse(
            status_code=500,
            content={
                "detail": str(e),
                "user_text": req.text.strip(),
                "ai_response": {
                    "title": "Error",
                    "summary": str(e),
                    "key_points": [],
                    "action_items": ["Please rephrase and try again"],
                    "encouragement": "Keep going!",
                },
            },
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "detail": f"Text processing failed: {str(e)}",
                "user_text": req.text.strip(),
                "ai_response": {
                    "title": "Error",
                    "summary": f"An unexpected error occurred: {str(e)}",
                    "key_points": [],
                    "action_items": ["Please try again"],
                    "encouragement": "Keep going!",
                },
            },
        )