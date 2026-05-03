from pydantic import BaseModel
from typing import List, Optional


class ResumeAnalysisResponse(BaseModel):
    match_score: int = 0
    summary: str = ""
    strengths: List[str] = []
    weaknesses: List[str] = []
    suggestions: List[str] = []
    missing_skills: List[str] = []
