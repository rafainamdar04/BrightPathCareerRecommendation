# app/model.py

import pickle
import numpy as np
import pandas as pd

# Load model
with open("career_model.pkl", "rb") as f:
    data = pickle.load(f)

model = data["model"]
encoder = data["encoder"]
scaler = data["scaler"]
num_cols = data["num_cols"]
cat_cols = data["cat_cols"]

def predict_career(input_data: dict):
    # Convert input to DataFrame
    import pandas as pd
    
    # Map frontend field names to CSV column names
    field_mapping = {
        "Acedamic_percentage_in_Operating_Systems": "Acedamic percentage in Operating Systems",
        "Percentage_in_Algorithms": "percentage in Algorithms",
        "Percentage_in_Programming_Concepts": "Percentage in Programming Concepts",
        "Percentage_in_Software_Engineering": "Percentage in Software Engineering",
        "Percentage_in_Computer_Networks": "Percentage in Computer Networks",
        "Percentage_in_Electronics_Subjects": "Percentage in Electronics Subjects",
        "Percentage_in_Computer_Architecture": "Percentage in Computer Architecture",
        "Percentage_in_Mathematics": "Percentage in Mathematics",
        "Percentage_in_Communication_skills": "Percentage in Communication skills",
        "Hours_working_per_day": "Hours working per day",
        "Logical_quotient_rating": "Logical quotient rating",
        "Hackathons": "hackathons",
        "Coding_skills_rating": "coding skills rating",
        "Public_speaking_points": "public speaking points",
        "Can_work_long_time_before_system": "can work long time before system?",
        "Self_learning_capability": "self-learning capability?",
        "Extra_courses_did": "Extra-courses did",
        "Certifications": "certifications",
        "Workshops": "workshops",
        "Talent_tests_taken": "talenttests taken?",
        "Olympiads": "olympiads",
        "Reading_and_writing_skills": "reading and writing skills",
        "Memory_capability_score": "memory capability score",
        "Interested_subjects": "Interested subjects",
        "Interested_career_area": "interested career area ",
        "Job_Higher_Studies": "Job/Higher Studies?",
        "Type_of_company_want_to_settle_in": "Type of company want to settle in?",
        "Taken_inputs_from_seniors_or_elders": "Taken inputs from seniors or elders",
        "Interested_in_games": "interested in games",
        "Interested_Type_of_Books": "Interested Type of Books",
        "Salary_Range_Expected": "Salary Range Expected",
        "In_a_Relationship": "In a Realtionship?",
        "Gentle_or_Tuff_behaviour": "Gentle or Tuff behaviour?",
        "Management_or_Technical": "Management or Technical",
        "Salary_work": "Salary/work",
        "Hard_smart_worker": "hard/smart worker",
        "Worked_in_teams_ever": "worked in teams ever?",
        "Introvert": "Introvert"
    }
    
    # Convert frontend field names to CSV column names
    mapped_data = {field_mapping.get(k, k): v for k, v in input_data.items()}
    X_input = pd.DataFrame([mapped_data])
    
    # Separate numerical and categorical
    X_num = scaler.transform(X_input[num_cols])
    X_cat = encoder.transform(X_input[cat_cols])
    
    # Combine
    X_final = np.hstack([X_num, X_cat])
    
    # Predict
    prediction = model.predict(X_final)
    return prediction[0]

def predict_top3_careers(input_data: dict):
    # Convert input to DataFrame
    import pandas as pd
    
    # Map frontend field names to CSV column names
    field_mapping = {
        "Acedamic_percentage_in_Operating_Systems": "Acedamic percentage in Operating Systems",
        "Percentage_in_Algorithms": "percentage in Algorithms",
        "Percentage_in_Programming_Concepts": "Percentage in Programming Concepts",
        "Percentage_in_Software_Engineering": "Percentage in Software Engineering",
        "Percentage_in_Computer_Networks": "Percentage in Computer Networks",
        "Percentage_in_Electronics_Subjects": "Percentage in Electronics Subjects",
        "Percentage_in_Computer_Architecture": "Percentage in Computer Architecture",
        "Percentage_in_Mathematics": "Percentage in Mathematics",
        "Percentage_in_Communication_skills": "Percentage in Communication skills",
        "Hours_working_per_day": "Hours working per day",
        "Logical_quotient_rating": "Logical quotient rating",
        "Hackathons": "hackathons",
        "Coding_skills_rating": "coding skills rating",
        "Public_speaking_points": "public speaking points",
        "Can_work_long_time_before_system": "can work long time before system?",
        "Self_learning_capability": "self-learning capability?",
        "Extra_courses_did": "Extra-courses did",
        "Certifications": "certifications",
        "Workshops": "workshops",
        "Talent_tests_taken": "talenttests taken?",
        "Olympiads": "olympiads",
        "Reading_and_writing_skills": "reading and writing skills",
        "Memory_capability_score": "memory capability score",
        "Interested_subjects": "Interested subjects",
        "Interested_career_area": "interested career area ",
        "Job_Higher_Studies": "Job/Higher Studies?",
        "Type_of_company_want_to_settle_in": "Type of company want to settle in?",
        "Taken_inputs_from_seniors_or_elders": "Taken inputs from seniors or elders",
        "Interested_in_games": "interested in games",
        "Interested_Type_of_Books": "Interested Type of Books",
        "Salary_Range_Expected": "Salary Range Expected",
        "In_a_Relationship": "In a Realtionship?",
        "Gentle_or_Tuff_behaviour": "Gentle or Tuff behaviour?",
        "Management_or_Technical": "Management or Technical",
        "Salary_work": "Salary/work",
        "Hard_smart_worker": "hard/smart worker",
        "Worked_in_teams_ever": "worked in teams ever?",
        "Introvert": "Introvert"
    }
    
    # Convert frontend field names to CSV column names
    mapped_data = {field_mapping.get(k, k): v for k, v in input_data.items()}
    X_input = pd.DataFrame([mapped_data])
    
    # Separate numerical and categorical
    X_num = scaler.transform(X_input[num_cols])
    X_cat = encoder.transform(X_input[cat_cols])
    
    # Combine
    X_final = np.hstack([X_num, X_cat])
    
    # Get prediction probabilities for all classes
    probabilities = model.predict_proba(X_final)[0]
    
    # Get the class names (career roles)
    classes = model.classes_
    
    # Create a list of (role, probability) tuples
    career_probs = list(zip(classes, probabilities))
    
    # Sort by probability in descending order and get top 3
    top_3 = sorted(career_probs, key=lambda x: x[1], reverse=True)[:3]
    
    # Format the results with confidence scores on a scale of 1-10
    # Strategy: Convert model probabilities (0-1) to confidence scores (1-10)
    # - Higher model probability = higher confidence
def preprocess_input(input_data: dict):
    """
    Preprocess input dict to model-ready numpy array (2D).
    Used for both prediction and XAI.
    """
    # Map frontend field names to CSV column names
    field_mapping = {
        "Acedamic_percentage_in_Operating_Systems": "Acedamic percentage in Operating Systems",
        "Percentage_in_Algorithms": "percentage in Algorithms",
        "Percentage_in_Programming_Concepts": "Percentage in Programming Concepts",
        "Percentage_in_Software_Engineering": "Percentage in Software Engineering",
        "Percentage_in_Computer_Networks": "Percentage in Computer Networks",
        "Percentage_in_Electronics_Subjects": "Percentage in Electronics Subjects",
        "Percentage_in_Computer_Architecture": "Percentage in Computer Architecture",
        "Percentage_in_Mathematics": "Percentage in Mathematics",
        "Percentage_in_Communication_skills": "Percentage in Communication skills",
        "Hours_working_per_day": "Hours working per day",
        "Logical_quotient_rating": "Logical quotient rating",
        "Hackathons": "hackathons",
        "Coding_skills_rating": "coding skills rating",
        "Public_speaking_points": "public speaking points",
        "Can_work_long_time_before_system": "can work long time before system?",
        "Self_learning_capability": "self-learning capability?",
        "Extra_courses_did": "Extra-courses did",
        "Certifications": "certifications",
        "Workshops": "workshops",
        "Talent_tests_taken": "talenttests taken?",
        "Olympiads": "olympiads",
        "Reading_and_writing_skills": "reading and writing skills",
        "Memory_capability_score": "memory capability score",
        "Interested_subjects": "Interested subjects",
        "Interested_career_area": "interested career area ",
        "Job_Higher_Studies": "Job/Higher Studies?",
        "Type_of_company_want_to_settle_in": "Type of company want to settle in?",
        "Taken_inputs_from_seniors_or_elders": "Taken inputs from seniors or elders",
        "Interested_in_games": "interested in games",
        "Interested_Type_of_Books": "Interested Type of Books",
        "Salary_Range_Expected": "Salary Range Expected",
        "In_a_Relationship": "In a Realtionship?",
        "Gentle_or_Tuff_behaviour": "Gentle or Tuff behaviour?",
        "Management_or_Technical": "Management or Technical",
        "Salary_work": "Salary/work",
        "Hard_smart_worker": "hard/smart worker",
        "Worked_in_teams_ever": "worked in teams ever?",
        "Introvert": "Introvert"
    }
    mapped_data = {field_mapping.get(k, k): v for k, v in input_data.items()}
    X_input = pd.DataFrame([mapped_data])
    X_num = scaler.transform(X_input[num_cols])
    X_cat = encoder.transform(X_input[cat_cols])
    X_final = np.hstack([X_num, X_cat])
    return X_final
    # - We'll use a more realistic scale where:
    #   * 0.8-1.0 probability → 8-10 confidence
    #   * 0.5-0.8 probability → 5-8 confidence
    #   * 0.2-0.5 probability → 3-5 confidence
    #   * 0.0-0.2 probability → 1-3 confidence
    
    results = []
    for role, prob in top_3:
        # Convert probability (0-1) to confidence score (1-10)
        # Using a scaled approach: score = 1 + (probability * 9)
        # This maps 0→1 and 1→10
        confidence_score = 1 + (prob * 9)
        
        # Round to 1 decimal place
        confidence_score = round(float(confidence_score), 1)
        
        results.append({
            "role": role,
            "confidence_score": confidence_score
        })
    
    return results
