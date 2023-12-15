from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID

class RecordBase(BaseModel):
    """
    Shared Record properties. Visible by anyone.
    """
    index: Optional[int] = 0
    nickname: Optional[str] = "NICKNAME"
    content: Optional[str] = "CONTENT"
    solved: List[str] = Field(default_factory=list)
    date: Optional[datetime] = datetime.strptime("2000-01-01 00:00", "%Y-%m-%d %H:%M")

class Record(RecordBase):
    """
    Record properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins or self.
    """
    uuid: UUID