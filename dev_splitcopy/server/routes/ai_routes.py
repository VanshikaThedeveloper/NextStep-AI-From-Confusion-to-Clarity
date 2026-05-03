import asyncio
from fastapi import APIRouter, HTTPException
from services.ai_service import generate_ai_content
from models.ai_model import AIRequest

router = APIRouter()


@router.post("/generate")
async def generate_ai(req: AIRequest):
    """Generate AI content for resume builder (summary, skills, experience)."""
    try:
        # Run sync Gemini call in threadpool to avoid blocking the event loop
        result = await asyncio.to_thread(generate_ai_content, req.domain, req.field)
        return {"field": req.field, "content": result}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")