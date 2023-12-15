from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.models.users import User
from app.models.endings import Ending
from app.schemas.endings import EndingBase
from app.auth.auth import get_current_user

router = APIRouter()

@router.get("/")
async def root_challenge():
    return {"message": "Welcome to ending home !"}


@router.get("/get-ending", response_model=EndingBase)
async def get_ending(
    current_user: User = Depends(get_current_user)
):
    user_solved_set = set(current_user.solved)
    
    endings = await Ending.all().to_list()
    for ending in endings:
        ending_condition_set = set(ending.condition)
        if user_solved_set == ending_condition_set:
            return ending

    raise HTTPException(status_code=404, detail="Ending not found for the given conditions")