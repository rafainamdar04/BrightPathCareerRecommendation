"""
Demo: XAI Counterfactual Analysis
Shows what needs to change to get a different career recommendation
"""

import requests
import json
from colorama import init, Fore, Style

init(autoreset=True)

BASE_URL = "http://127.0.0.1:8000"

# Sample user profile
user_profile = {
    "Acedamic_percentage_in_Operating_Systems": 85.0,
    "Percentage_in_Algorithms": 90.0,
    "Percentage_in_Programming_Concepts": 88.0,
    "Percentage_in_Software_Engineering": 82.0,
    "Percentage_in_Computer_Networks": 75.0,
    "Percentage_in_Electronics_Subjects": 70.0,
    "Percentage_in_Computer_Architecture": 78.0,
    "Percentage_in_Mathematics": 75.0,  # Lower math score
    "Percentage_in_Communication_skills": 80.0,
    "Hours_working_per_day": 8.0,
    "Logical_quotient_rating": 9.0,
    "Hackathons": 3,  # Not many hackathons
    "Coding_skills_rating": 8.5,
    "Public_speaking_points": 6.0,
    "Can_work_long_time_before_system": "yes",
    "Self_learning_capability": "yes",
    "Extra_courses_did": "yes",
    "Certifications": "machine learning",
    "Workshops": "web development",  # Different from data science
    "Reading_and_writing_skills": "excellent",
    "Memory_capability_score": "excellent",
    "Interested_subjects": "programming",  # Generic interest
    "Interested_career_area": "developer",
    "Job_Higher_Studies": "Job",
    "Type_of_company_want_to_settle_in": "product development",
    "Management_or_Technical": "Technical",
    "Hard_smart_worker": "smart worker",
    "Worked_in_teams_ever": "yes"
}

def print_header(text):
    print(f"\n{Fore.CYAN}{'='*70}")
    print(f"{Fore.CYAN}{text:^70}")
    print(f"{Fore.CYAN}{'='*70}\n")

def get_initial_prediction():
    """Get the initial career prediction"""
    response = requests.post(f"{BASE_URL}/predict_top3_careers", json=user_profile)
    return response.json()

def get_counterfactual(target_role, max_changes=5):
    """Get counterfactual analysis for target role"""
    response = requests.post(
        f"{BASE_URL}/xai_counterfactual/{target_role}",
        params={"max_changes": max_changes},
        json=user_profile,
        timeout=30
    )
    return response.json()

def display_prediction(predictions):
    """Display initial predictions"""
    print_header("CURRENT CAREER PREDICTION")
    
    print(f"{Fore.GREEN}Top Predictions:")
    for i, pred in enumerate(predictions["top_predictions"][:3], 1):
        confidence = pred["confidence_score"]
        bar = "█" * int(confidence) + "░" * (10 - int(confidence))
        print(f"  {i}. {Fore.YELLOW}{pred['role']:<30} {Fore.GREEN}{bar} {confidence:.1f}/10")

def display_counterfactual(counterfactual):
    """Display counterfactual analysis"""
    print_header(f"COUNTERFACTUAL: How to become {counterfactual['target_role']}")
    
    # Current vs Target
    print(f"{Fore.WHITE}Current Prediction: {Fore.YELLOW}{counterfactual['current_role']}")
    print(f"{Fore.WHITE}Target Role:        {Fore.GREEN}{counterfactual['target_role']}")
    
    # Feasibility
    feasibility = counterfactual['feasibility']
    color = Fore.GREEN if feasibility == "High" else Fore.YELLOW if feasibility == "Moderate" else Fore.RED
    print(f"{Fore.WHITE}Feasibility:        {color}{feasibility}\n")
    
    # Changes needed
    if not counterfactual.get('changes_needed'):
        print(f"{Fore.RED}No changes identified or error occurred.")
        return
    
    print(f"{Fore.CYAN}{'Changes Needed':^70}\n")
    
    for i, change in enumerate(counterfactual['changes_needed'], 1):
        # Feature name
        feature_display = change['feature'].replace('_', ' ').title()
        print(f"{Fore.WHITE}{i}. {Fore.YELLOW}{feature_display}")
        
        # Current value
        print(f"   {Fore.WHITE}Current Value:  {Fore.CYAN}{change['current_value']}")
        
        # Direction arrow
        if change['direction'] == 'increase':
            arrow = f"{Fore.GREEN}↑ INCREASE"
        else:
            arrow = f"{Fore.RED}↓ DECREASE"
        print(f"   {Fore.WHITE}Direction:      {arrow}")
        
        # Impact
        impact = change['impact_difference']
        print(f"   {Fore.WHITE}Impact:         {Fore.MAGENTA}{impact:.3f}")
        
        # Suggestion
        print(f"   {Fore.WHITE}💡 Suggestion:  {Fore.GREEN}{change['suggestion']}\n")

def get_actionable_advice(feature, direction):
    """Generate specific actionable advice"""
    advice_map = {
        "Percentage_in_Mathematics": {
            "increase": "📚 Take courses: Linear Algebra, Statistics, Calculus on Coursera/edX",
            "decrease": "Focus on practical coding skills instead"
        },
        "Hackathons": {
            "increase": "🏆 Participate in MLH hackathons, DevPost challenges, Kaggle competitions",
            "decrease": "Focus on building complete projects instead"
        },
        "Percentage_in_Algorithms": {
            "increase": "💻 Complete LeetCode 75 Hard, daily algorithm practice on HackerRank",
            "decrease": "Focus on system design and architecture patterns"
        },
        "Interested_subjects": {
            "increase": "📖 Shift focus to data science, machine learning, statistics courses",
            "decrease": "Maintain current programming focus"
        },
        "Workshops": {
            "increase": "🎓 Attend data science workshops, ML bootcamps, AI conferences",
            "decrease": "Current workshop path is sufficient"
        },
        "Coding_skills_rating": {
            "increase": "👨‍💻 Build 3-5 portfolio projects, contribute to open source on GitHub",
            "decrease": "Focus on soft skills and leadership"
        }
    }
    
    return advice_map.get(feature, {}).get(direction, f"{direction.title()} your {feature}")

def display_action_plan(counterfactual):
    """Display actionable improvement plan"""
    print_header("ACTIONABLE IMPROVEMENT PLAN")
    
    for i, change in enumerate(counterfactual['changes_needed'], 1):
        advice = get_actionable_advice(change['feature'], change['direction'])
        print(f"{Fore.YELLOW}Step {i}: {Fore.WHITE}{advice}")

def main():
    print(f"\n{Fore.MAGENTA}{'🎯 XAI COUNTERFACTUAL ANALYSIS DEMO 🎯':^70}\n")
    
    try:
        # Step 1: Get initial prediction
        print(f"{Fore.WHITE}Analyzing your profile...")
        predictions = get_initial_prediction()
        display_prediction(predictions)
        
        current_top = predictions["top_predictions"][0]["role"]
        
        # Step 2: User wants different career
        print(f"\n{Fore.CYAN}{'─'*70}")
        # Use actual roles from the model
        target_roles = ["Software Engineer", "Software Developer", "Data Architect"]
        
        print(f"\n{Fore.WHITE}What if you want to be something else?")
        print(f"{Fore.GREEN}Let's analyze what needs to change for:\n")
        
        for target in target_roles:
            print(f"{Fore.YELLOW}➤ {target}")
        
        # Analyze counterfactuals
        for target in target_roles:
            print(f"\n{Fore.CYAN}{'─'*70}")
            print(f"{Fore.WHITE}Analyzing counterfactual for: {Fore.GREEN}{target}")
            
            counterfactual = get_counterfactual(target, max_changes=5)
            display_counterfactual(counterfactual)
            display_action_plan(counterfactual)
            
            input(f"\n{Fore.CYAN}Press Enter to see next career analysis...")
        
        print(f"\n{Fore.GREEN}{'✅ Analysis Complete!':^70}\n")
        
    except requests.exceptions.ConnectionError:
        print(f"{Fore.RED}❌ Error: Could not connect to backend server at {BASE_URL}")
        print(f"{Fore.YELLOW}Make sure the server is running with: python -m uvicorn app.main:app --host 127.0.0.1 --port 8000")
    except Exception as e:
        print(f"{Fore.RED}❌ Error: {str(e)}")

if __name__ == "__main__":
    main()
