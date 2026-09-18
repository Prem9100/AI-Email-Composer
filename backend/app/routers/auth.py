from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.user import User
from app.auth.security import(
    verify_password,
    create_access_token
)
router=APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)
@router.post("/login")
def login(
          form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(get_db)
    ):
    user=db.query(User).filter(
        User.email == form_data.username
    ).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )
    if not verify_password(form_data.password,user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )
    token= create_access_token(
        {"sub":user.email}
    )
    return{
        "access_token": token,
        "token_type": "bearer"
    }