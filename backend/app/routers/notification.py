from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.notification import Notification
from app.models.user import User
from app.auth.security import get_current_user
from app.schemas.notification import NotificationResponse

from typing import List
from sqlalchemy import func
router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

@router.get(
    "",
    response_model=List[NotificationResponse]
)
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .limit(5)
        .all()
    )

    return notifications

@router.put("/read")
def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id,
            Notification.is_read == False
        )
        .all()
    )

    for notification in notifications:
        notification.is_read = True

    db.commit()

    return {
        "message": "Notifications marked as read"
    }
    
@router.delete("/clear")
def clear_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    db.query(Notification).filter(
        Notification.user_id == current_user.id
    ).delete()

    db.commit()

    return {
        "message": "All notifications cleared"
    }
    
@router.get("/count")
def notification_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    count = (
        db.query(func.count(Notification.id))
        .filter(
            Notification.user_id == current_user.id,
            Notification.is_read == False
        )
        .scalar()
    )

    return {"count": count}