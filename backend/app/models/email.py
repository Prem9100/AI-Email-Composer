from sqlalchemy import DateTime
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base
class Email(Base):
    __tablename__ ="emails"
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"))
    scenario=Column(Text,nullable=False)
    email_type=Column(String(50),nullable=False)
    tone=Column(String(50),nullable=False)
    length=Column(String(30),nullable=False)
    subject=Column(String(255),nullable=False)
    body=Column(Text,nullable=False)
    user=relationship("User")
    created_at = Column(
    DateTime,
    default=datetime.utcnow
    )