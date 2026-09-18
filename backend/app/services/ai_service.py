from google import genai
from app.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_email(scenario, email_type, tone, length):

    prompt = f"""
You are an expert business email writer.

Generate a professional email.

Scenario:
{scenario}

Email Type:
{email_type}

Tone:
{tone}

Length:
{length}

Return the response exactly like this:

Subject:
<subject>

Body:
<body>
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text

    subject = "Generated Email"
    body = text

    if "Body:" in text:
        parts = text.split("Body:")
        subject = parts[0].replace("Subject:", "").strip()
        body = parts[1].strip()

    return {
        "subject": subject,
        "body": body
    }