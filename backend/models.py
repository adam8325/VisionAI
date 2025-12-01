from typing import List, TypedDict
from pydantic import BaseModel, Field

# ---------- LangGraph State ----------
class CompanyState(TypedDict):
    url: str
    company_name: str
    scraped_data: str
    summary: str
    analysis: str
    recommendations: List[dict]
    branch: str
    language: str


# ---------- Pydantic Models for LLM Structured Output ----------

class CompanyDetails(BaseModel):
    branch: str = Field(..., description="The main industry or branch of the company")
    company_name: str = Field(..., description="The name of the company")


class RecommendationDescription(BaseModel):
    ai_solution: str
    expected_outcome: List[str]


class Recommendation(BaseModel):
    type: str
    title: str
    description: RecommendationDescription
    time_estimate: str
    impact: str
    roi: str


class RecommendationsOutput(BaseModel):
    recommendations: List[Recommendation]
