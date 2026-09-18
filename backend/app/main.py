from fastapi import FastAPI
from app.routers.user import router as user_router
from app.routers.auth import router as auth_router
from app.routers.profile import router as profile_router
from app.routers.email import router as email_router
from app.routers import dashboard
from app.database.database import engine
from app.models.base import Base
from app.models.user import User
from app.models.email import Email
from app.models.notification import Notification
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from app.models.notification import Notification
from app.routers.notification import router as notification_router
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="AI Email Composer",
    description="An AI-powered email composition tool that helps users draft professional and effective emails quickly and efficiently.",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5175",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(email_router)
app.include_router(dashboard.router)
app.include_router(notification_router)
@app.get("/")
def home():
    return {"message": "Welcome to the AI Email Composer API!"}