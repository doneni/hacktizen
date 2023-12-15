from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_story():
    return {"message": "Get Story Home !"}