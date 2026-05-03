def build_prompt(domain: str, field: str):
    if field == "summary":
        return f"""
        Write a professional resume summary for a {domain}.
        
        STRICT RULES:
        - Only 3 to 4 lines
        - Maximum 60-80 words total
        - No bullet points
        - No headings
        - Keep it concise and impactful
        """

    elif field == "skills":
        return f"Give exactly 6-8 key skills for a {domain} in bullet points only."

    elif field == "experience":
        return f"""
        Write a short work experience description for a {domain}.
        
        STRICT RULES:
        - Only 3 lines
        - Focus on impact and achievements
        - No extra explanation
        """

    return f"Generate resume content for {domain}"