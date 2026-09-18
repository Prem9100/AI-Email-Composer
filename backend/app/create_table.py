from app.database.database import engine
from app.models.base import Base
from app.models.user import User
from app.models.email import Email
Base.metadata.create_all(bind=engine)
print("Table created successfully")