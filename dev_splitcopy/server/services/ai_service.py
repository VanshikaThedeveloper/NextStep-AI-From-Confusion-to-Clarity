import google.generativeai as genai
from utils.prompt_builder import build_prompt
from config.settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def clean_summary(text: str) -> str:
    """Clean AI-generated summary to 3 concise lines."""
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    return " ".join(lines[:3])


def generate_ai_content(domain: str, field: str):
    """Generate AI content for resume builder fields."""
    prompt = build_prompt(domain, field)

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        if field == "summary":
            return clean_summary(text)

        if field == "skills":
            return [
                s.replace("-", "").replace("•", "").replace("*", "").strip()
                for s in text.split("\n")
                if s.strip() and not s.strip().startswith("#")
            ][:8]

        if field == "experience":
            lines = [line.strip() for line in text.split("\n") if line.strip()]
            return " ".join(lines[:3])

        return text

    except Exception as e:
        raise RuntimeError(f"AI content generation failed: {str(e)}")