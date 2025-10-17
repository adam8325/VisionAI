# workflow.py
from langgraph.graph import StateGraph, END
from typing import TypedDict
from langchain_openai import ChatOpenAI
from firecrawl_service import FirecrawlService
from prompts import DeveloperToolsPrompts
from typing import List
import json

llm = ChatOpenAI(model="gpt-4o-mini")


class CompanyState(TypedDict):
    url: str
    scraped_data: str
    summary: str
    analysis: str
    recommendations: List[str] = []



def scrape_node(state: CompanyState):
    """Scrapes the website using FirecrawlService."""

    print("🔍 Scraping website:", state["url"])
    firecrawl = FirecrawlService()
    result = firecrawl.scrape_company_pages(state["url"])

    markdown = getattr(result, "markdown", None)
    if not markdown:
        raise ValueError("Scraping failed or returned no markdown content.")

    print("📝 Scrape complete, extracted markdown content.")
    return {"scraped_data": markdown}


def summarize_node(state: CompanyState):
    """Summarize website in 2-3 lines for quick display."""

    print("📝 Generating short summary...")
    system_prompt = DeveloperToolsPrompts.SUMMARIZE_SYSTEM
    user_prompt = DeveloperToolsPrompts.summarize_prompt(state["url"], state["scraped_data"])
    response = llm.invoke([{"role": "system", "content": system_prompt},
                           {"role": "user", "content": user_prompt}])
    return {"summary": response.content}


def analyze_node(state: CompanyState):
    """Analyzes scraped content using LLM and prompts."""

    print("🧠 Analyzing company website...")
    system_prompt = DeveloperToolsPrompts.ANALYSIS_SYSTEM
    user_prompt = DeveloperToolsPrompts.analyse_prompt(state["url"], state["scraped_data"])
    response = llm.invoke([{"role": "system", "content": system_prompt},
                           {"role": "user", "content": user_prompt}])
    return {"analysis": response.content}


def recommend_node(state: CompanyState):
    """Generates AI implementation recommendations as a simple list."""
    print("💡 Generating AI recommendations...")
    system_prompt = DeveloperToolsPrompts.RECOMMENDATIONS_SYSTEM
    user_prompt = DeveloperToolsPrompts.recommendation_prompt(state["url"], state["analysis"])

    response = llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ])

    raw_output = response.content.strip()

    # 🔹 Clean code fences like ```json ... ```
    if raw_output.startswith("```"):
        raw_output = raw_output.strip("`")
        if raw_output.lower().startswith("json"):
            raw_output = raw_output[4:].strip()
        raw_output = raw_output.strip()

    # 🔹 Try parsing directly as a JSON list
    try:
        recs = json.loads(raw_output)
        if isinstance(recs, dict) and "recommendations" in recs:
            recs = recs["recommendations"]
    except json.JSONDecodeError:
        print("⚠️ JSON parse failed, returning fallback list.")
        recs = [{"type": "General", "description": raw_output}]

    return {"recommendations": recs}




def create_workflow():
    graph = StateGraph(CompanyState)

    graph.add_node("scrape", scrape_node)
    graph.add_node("summary", summarize_node)
    graph.add_node("analyze", analyze_node)
    graph.add_node("recommend", recommend_node)

    graph.set_entry_point("scrape")
    graph.add_edge("scrape", "summary")
    graph.add_edge("summary", "analyze")
    graph.add_edge("analyze", "recommend")
    graph.add_edge("recommend", END)

    return graph.compile()
