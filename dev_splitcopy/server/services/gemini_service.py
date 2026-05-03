import google.generativeai as genai
import json
import re
from config.settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash")


def _strip_markdown(text: str) -> str:
    """Remove any residual markdown formatting from AI output."""
    if not isinstance(text, str):
        return text
    # Remove bold/italic markers
    text = re.sub(r'\*{1,3}', '', text)
    # Remove heading markers
    text = re.sub(r'^#{1,6}\s*', '', text, flags=re.MULTILINE)
    # Remove markdown bullet dashes at line start, replace with •
    text = re.sub(r'^\s*[-]\s+', '• ', text, flags=re.MULTILINE)
    # Remove backtick code markers
    text = re.sub(r'`{1,3}', '', text)
    # Remove underscores used for emphasis
    text = re.sub(r'(?<!\w)_{1,2}(.+?)_{1,2}(?!\w)', r'\1', text)
    return text.strip()


def _clean_roadmap_data(data: dict) -> dict:
    """Recursively strip markdown from all string values in roadmap data."""
    if isinstance(data, str):
        return _strip_markdown(data)
    if isinstance(data, list):
        return [_clean_roadmap_data(item) for item in data]
    if isinstance(data, dict):
        return {k: _clean_roadmap_data(v) for k, v in data.items()}
    return data


def generate_roadmap(domain: str) -> dict:
    """Generate a structured learning roadmap for a given domain.
    Returns structured JSON with steps, projects, tools, and tips."""

    prompt = f"""You are a professional career roadmap generator.

Generate a clean, well-structured career roadmap for {domain}.

STRICT RULES:
- Do NOT use markdown symbols like ##, ###, **, --, * or any special formatting characters
- Do NOT use asterisks or special formatting characters anywhere
- Do NOT make it look like ChatGPT-generated text
- Keep formatting clean and UI-friendly
- Every text value must be plain text only

FORMAT REQUIREMENTS:
- Use simple plain text only for all values
- Keep each description short (2-3 lines max)
- Maintain a professional, concise tone
- Write like real product UI content, not AI-generated filler

RESPONSE FORMAT (VERY IMPORTANT — FOLLOW EXACTLY):
{{
  "title": "Career Roadmap for {domain}",
  "introduction": "A short 2-3 line introduction about the {domain} career path. Write it naturally and concisely, explaining what this roadmap covers and who it is for.",
  "steps": [
    {{
      "step": "Step 1: Foundation",
      "description": "A concise 2-3 line explanation of what this stage covers and why it matters. Plain text only.",
      "topics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"]
    }},
    {{
      "step": "Step 2: Core Skills",
      "description": "A concise 2-3 line explanation. Plain text only.",
      "topics": ["Topic 1", "Topic 2", "Topic 3"]
    }},
    {{
      "step": "Step 3: Intermediate",
      "description": "A concise 2-3 line explanation. Plain text only.",
      "topics": ["Topic 1", "Topic 2", "Topic 3"]
    }},
    {{
      "step": "Step 4: Advanced",
      "description": "A concise 2-3 line explanation. Plain text only.",
      "topics": ["Topic 1", "Topic 2"]
    }},
    {{
      "step": "Step 5: Professional",
      "description": "A concise 2-3 line explanation. Plain text only.",
      "topics": ["Topic 1", "Topic 2"]
    }}
  ],
  "projects": [
    "Project idea 1 with a brief one-line description",
    "Project idea 2 with a brief one-line description"
  ],
  "tools": [
    "Tool 1",
    "Tool 2"
  ],
  "tips": [
    "A practical, actionable tip written in plain text",
    "Another concise tip"
  ]
}}

CRITICAL RULES:
- Return ONLY valid JSON, nothing else
- Do NOT include markdown formatting anywhere in any value
- Do NOT use **, ##, ###, *, --, or backticks inside any string
- Do NOT include explanations outside the JSON
- Keep each field concise, structured, and human-readable
- Include 4-6 steps, 4-6 projects, 5-8 tools, and 3-5 tips
- The introduction must be included
- All text must read like polished product copy, not AI filler
"""

    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        json_match = re.search(r'\{[\s\S]*\}', raw_text)
        if json_match:
            result = json.loads(json_match.group())
        else:
            result = json.loads(raw_text)

        # Strip any residual markdown the AI may have included
        result = _clean_roadmap_data(result)

        # Validate required fields
        result.setdefault("title", f"Career Roadmap for {domain}")
        result.setdefault("introduction", f"A comprehensive learning path for {domain}, covering fundamentals through advanced topics to help you build a successful career.")
        result.setdefault("steps", [])
        result.setdefault("projects", [])
        result.setdefault("tools", [])
        result.setdefault("tips", [])

        return result

    except json.JSONDecodeError:
        # Fallback: return raw text wrapped in structure
        raw = response.text.strip() if 'response' in dir() else ""
        return {
            "title": f"Career Roadmap for {domain}",
            "introduction": f"A comprehensive learning path for {domain}.",
            "raw_content": _strip_markdown(raw),
            "steps": [],
            "projects": [],
            "tools": [],
            "tips": [],
        }
    except Exception as e:
        raise RuntimeError(f"Gemini roadmap generation failed: {str(e)}")


def analyze_resume_with_gemini(
    job_title: str,
    job_description: str,
    resume_text: str,
) -> dict:
    """Analyze a resume against a job description using Gemini AI.
    Returns structured JSON with match_score, summary, strengths, etc."""

    prompt = f"""You are an expert ATS resume reviewer and career coach.

Analyze the following resume against the target job.

**Job Title:** {job_title}
**Job Description:** {job_description}

**Resume:**
{resume_text}

You MUST respond with ONLY valid JSON in this exact format (no markdown, no extra text):
{{
  "match_score": <integer 0-100>,
  "summary": "<brief 2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "missing_skills": ["<skill 1>", "<skill 2>", "<skill 3>"]
}}

Rules:
- match_score must be an integer between 0 and 100
- Each array should have 3-5 items
- Keep each item concise (1-2 sentences max)
- Be specific and actionable
"""

    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        json_match = re.search(r'\{[\s\S]*\}', raw_text)
        if json_match:
            result = json.loads(json_match.group())
        else:
            result = json.loads(raw_text)

        required_fields = ["match_score", "summary", "strengths", "weaknesses", "suggestions", "missing_skills"]
        for field in required_fields:
            if field not in result:
                if field == "match_score":
                    result[field] = 0
                elif field == "summary":
                    result[field] = "Analysis could not be completed."
                else:
                    result[field] = []

        result["match_score"] = int(result.get("match_score", 0))

        return result

    except json.JSONDecodeError:
        return {
            "match_score": 0,
            "summary": "The AI response could not be parsed. Please try again.",
            "strengths": [],
            "weaknesses": [],
            "suggestions": ["Try uploading the resume again"],
            "missing_skills": [],
        }
    except Exception as e:
        return {
            "match_score": 0,
            "summary": f"Analysis failed: {str(e)}",
            "strengths": [],
            "weaknesses": [],
            "suggestions": ["Please try again later"],
            "missing_skills": [],
        }