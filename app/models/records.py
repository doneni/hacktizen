from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field
from pymongo import IndexModel

class Record(Document):
    uuid: UUID = Field(default_factory=uuid4)
    index: Optional[int] = 0
    nickname: Optional[str] = "NICKNAME"
    content: Optional[str] = "CONTENT"
    solved: List[str] = Field(default_factory=list)
    date: Optional[datetime] = datetime.strptime("2000-01-01 00:00", "%Y-%m-%d %H:%M")

    class Settings:
        indexes = [
            IndexModel("uuid", unique=True),
        ]