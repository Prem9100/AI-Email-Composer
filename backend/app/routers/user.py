from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.user import User
from app.models.notification import Notification
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate,
    PasswordUpdate
)
from app.auth.security import (
    hash_password,
    verify_password,
    get_current_user
)
router=APIRouter(
    prefix="/users",
    tags=["Users"]
)
@router.post("/register",response_model=UserResponse)
def register(user: UserCreate, db:Session=Depends(get_db)):
    existing_user= db.query(User).filter(
        User.email == user.email
        ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    new_user= User(
        name= user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get(
    "/me",
    response_model=UserResponse
)
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.put(
    "/profile",
    response_model=UserResponse
)
def update_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    current_user.name = user_data.name
    current_user.email = user_data.email

    db.commit()

    db.refresh(current_user)
    notification = Notification(
        user_id=current_user.id,
        message="Profile updated successfully."
    )

    db.add(notification)
    db.commit()

    return current_user

@router.put("/change-password")
def change_password(
    passwords: PasswordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if not verify_password(
        passwords.current_password,
        current_user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    current_user.password = hash_password(
        passwords.new_password
    )

    db.commit()
    notification = Notification(
        user_id=current_user.id,
        message="Password changed successfully."
    )

    db.add(notification)
    db.commit()

    return {
        "message": "Password updated successfully"
    }