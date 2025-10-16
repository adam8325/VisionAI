from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from workflow import create_workflow

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
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
            "summary": result.get("summary"),
            "analysis": result.get("analysis"),
            "recommendations": result.get("recommendations")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
