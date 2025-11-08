"""
Quick integration test for all backend endpoints
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000"

user_data = {
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

print("="*70)
print("INTEGRATION TEST: All Backend Endpoints")
print("="*70)

tests_passed = 0
tests_failed = 0

# Test 1: Root
print("\n[1/7] Testing root endpoint...")
try:
    r = requests.get(f"{BASE_URL}/")
    assert r.status_code == 200
    print("✓ PASS - Root endpoint working")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Test 2: Top 3 Predictions
print("\n[2/7] Testing career prediction...")
try:
    r = requests.post(f"{BASE_URL}/predict_top3_careers", json=user_data)
    assert r.status_code == 200
    result = r.json()
    assert "top_predictions" in result
    print(f"✓ PASS - Predicted: {result['top_predictions'][0]['role']}")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Test 3: Career Evolution
print("\n[3/7] Testing career evolution...")
try:
    r = requests.post(f"{BASE_URL}/predict_career_evolution", json=user_data)
    assert r.status_code == 200
    result = r.json()
    assert "current_role" in result
    print(f"✓ PASS - Evolution from {result['current_role']}")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Test 4: XAI Explanation
print("\n[4/7] Testing XAI explanations...")
try:
    r = requests.post(
        f"{BASE_URL}/xai_explanations/Software Engineer",
        json=user_data,
        params={"generate_visualization": False},
        timeout=30
    )
    assert r.status_code == 200
    result = r.json()
    assert "top_factors" in result
    print(f"✓ PASS - Generated {len(result['top_factors'])} feature explanations")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Test 5: Counterfactual (KEY TEST)
print("\n[5/7] Testing counterfactual analysis...")
try:
    r = requests.post(
        f"{BASE_URL}/xai_counterfactual/Data Architect",
        json=user_data,
        params={"max_changes": 5},
        timeout=30
    )
    assert r.status_code == 200
    result = r.json()
    assert "changes_needed" in result
    assert "current_role" in result
    assert "target_role" in result
    print(f"✓ PASS - Counterfactual: {result['current_role']} → {result['target_role']}")
    print(f"  Found {len(result['changes_needed'])} changes (Feasibility: {result.get('feasibility', 'N/A')})")
    if result['changes_needed']:
        print(f"  Top change: {result['changes_needed'][0]['feature']} ({result['changes_needed'][0]['direction']})")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Test 6: Career Roadmap
print("\n[6/7] Testing career roadmap...")
try:
    r = requests.get(f"{BASE_URL}/career_roadmap/Software Engineer")
    assert r.status_code == 200
    result = r.json()
    assert "skills" in result
    print(f"✓ PASS - Roadmap with {len(result['skills'])} skills")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Test 7: Model Architecture
print("\n[7/7] Testing model architecture...")
try:
    r = requests.get(f"{BASE_URL}/model_architecture")
    assert r.status_code == 200
    result = r.json()
    assert "model_type" in result or "layers" in result
    print("✓ PASS - Model architecture endpoint working")
    tests_passed += 1
except Exception as e:
    print(f"✗ FAIL - {e}")
    tests_failed += 1

# Summary
print("\n" + "="*70)
print("TEST SUMMARY")
print("="*70)
print(f"Total: 7 tests")
print(f"Passed: {tests_passed}")
print(f"Failed: {tests_failed}")
print(f"Success rate: {(tests_passed/7)*100:.1f}%")

if tests_passed == 7:
    print("\n✓✓✓ ALL TESTS PASSED! Backend fully integrated and working. ✓✓✓")
else:
    print(f"\nX Some tests failed. Check output above.")

print("="*70)
