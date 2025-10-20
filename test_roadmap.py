"""
Test script for the career roadmap endpoint.
Run this after starting the FastAPI server with: uvicorn app.main:app --reload
"""

import requests

# Test the career roadmap endpoint
def test_career_roadmap():
    base_url = "http://127.0.0.1:8000"
    
    # Test with different roles
    test_roles = [
        "Software Developer",
        "Data Scientist",
        "Web Developer"
    ]
    
    for role in test_roles:
        print(f"\n{'='*60}")
        print(f"Testing role: {role}")
        print('='*60)
        
        try:
            response = requests.get(f"{base_url}/career_roadmap/{role}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"\n✓ Success! Status Code: {response.status_code}")
                print(f"\nRole: {data['role']}")
                print(f"\nSkills ({len(data['skills'])}):")
                for skill in data['skills']:
                    print(f"  - {skill}")
                print(f"\nCertifications ({len(data['certifications'])}):")
                for cert in data['certifications']:
                    print(f"  - {cert}")
                print(f"\nProjects ({len(data['projects'])}):")
                for project in data['projects']:
                    print(f"  - {project}")
            else:
                print(f"\n✗ Error! Status Code: {response.status_code}")
                print(f"Response: {response.json()}")
                
        except requests.exceptions.ConnectionError:
            print("\n✗ Error: Could not connect to the server.")
            print("Make sure the FastAPI server is running with:")
            print("  uvicorn app.main:app --reload")
            break
        except Exception as e:
            print(f"\n✗ Error: {e}")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("Career Roadmap Endpoint Test")
    print("="*60)
    print("\nMake sure your FastAPI server is running on http://127.0.0.1:8000")
    print("Start it with: uvicorn app.main:app --reload")
    input("\nPress Enter to start testing...")
    
    test_career_roadmap()
    
    print("\n" + "="*60)
    print("Testing Complete!")
    print("="*60)
