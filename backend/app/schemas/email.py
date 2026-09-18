from pydantic import BaseModel, Field


class EmailRequest(BaseModel):
    scenario: str = Field(min_length=10)
    email_type: str
    tone: str
    length: str


class EmailResponse(BaseModel):
    id: int
    subject: str
    body: str

    class Config:
        from_attributes = True


class EmailHistory(BaseModel):
    id: int
    scenario: str
    email_type: str
    tone: str
    length: str
    subject: str

    class Config:
        from_attributes = True