from typing import Optional
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field
from pymongo import IndexModel

class Challenge(Document):
    uuid: UUID = Field(default_factory=uuid4)
    title: Optional[str] = "TITLE"
    region: Optional[str] = "REGION"
    layer: Optional[str] = "LAYER"
    description: Optional[str] = "DESCRIPTION"
    connect: Optional[str] = "CONNECT"
    flag: Optional[str] = "FLAG"


    class Settings:
        indexes = [
            IndexModel("uuid", unique=True),
        ]
