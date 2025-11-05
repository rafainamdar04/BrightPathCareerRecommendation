# app/utils.py

import os
import json
import requests
from pathlib import Path

# Load API key from .env file manually (without python-dotenv dependency)
def load_env_variables():
    env_path = Path(__file__).parent.parent.parent / '.env'
    env_vars = {}
    try:
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key.strip()] = value.strip()
    except FileNotFoundError:
        print(f"Warning: .env file not found at {env_path}")
    return env_vars

# Load environment variables
ENV_VARS = load_env_variables()

def get_career_roadmap(role: str) -> dict:
    """
    Call Mistral AI API to get a detailed career roadmap for a specific role.
    Uses environment variables for API credentials.
    """
    # Get API credentials from environment variables
    API_KEY = ENV_VARS.get("MISTRAL_API_KEY") or os.getenv("MISTRAL_API_KEY")
    API_URL = ENV_VARS.get("MISTRAL_API_URL") or os.getenv("MISTRAL_API_URL", "https://openrouter.ai/api/v1/chat/completions")
    
    if not API_KEY:
        print("ERROR: MISTRAL_API_KEY not found in environment variables")
        return {
            "skills": ["Error: API key not configured"],
            "certifications": ["Error: API key not configured"],
            "projects": ["Error: API key not configured"]
        }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",  # Optional: for OpenRouter
        "X-Title": "Career Roadmap API"  # Optional: for OpenRouter
    }
    
    # Create a detailed prompt for the AI
    prompt = f"""Generate a comprehensive career roadmap for the role: "{role}".

Provide a detailed response in the following JSON format:
{{
  "skills": [list of 8-12 essential technical and soft skills],
  "certifications": [list of 5-8 relevant professional certifications],
  "projects": [list of 5-8 practical projects to build experience]
}}

Make sure each item is specific, actionable, and relevant to the {role} role. Return ONLY the JSON object, no additional text."""

    data = {
        "model": "mistralai/mistral-7b-instruct",  # OpenRouter model format
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.7,
        "max_tokens": 2000
    }
    
    try:
        print(f"Making API call for role: {role}")
        response = requests.post(API_URL, headers=headers, json=data, timeout=30)
        
        # Log the status code
        print(f"API Response Status: {response.status_code}")
        
        # Check for HTTP errors
        if response.status_code != 200:
            print(f"API Error Response: {response.text}")
            response.raise_for_status()
        
        result = response.json()
        print(f"API Response: {json.dumps(result, indent=2)[:500]}...")  # Log first 500 chars
        
        # Extract the assistant's message
        content = result["choices"][0]["message"]["content"]
        print(f"AI Response Content: {content[:200]}...")  # Log first 200 chars
        
        # Try to parse JSON from the response
        # Sometimes the AI adds markdown formatting, so we need to clean it
        content = content.strip()
        if content.startswith("```json"):
            content = content[7:]  # Remove ```json
        if content.startswith("```"):
            content = content[3:]  # Remove ```
        if content.endswith("```"):
            content = content[:-3]  # Remove trailing ```
        content = content.strip()
        
        roadmap = json.loads(content)
        
        # Validate the response has the required keys
        if not all(key in roadmap for key in ["skills", "certifications", "projects"]):
            raise ValueError("Response missing required keys")
        
        print(f"Successfully parsed roadmap for {role}")
        return roadmap
        
    except requests.exceptions.RequestException as e:
        print(f"API Request Error: {str(e)}")
        return {
            "skills": [f"API Request Failed: {str(e)}"],
            "certifications": ["Check your API key and endpoint"],
            "projects": ["See server logs for details"]
        }
    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {str(e)}")
        print(f"Content that failed to parse: {content}")
        return {
            "skills": [f"Failed to parse AI response: {str(e)}"],
            "certifications": ["The AI returned invalid JSON"],
            "projects": ["Check server logs for the raw response"]
        }
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "skills": [f"Unexpected error: {str(e)}"],
            "certifications": ["Check server logs for details"],
            "projects": ["Contact support if this persists"]
        }
