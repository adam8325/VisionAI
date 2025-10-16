import os 
from firecrawl import FirecrawlApp
from dotenv import load_dotenv

load_dotenv()


class FirecrawlService:
    def __init__(self):
        api_key = os.getenv("FIRECRAWL_API_KEY")
        if not api_key:
            raise ValueError("FIRECRAWL_API_KEY is not set in environment variables.")
        self.app = FirecrawlApp(api_key=api_key)

    
    def scrape_company_pages(self, url: str):
        try:
            result = self.app.scrape(
                url,
                formats=["markdown"],
            )
            print("✅ Firecrawl scrape successful")
            print("🔥 Raw Firecrawl result:", result)
            return result
        except Exception as e:
            print("❌ Firecrawl scrape error:", e)
            return None