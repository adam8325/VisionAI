class DeveloperToolsPrompts:
    """Collection of prompts for analyzing website data and AI recommendations."""


    SUMMARIZE_SYSTEM = """Your are a professional summarizer. You create concise summaries of website content in 2-3 lines, 
                        focusing on the main purpose and offerings of the site."""
    
    @staticmethod
    def summarize_prompt(company_name: str, content: str, language: str = "en") -> str:
        lang_line = "Make the output in English." if language == "en" else "Make the output in Danish."
        return f"""Company: {company_name}
                Website Content: {content[:2000]}

                Give a short (2-3 sentence) description of what this company does, 
                its products or services, and target customers.
                {lang_line}"""


    ANALYSIS_SYSTEM = """You are analyzing website data and looking for AI recommendations to implement. 
                        Focus on extracting information that would be relevant to build features which are optimized using AI-technologies. Pay special attention to the company's branch, their values, services and customers.
                        Return the result as valid JSON matching this structure:
                        {
                          "company_name": "formatted name of the company",
                          "branch": "short label for the company's industry"
                        }
                        No extra text or explanation outside the JSON.
                        """

    @staticmethod
    def analyse_prompt(company_name: str, content: str, language: str = "en") -> str:
        lang_line = "Make the output in English." if language == "en" else "Make the output in Danish."
        return f"""Company: {company_name}
                Website Content: {content[:2500]}

                Analyze the above website content and provide:
                - values_and_focus: Describe what values, goals, or focus areas the company seems to emphasize (e.g. innovation, sustainability, customer service).
                - ai_opportunities: Briefly mention where AI might naturally fit based on what the company offers (e.g. automation, data analysis, customer engagement).
                - Branch: Identify the main industry or sector the company belongs to. Short branch tag, e.g. \"Technology & Software\"", Save this as a JSON object {{...}}

                Keep it concise and factual — the purpose is to confirm understanding of what this company does and identify potential AI-related entry points.
                {lang_line}"""

    # Recommendation prompts
    RECOMMENDATIONS_SYSTEM = """You are a senior AI-consultant providing realistic, modern and profitable AI-solutions. 
                            You adjust to different types of websites and branches and adopt your recommendations accordingly."""

    @staticmethod
    def recommendation_prompt(query: str, company_data: str, language: str = "en") -> str:
        lang_line = "Make the output in English." if language == "en" else "Make the output in Danish."
        if language == "en":
            quick_win = "Quick Win"
            targeted_improvement = "Targeted Improvement"
            strategic_initiative = "Strategic Initiative"
        else:
            quick_win = "Hurtig Gevinst"
            targeted_improvement = "Målrettet Forbedring"
            strategic_initiative = "Strategisk Løft"

        return f"""Analyzed Company: {query}
                Website Data Summary: {company_data}

                Based on the website content, provide three realistic AI implementation recommendations tailored to this company:
                1. {quick_win} – a low-effort, high-impact use case that can be implemented fast and show immediate value.
                2. {targeted_improvement} – a more involved project that integrates AI deeper into existing operations or workflows.
                3. {strategic_initiative} – a large-scale AI transformation that could redefine key business areas or products.

                For each recommendation, provide:
                - title: a short, expressive title for the proposed solution
                - type: short label (e.g. "{quick_win}", "{targeted_improvement}", "{strategic_initiative}")
                - description: an object with keys: 
                  ai_solution: Describe the AI-solution in details and combine it with the business need it solves. Make it descriptive, and easy to understand for stakeholders. Don't exceede 20 lines.
                  expected_outcome:  Include realistic outcome numbers either in percentages or numbers providing the company with a clear picture of the expected benefits - either in saved working time, increased revenue, improved customer satisfaction or expected savings. Use the language and terminology relevant to the company's industry. Make it short and precise, so it fits into a bullet point format. Max 5 words for each bullet point.(Must be a list of 4-6 bullet points). Use this format '[...]'
                - time_estimate: e.g. "2-3 weeks" - this is an estimate of how long implementation might take
                - impact: e.g. "High" - the expected impact level on the business from implementing the solution
                - roi: e.g. "3-6 months" - estimated time to see return on investment

                Example JSON output (must be valid JSON):
                [
                  {{
                    "type": "{quick_win}",
                    "title": "Automated Payment Reminders",
                    "description": {{
                      "ai_solution": "...",
                      "expected_outcome": [
                        "Increased efficiency by 20%",
                        "Reduced late payments by 15%", 
                        "Improved cash flow management by 10%"
                      ]
                    }}, 
                    "time_estimate": "2-3 weeks",
                    "impact": "High",
                    "roi": "3-6 months"
                  }},
                  ...
                ]

                Keep the tone professional and output the JSON only (no code fences). {lang_line}
                """
