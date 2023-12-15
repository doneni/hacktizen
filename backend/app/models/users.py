from typing import List, Optional
from uuid import UUID, uuid4

from beanie import Document, init_beanie
from pydantic import EmailStr, Field
from pymongo import IndexModel


class User(Document):
    uuid: UUID = Field(default_factory=uuid4)
    email: EmailStr = Field(unique=True, index=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    hashed_password: Optional[str] = None
    provider: Optional[str] = None
    picture: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False
    solved: List[str] = Field(default_factory=list)

    class Settings:
        # Set unique index on uuid here instead of using Indexed
        # because of https://github.com/roman-right/beanie/issues/701
        indexes = [
            IndexModel("uuid", unique=True),
        ]