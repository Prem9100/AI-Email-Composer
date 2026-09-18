from pydantic import BaseModel,EmailStr,Field

class UserCreate(BaseModel):
    name: str= Field(min_length=3, max_length=100)
    email: EmailStr
    password: str= Field(min_length=6)

class UserResponse(BaseModel):
    id:int
    name: str
    email: EmailStr
    
    class Config:
        from_attributes =True
    
class UserUpdate(BaseModel):
    name: str
    email: EmailStr

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)
