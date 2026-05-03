from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    domain: str