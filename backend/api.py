from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from workflow import create_workflow

app = FastAPI()
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
