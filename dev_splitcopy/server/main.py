from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.ai_routes import router as ai_router
from routes.resume_routes import router as resume_router
from routes.roadmap import router as roadmap_router
from routes.voice_routes import router as voice_router
from dotenv import load_dotenv
from routes.chat_routes import router as chat_router

load_dotenv()

app = FastAPI(
    title="Dev_Split API",
    description="AI-powered career studio backend",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(ai_router, prefix="/ai", tags=["AI"])
app.include_router(resume_router, prefix="/resume", tags=["Resume"])
app.include_router(roadmap_router, tags=["Roadmap"])
app.include_router(voice_router, prefix="/voice", tags=["Voice"])
app.include_router(chat_router, prefix="/chat")


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Dev_Split API Running"}