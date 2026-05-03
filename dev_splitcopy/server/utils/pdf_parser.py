import pdfplumber
import io


async def extract_text_from_pdf(upload_file) -> str:
    """Extract text from an uploaded PDF file (FastAPI UploadFile)."""
    try:
        contents = await upload_file.read()
        text = ""

        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        return text.strip()
    except Exception as e:
        raise ValueError(f"Failed to extract text from PDF: {str(e)}")
