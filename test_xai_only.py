import requests
import json

url = "http://127.0.0.1:8000/xai_explanations/Software%20Engineer"

data = {
    "Acedamic_percentage_in_Operating_Systems": 85.0,
    "Percentage_in_Algorithms": 90.0,
    "Percentage_in_Programming_Concepts": 88.0,
    "Percentage_in_Software_Engineering": 82.0,
    "Percentage_in_Computer_Networks": 75.0,
    "Percentage_in_Electronics_Subjects": 70.0,
    "Percentage_in_Computer_Architecture": 78.0,
    "Percentage_in_Mathematics": 92.0,
    "Percentage_in_Communication_skills": 80.0,
    "Hours_working_per_day": 8.0,
    "Logical_quotient_rating": 9.0,
    "Hackathons": 5,
    "Coding_skills_rating": 8.5,
    "Public_speaking_points": 7.0,
    "Can_work_long_time_before_system": "yes",
    "Self_learning_capability": "yes",
    "Extra_courses_did": "yes",
    "Certifications": "machine learning",
    "Workshops": "data science",
    "Reading_and_writing_skills": "excellent",
    "Memory_capability_score": "excellent",
    "Interested_subjects": "programming",
    "Interested_career_area": "developer",
    "Job_Higher_Studies": "Job",
    "Type_of_company_want_to_settle_in": "product development",
    "Management_or_Technical": "Technical",
    "Hard_smart_worker": "smart worker",
    "Worked_in_teams_ever": "yes"
}

print("🧪 Testing XAI Endpoint with complete data...")
print(f"URL: {url}")

try:
    response = requests.post(url, json=data, params={"generate_visualization": False}, timeout=60)
    
    print(f"\n✅ Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n📊 XAI Response Structure:")
        print(f"   Keys: {list(result.keys())}")
        
        if "top_factors" in result:
            print(f"\n   Top Factors ({len(result['top_factors'])}):")
            for i, factor in enumerate(result["top_factors"][:5], 1):
                print(f"   {i}. {factor['feature']}: {factor['impact']} ({factor['contribution']})")
        
        if "predicted_role" in result:
            print(f"\n   Predicted Role: {result['predicted_role']}")
            print(f"   Confidence: {result.get('confidence', 'N/A')}")
        
        print("\n✅ XAI endpoint is working!")
    else:
        print(f"\n❌ Error Response:")
        print(response.text[:500])
        
except Exception as e:
    print(f"\n❌ Exception: {str(e)}")
