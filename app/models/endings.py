from typing import List, Optional
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field
from pymongo import IndexModel

class Ending(Document):
    uuid: UUID = Field(default_factory=uuid4)
    index: Optional[int] = 0
    title: Optional[str] = "TITLE"
    description: Optional[str] = "DESCRIPTION"
    image: Optional[str] = "IMAGE"
    condition: List[str] = Field(default_factory=list)

    class Settings:
        indexes = [
            IndexModel("uuid", unique=True),
        ]