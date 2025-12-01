# workflow.py
from langgraph.graph import StateGraph, END
from typing import TypedDict
from langchain_openai import ChatOpenAI
from firecrawl_service import FirecrawlService
from prompts import DeveloperToolsPrompts
from models import CompanyState, CompanyDetails, RecommendationsOutput
from pydantic import BaseModel, Field
from typing import List
 

llm = ChatOpenAI(model="gpt-4o-mini")


def scrape_node(state: CompanyState):
    """Scrapes the website using FirecrawlService."""

    print("🔍 Scraping website:", state["url"])
    firecrawl = FirecrawlService()
    result = firecrawl.scrape_company_pages(state["url"])

    markdown = getattr(result, "markdown", None)
    if not markdown:
        raise ValueError("Scraping failed or returned no markdown content.")

    # Try to extract company name from Firecrawl metadata or fallback to domain
    company_name = None
    if hasattr(result, "metadata") and result.metadata:
        company_name = getattr(result.metadata, "title", "")

    if not company_name:
        company_name = state["url"].split("//")[-1].split("/")[0]

    return {"scraped_data": markdown, "company_name": company_name}


def summarize_node(state: CompanyState):
    """Summarize website in 2-3 lines for quick display."""

    print("📝 Generating short summary...")
    system_prompt = DeveloperToolsPrompts.SUMMARIZE_SYSTEM
    user_prompt = DeveloperToolsPrompts.summarize_prompt(state["company_name"], state["scraped_data"], state.get("language", "en"))
    response = llm.invoke([{"role": "system", "content": system_prompt},
                           {"role": "user", "content": user_prompt}])
    return {"summary": response.content}


def analyze_node(state: CompanyState):
    """Analyzes scraped content using LLM and extracts branch + formatted company name."""
    print("🧠 Analyzing company website...")

    system_prompt = DeveloperToolsPrompts.ANALYSIS_SYSTEM
    user_prompt = DeveloperToolsPrompts.analyse_prompt(
        state["company_name"],
        state["scraped_data"], 
        state.get("language", "en")
    )

    structured_llm = llm.with_structured_output(CompanyDetails)
    response = structured_llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ])

    branch = response.branch
    company_name = response.company_name

    # Hvis company_name er tom, behold det eksisterende fra state
    if not company_name:
        company_name = state["company_name"]

    
    return {
        "branch": branch,
        "company_name": company_name,
        "analysis": response.model_dump_json(indent=2, ensure_ascii=False)
    }


def recommend_node(state: CompanyState):
    """Generates AI implementation recommendations."""
    print("💡 Generating AI recommendations...")
    system_prompt = DeveloperToolsPrompts.RECOMMENDATIONS_SYSTEM
    user_prompt = DeveloperToolsPrompts.recommendation_prompt(
        state["company_name"],
        state["analysis"], 
        state.get("language", "en")
    )

    structured_llm = llm.with_structured_output(RecommendationsOutput)
    response = structured_llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ])

    # Returnér som dict-list, så det passer ind i CompanyState
    return {"recommendations": [r.model_dump() for r in response.recommendations]}


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
