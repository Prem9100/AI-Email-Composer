from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.email import Email
from typing import List
from app.schemas.email import(
    EmailRequest,
    EmailResponse,
    EmailHistory
)
from app.services.ai_service import generate_email
from app.auth.security import get_current_user
from app.models.user import User
from app.models.notification import Notification
router= APIRouter(
    prefix="/emails",
    tags=["Emails"]
)
@router.post(
    "/generate",
    response_model=EmailResponse
)
def generate(
    request: EmailRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result= generate_email(
        request.scenario,
        request.email_type,
        request.tone,
        request.length
    )
    email= Email(
        user_id=current_user.id,
        scenario=request.scenario,
        email_type=request.email_type,
        tone=request.tone,
        length=request.length,
        subject=result["subject"],
        body=result["body"]
    )
    db.add(email)
    db.commit()
    db.refresh(email)
    notification = Notification(
    user_id=current_user.id,
    message=f"Email '{email.subject}' generated successfully."
    )

    db.add(notification)
    db.commit()
    return email
@router.get(
    "/history",
    response_model=List[EmailHistory]
)
def email_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    emails = (
        db.query(Email)
        .filter(Email.user_id == current_user.id)
        .order_by(Email.id.desc())
        .all()
    )

    return emails
@router.get(
    "/{email_id}",
    response_model=EmailResponse
)
def get_email(
    email_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    email = db.query(Email).filter(
        Email.id == email_id,
        Email.user_id == current_user.id
    ).first()

    if email is None:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    return email
@router.delete("/{email_id}")
def delete_email(
    email_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    email = db.query(Email).filter(
        Email.id == email_id,
        Email.user_id == current_user.id
    ).first()

    if email is None:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    db.delete(email)

    db.commit()

    return {
        "message": "Email deleted successfully"
    }