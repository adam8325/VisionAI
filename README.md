# 🚀 VisionAI

## Kort og godt
VisionAI analyserer et website og genererer **skræddersyede AI-anbefalinger** for virksomheden på sitet.  
Opdag AI-muligheder for din virksomhed her: https://vision-ai-eosin.vercel.app/
**Backend:** Python + FastAPI + LangChain + LangGraph + Pydantic + Firecrawl (scraper)  
**Frontend:** React + Vite + Tailwind CSS

---

## 🎯 Formål
VisionAI giver en **hurtig, struktureret rapport** om en virksomheds hjemmeside, inklusiv:  
- Virksomhedsnavn  
- Branche  
- Kort summary  
- Analyse  
- Tre realistiske AI-løsninger med estimeret tid, effekt og ROI samt punktvise forventede resultater  

---

## ✨ Features
- **Automatisk web-scraping:** Firecrawl indsamler markdown fra siden(e)  
- **NLP-analyse:** OpenAI-client via LangChain med struktureret output (Pydantic)  
- **Workflow orkestrering:** LangGraph (StateGraph)  
- **Frontend UI:** Indtast URL og se resultater i kort/roadmap  
- **Struktureret output:** JSON med felter som `title`, `type`, `description.ai_solution`, `description.expected_outcome` (liste), `time_estimate`, `impact`, `roi`

---

## 🛠️ Vigtige teknologier
- **Python (>=3.13)** — backend  
- **FastAPI** — API  
- **firecrawl-py** — scraping  
- **langchain, langchain-openai** — LLM client  
- **langgraph** — workflow/state orchestration  
- **pydantic** — LLM structured models  
- **React + Vite** — frontend  
- **Tailwind CSS** — styling

---

## ⚡ Krav
- Python >= 3.13  
- Node.js + npm  
- Firecrawl API-nøgle (indsæt i `backend/.env` som `FIRECRAWL_API_KEY`)

---

## 🖥️ Opsætning

### Backend (Windows PowerShell)
1. Naviger til backend
2. Opret og aktivér virtualenv
3. Installer afhængigheder:
  pip install -r requirements.txt
4. Opret .env med din Firecrawl API-nøgle
5. Kør serveren som package (vigtigt for relative imports):
  uvicorn backend.api:app --reload

### Frontend
1. Åbn nyt terminalvindue og naviger til frontend-mappen
2. Installer afhængigheder:
  npm install
3. Kør dev-serveren:
  npm run dev

