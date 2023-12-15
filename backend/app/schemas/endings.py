from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID

class EndingBase(BaseModel):
    """
    Shared Ending properties. Visible by anyone.
    """
    index: int = Field(default=0)
    title: str = Field(default="TITLE")
    description: str = Field(default="DESCRIPTION")
    image: str = Field(default="IMAGE")

class Ending(EndingBase):
    """
    Ending properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins or self.
    """
    uuid: UUID
    condition: List[str] = Field(default=[])