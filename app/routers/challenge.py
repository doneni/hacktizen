from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.challenges import Challenge
from app.schemas.challenges import ChallengeBase, ChallengeCheckFlag
from app.models.users import User
from app.schemas.users import UserSolve
from app.auth.auth import get_current_user

router = APIRouter()

@router.get("/")
async def root_challenge():
    return {"message": "Welcome to challenge home !"}


@router.get("/get-all-challenges", response_model=dict)
async def get_all_challenges():
    challenges = await Challenge.all().to_list()
    challenges_base = [ChallengeBase(
        title=challenge.title,
        region=challenge.region,
        layer=challenge.layer,
        description=challenge.description,
        connect=challenge.connect
    ) for challenge in challenges]
    return {"challenges": challenges_base}


@router.get("/get-solved-challenges", response_model=dict)
async def get_solved_challenges(
    current_user: User = Depends(get_current_user)
):
    solved_challenge_titles = current_user.solved
    challenges = await Challenge.find({"title": {"$in": solved_challenge_titles}}).to_list()
    
    challenges_base = [ChallengeBase(
        title=challenge.title,
        region=challenge.region,
        layer=challenge.layer,
        description=challenge.description,
        connect=challenge.connect
    ) for challenge in challenges]
    
    return {"challenges": challenges_base}


@router.get("/get-challenge")
async def get_challenges(
        layer: str,
        region: str,
        current_user: User = Depends(get_current_user),
):
    try:
        challenge = await Challenge.find_one({"layer": layer, "region": region}) # change here for scalability!
        if challenge is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")
        solved_challenge_titles = set(current_user.solved)
        challenge = {
                "title": challenge.title,
                "region": challenge.region,
                "layer": challenge.layer,
                "description": challenge.description,
                "connect": challenge.connect,
                "solved": str(challenge.title) in solved_challenge_titles,
            }
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    return challenge


@router.post("/check-flag" )
async def check_flag(
        check_flag_request: ChallengeCheckFlag,
        current_user: User = Depends(get_current_user),
):
    title = check_flag_request.title
    user_flag = check_flag_request.user_flag

    challenge = await Challenge.find_one({"title": title, "flag": user_flag})
    if challenge:
        if str(challenge.title) not in current_user.solved:
            current_user.solved.append(str(challenge.title))
            await current_user.save()

        return {"correct": bool(1)}
    else:
        return {"correct": bool(0)}