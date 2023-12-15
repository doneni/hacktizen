from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.models.users import User
from app.models.records import Record
from app.schemas.records import RecordBase
from app.auth.auth import get_current_user

router = APIRouter()

@router.get("/")
async def root_challenge():
    return {"message": "Welcome to record home !"}

@router.get("/get-all-records", response_model=dict)
async def get_all_records():
    records = await Record.all().to_list()
    records_base = [RecordBase(
        index=record.index,
        nickname=record.nickname,
        content=record.content,
        solved=record.solved,
        date=record.date,
    ) for record in records]
    return {"records": records_base}