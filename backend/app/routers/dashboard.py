from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app.auth.security import get_current_user
from app.models.user import User
from app.database.database import get_db
from app.models.email import Email

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    total_emails = db.query(Email).filter(
        Email.user_id == current_user.id
    ).count()

    today_emails = total_emails

    recent = (
        db.query(Email)
        .filter(Email.user_id == current_user.id)
        .order_by(Email.id.desc())
        .limit(5)
        .all()
    )

    return {

        "total_emails": total_emails,

        "generated_today": today_emails,

        "saved_emails": total_emails,

        "recent_emails": recent

    }