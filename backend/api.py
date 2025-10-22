from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from workflow import create_workflow

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173", "https://visionai-h0fe.onrender.com"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

workflow = create_workflow()

class UrlInput(BaseModel):
    url: str

@app.post("/api/analyze-url")
def analyze_url(data: UrlInput):
    try:
        result = workflow.invoke({"url": data.url})
        return {
            "company_name": result.get("company_name"),
            "summary": result.get("summary"),
            "branch": result.get("branch"),     
            "recommendations": result.get("recommendations")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
