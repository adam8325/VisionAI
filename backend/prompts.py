class DeveloperToolsPrompts:
    """Collection of prompts for analyzing website data and AI recommendations."""


    SUMMARIZE_SYSTEM = """Your are a professional summarizer. You create concise summaries of website content in 2-3 lines, 
                        focusing on the main purpose and offerings of the site."""
    
    @staticmethod
    def summarize_prompt(company_name: str, content: str) -> str:
        return f"""Company: {company_name}
                Website Content: {content[:2000]}

                Give a short (2-3 sentence) description of what this company does, 
                its products or services, and target customers."""


    ANALYSIS_SYSTEM = """You are analyzing website data and looking for AI recommendations to implement. 
                        Focus on extracting information that would be relevant to build features which are optimized using AI-technologies. Pay special attention to the company's branch, their values, services and customers."""

    @staticmethod
    def analyse_prompt(company_name: str, content: str) -> str:
        return f"""Company: {company_name}
                Website Content: {content[:2500]}

                Analyze the above website content and provide:
                - industry: Identify the main industry or sector the company belongs to.
                - values_and_focus: Describe what values, goals, or focus areas the company seems to emphasize (e.g. innovation, sustainability, customer service).
                - ai_opportunities: Briefly mention where AI might naturally fit based on what the company offers (e.g. automation, data analysis, customer engagement).

                Keep it concise and factual — the purpose is to confirm understanding of what this company does and identify potential AI-related entry points."""

    # Recommendation prompts
    RECOMMENDATIONS_SYSTEM = """You are a senior AI-consultant providing realistic, modern and profitable AI-solutions. 
                            You adjust to different types of websites and branches and adopt your recommendations accordingly."""

    @staticmethod
    def recommendation_prompt(query: str, company_data: str) -> str:
        return f"""Analyzed Company: {query}
                Website Data Summary: {company_data}

                Based on the website content, provide three realistic AI implementation recommendations tailored to this company:
                1. Quick Win – a low-effort, high-impact use case that can be implemented fast and show immediate value.
                2. Medium Effort – a more involved project that integrates AI deeper into existing operations or workflows.
                3. Strategic Initiative – a large-scale AI transformation that could redefine key business areas or products.

                For each recommendation, describe:
                - The business need or problem it addresses
                - The proposed AI solution or technology
                - The expected outcome or benefit

                Keep the tone professional, realistic, and business-oriented — as if advising company executives."""
