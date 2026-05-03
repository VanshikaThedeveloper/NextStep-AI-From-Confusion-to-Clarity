from services.ai_service import generate_ai_content

def generate_ai_controller(data):
    domain = data.domain
    field = data.field

    result = generate_ai_content(domain, field)

    return {
        "field": field,
        "content": result
    }