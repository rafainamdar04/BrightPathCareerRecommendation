"""
Comprehensive Backend Test Suite for BrightPath Career Recommendation
Tests all major endpoints including XAI functionality
"""

import requests
import json
import time
from pathlib import Path

BASE_URL = "http://127.0.0.1:8000"

# Sample user data for testing
SAMPLE_USER_DATA = {
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


def print_header(title):
    """Print a formatted test header"""
    print("\n" + "="*70)
    print(f"  {title}")
    print("="*70)


def test_endpoint(name, method, endpoint, data=None, params=None):
    """Test a single endpoint and return results"""
    print(f"\n🧪 Testing: {name}")
    print(f"   Endpoint: {method} {endpoint}")
    
    try:
        if method == "GET":
            response = requests.get(f"{BASE_URL}{endpoint}", params=params, timeout=30)
        elif method == "POST":
            response = requests.post(f"{BASE_URL}{endpoint}", json=data, params=params, timeout=30)
        else:
            print(f"   ❌ Unsupported method: {method}")
            return False
        
        if response.status_code == 200:
            print(f"   ✅ Status: {response.status_code} OK")
            result = response.json()
            
            # Print key information based on endpoint
            if "predicted_role" in result:
                print(f"   📊 Predicted Role: {result['predicted_role']}")
            elif "top_predictions" in result:
                print(f"   📊 Top 3 Predictions:")
                for pred in result["top_predictions"][:3]:
                    print(f"      • {pred['role']}: {pred['confidence_score']:.1f}/10")
            elif "current_role" in result:
                print(f"   📊 Career Trajectory: {result['current_role']}")
                if "future_roles" in result:
                    for role in result["future_roles"][:2]:
                        print(f"      → {role['role']} ({role['timeframe']})")
            elif "top_factors" in result:
                print(f"   📊 XAI Explanation Generated")
                print(f"      Top Factors ({len(result['top_factors'])} features):")
                for factor in result["top_factors"][:3]:
                    print(f"      • {factor['feature']}: {factor['impact']} ({factor['contribution']})")
            elif "skills" in result:
                print(f"   📊 Roadmap: {len(result['skills'])} skills, {len(result.get('certifications', []))} certifications")
            
            return True
        else:
            print(f"   ❌ Status: {response.status_code}")
            print(f"   Error: {response.text[:200]}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"   ❌ Connection Error: Server not running at {BASE_URL}")
        return False
    except requests.exceptions.Timeout:
        print(f"   ⏱️  Timeout: Request took longer than 30 seconds")
        return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False


def main():
    print("\n" + "🚀 " * 30)
    print("   BRIGHTPATH BACKEND COMPREHENSIVE TEST SUITE")
    print("🚀 " * 30)
    
    results = {}
    
    # Test 1: Root endpoint
    print_header("TEST 1: Root Endpoint")
    results["root"] = test_endpoint("Root API Check", "GET", "/")
    
    # Test 2: Top 3 Career Predictions
    print_header("TEST 2: Career Prediction")
    results["top3"] = test_endpoint(
        "Top 3 Career Predictions",
        "POST",
        "/predict_top3_careers",
        data=SAMPLE_USER_DATA
    )
    
    # Test 3: Career Evolution (AI-driven trajectory)
    print_header("TEST 3: Career Evolution Trajectory")
    results["evolution"] = test_endpoint(
        "Career Evolution Prediction",
        "POST",
        "/predict_career_evolution",
        data=SAMPLE_USER_DATA
    )
    
    # Test 4: Career Roadmap
    print_header("TEST 4: Career Roadmap Generation")
    results["roadmap"] = test_endpoint(
        "Career Roadmap",
        "GET",
        "/career_roadmap/Software Engineer"
    )
    
    # Test 5: XAI Explanation (SHAP-based)
    print_header("TEST 5: XAI Explainability (SHAP)")
    results["xai"] = test_endpoint(
        "XAI Explanation for Software Engineer",
        "POST",
        "/xai_explanations/Software Engineer",
        data=SAMPLE_USER_DATA,
        params={"generate_visualization": False}
    )
    
    # Test 6: XAI Counterfactual
    print_header("TEST 6: XAI Counterfactual Analysis")
    results["counterfactual"] = test_endpoint(
        "Counterfactual: What to change for Data Scientist",
        "POST",
        "/xai_counterfactual/Data Scientist",
        data=SAMPLE_USER_DATA,
        params={"max_changes": 3}
    )
    
    # Test 7: Model Architecture Info
    print_header("TEST 7: Model Architecture")
    results["architecture"] = test_endpoint(
        "Model Architecture Details",
        "GET",
        "/model_architecture"
    )
    
    # Summary
    print_header("TEST SUMMARY")
    total_tests = len(results)
    passed_tests = sum(1 for v in results.values() if v)
    failed_tests = total_tests - passed_tests
    
    print(f"\n📊 Results:")
    print(f"   Total Tests: {total_tests}")
    print(f"   ✅ Passed: {passed_tests}")
    print(f"   ❌ Failed: {failed_tests}")
    print(f"   Success Rate: {(passed_tests/total_tests)*100:.1f}%")
    
    print("\n📋 Detailed Results:")
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"   {status} - {test_name}")
    
    if passed_tests == total_tests:
        print("\n🎉 ALL TESTS PASSED! Backend is fully functional with working XAI endpoint.")
    else:
        print(f"\n⚠️  {failed_tests} test(s) failed. Check the output above for details.")
    
    print("\n" + "="*70 + "\n")


if __name__ == "__main__":
    # Wait a moment for server to be ready
    print("\n⏳ Waiting 2 seconds for server to be ready...")
    time.sleep(2)
    main()
