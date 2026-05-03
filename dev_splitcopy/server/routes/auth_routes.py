from fastapi import APIRouter
from models.user_model import RegisterUser, LoginUser
from controllers.auth_controller import register_user, login_user

router = APIRouter()

# Register Route
@router.post("/register")
async def register(user: RegisterUser):
    return await register_user(user)

# Login Route
@router.post("/login")
async def login(user: LoginUser):
    return await login_user(user)