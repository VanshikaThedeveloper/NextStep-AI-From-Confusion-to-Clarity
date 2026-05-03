from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from controllers.resume_controller import analyze_resume_controller

router = APIRouter()


@router.post("/analyze")
async def analyze_resume(
    job_title: str = Form(...),
    job_description: str = Form(...),
    resume: UploadFile = File(...),
):
    """Analyze a resume PDF against a job description using AI."""
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Upload PDF only")

    return await analyze_resume_controller(
        file=resume,
        job_title=job_title,
        job_description=job_description,
    )