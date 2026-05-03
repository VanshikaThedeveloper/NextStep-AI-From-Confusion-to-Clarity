from pydantic import BaseModel, EmailStr

# For Register
class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str

# For Login
class LoginUser(BaseModel):
    email: EmailStr
    password: str