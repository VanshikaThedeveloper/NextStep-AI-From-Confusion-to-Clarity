import asyncio
from fastapi import APIRouter, HTTPException
from models.roadmap_model import RoadmapRequest
from services.gemini_service import generate_roadmap
from database.db import roadmap_collection

router = APIRouter()


@router.post("/roadmap")
async def create_roadmap(req: RoadmapRequest):
    """Generate a learning roadmap for a given domain using Gemini AI."""
    if not req.domain or not req.domain.strip():
        raise HTTPException(status_code=400, detail="Domain is required")

    try:
        # Run sync Gemini call in threadpool to avoid blocking the event loop
        content = await asyncio.to_thread(generate_roadmap, req.domain)

        data = {
            "domain": req.domain,
            "title": content.get("title", f"{req.domain} Roadmap"),
            "content": content,
        }

        result = await roadmap_collection.insert_one(data)
        data["_id"] = str(result.inserted_id)

        return data

    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Roadmap generation failed: {str(e)}")