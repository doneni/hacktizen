from typing import Optional, List
from beanie import PydanticObjectId
from pydantic import BaseModel, Field
from uuid import UUID

class ChallengeBase(BaseModel):
    """
    Shared Challenge properties. Visible by anyone.
    """

    title: str = Field(default="TITLE")
    region: str = Field(default="REGION")
    layer: str = Field(default="LAYER")
    description: str = Field(default="DESCRIPTION")
    connect: Optional[str] = Field(default="CONNECT")

class PrivateChallengeBase(ChallengeBase):
    """
    Shared Challenge properties. Visible only by admins and self.
    """
    
    flag: str = Field(default="FLAG")

class ChallengeCreate(ChallengeBase):
    """
    Challenge properties to create via API on update.
    """
    pass

class ChallengeFetch(ChallengeBase):
    """
    Challenge properties to fetch @ front.
    """

    title: str = Field(default_factory=lambda: "TITLE")
    region: str = Field(default_factory=lambda: "REGION")
    layer: str = Field(default_factory=lambda: "LAYER")
    description: str = Field(default_factory=lambda: "DESCRIPTION")
    connect: Optional[str] = Field(default_factory=lambda: "CONNECT")
    solved: List[str] = Field(default_factory=lambda: [])

class ChallengeCheckFlag(BaseModel):
    title: str
    user_flag: str

class Challenge(ChallengeBase):
    """
    Challenge properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins or self.
    """
    id: PydanticObjectId = Field()
    uuid: UUID