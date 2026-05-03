from fastapi import HTTPException, status
from services.gemini_service import analyze_resume_with_gemini
from utils.pdf_parser import extract_text_from_pdf
from models.response_model import ResumeAnalysisResponse


async def analyze_resume_controller(file, job_title, job_description):
    """Extract text from PDF and analyze with Gemini AI."""
    try:
        pdf_text = await extract_text_from_pdf(file)

        if not pdf_text or len(pdf_text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Could not extract sufficient text from the PDF. Please upload a text-based PDF.",
            )

        result = analyze_resume_with_gemini(
            job_title=job_title,
            job_description=job_description,
            resume_text=pdf_text,
        )

        return ResumeAnalysisResponse(**result)

    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Resume analysis failed: {str(e)}",
        )