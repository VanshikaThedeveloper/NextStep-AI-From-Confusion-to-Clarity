
from fastapi import HTTPException, status
from database.db import user_collection
from utils.hash import hash_password, verify_password
from utils.jwt_handler import create_access_token

async def register_user(user):
    existing_user = await user_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    hashed_pwd = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pwd
    }

    await user_collection.insert_one(new_user)

    return {"message": "User registered successfully"}


async def login_user(user):
    existing_user = await user_collection.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No account found with this email address."
        )

    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please try again."
        )

    token = create_access_token({"user_id": str(existing_user["_id"])})

    return {
        "message": "Login successful",
        "token": token,
        "name": existing_user.get("name", ""),
        "email": existing_user.get("email", "")
    }