import json
import re
import asyncio
import google.generativeai as genai
from config.settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

VOICE_SYSTEM_PROMPT = """You are an expert AI career coach and mentor. 
The user is asking you a career-related question via voice.

You MUST respond with ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "title": "<short 3-6 word title summarizing the topic>",
  "summary": "<2-3 sentence concise answer>",
  "key_points": ["<point 1>", "<point 2>", "<point 3>"],
  "action_items": ["<actionable step 1>", "<actionable step 2>", "<actionable step 3>"],
  "encouragement": "<1 sentence motivational closing>"
}

Rules:
- Keep each point concise (1-2 sentences max)
- Be specific and actionable
- key_points should have 3-5 items
- action_items should have 2-4 items
- If the question is not career-related, still answer helpfully but frame advice around personal growth
"""


def _parse_ai_response(raw_text: str) -> dict:
    """Parse and validate structured JSON from AI response."""
    text = raw_text.strip()

    json_match = re.search(r'(\{[\s\S]*\})', text)
    if json_match:
        try:
            result = json.loads(json_match.group(1))
        except json.JSONDecodeError:
            # Try to fix some common JSON issues if possible, or fallback
            result = {"summary": text}
    else:
        try:
            result = json.loads(text)
        except json.JSONDecodeError:
            result = {"summary": text}

    # Validate and provide defaults for required fields
    result.setdefault("title", "AI Guidance")
    result.setdefault("summary", text[:200] if not json_match else "")
    result.setdefault("key_points", [])
    result.setdefault("action_items", [])
    result.setdefault("encouragement", "Keep pushing forward!")

    return result


def _fallback_response(raw_text: str = "") -> dict:
    """Build a safe fallback response dict."""
    return {
        "title": "AI Response",
        "summary": raw_text[:500] if raw_text else "I received your message but couldn't generate a structured response.",
        "key_points": [],
        "action_items": [],
        "encouragement": "Keep going!",
    }


async def handle_voice_ai(audio_file) -> dict:
    """Process voice input: speech-to-text → AI response → structured JSON."""
    try:
        user_text = await speech_to_text(audio_file)

        # Run synchronous Gemini call in a thread pool to avoid blocking
        response = await asyncio.to_thread(
            model.generate_content,
            f"{VOICE_SYSTEM_PROMPT}\n\nUser said: {user_text}",
        )

        try:
            ai_data = _parse_ai_response(response.text)
        except (json.JSONDecodeError, Exception):
            ai_data = _fallback_response(
                response.text.strip() if hasattr(response, "text") else ""
            )

        return {
            "user_text": user_text,
            "ai_response": ai_data,
        }

    except RuntimeError as e:
        raise e
    except Exception as e:
        raise RuntimeError(f"Voice AI processing failed: {str(e)}")


async def handle_text_ai(user_text: str) -> dict:
    """Process text input → AI response → structured JSON."""
    try:
        # Run synchronous Gemini call in a thread pool to avoid blocking
        response = await asyncio.to_thread(
            model.generate_content,
            f"{VOICE_SYSTEM_PROMPT}\n\nUser said: {user_text}",
        )

        try:
            ai_data = _parse_ai_response(response.text)
        except (json.JSONDecodeError, Exception):
            ai_data = _fallback_response(
                response.text.strip() if hasattr(response, "text") else ""
            )

        return {
            "user_text": user_text,
            "ai_response": ai_data,
        }

    except Exception as e:
        raise RuntimeError(f"Text AI processing failed: {str(e)}")


# Import speech_to_text at the bottom to avoid circular imports
from utils.speech_utils import speech_to_text