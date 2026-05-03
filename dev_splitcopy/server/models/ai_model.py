from pydantic import BaseModel

class AIRequest(BaseModel):
    domain: str
    field: str