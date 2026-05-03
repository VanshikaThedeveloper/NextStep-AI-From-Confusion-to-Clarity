from fastapi import APIRouter, UploadFile, File
from controllers.voice_controller import process_voice, process_text, TextQueryRequest

router = APIRouter()


@router.post("/talk")
async def talk(audio: UploadFile = File(...)):
    """Process voice audio and return structured AI career guidance."""
    return await process_voice(audio)


@router.post("/ask")
async def ask(req: TextQueryRequest):
    """Process text query and return structured AI career guidance."""
    return await process_text(req)