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

# Shared field mapping (removed 10 unnecessary columns)
FIELD_MAPPING = {
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
    "Reading_and_writing_skills": "reading and writing skills",
    "Memory_capability_score": "memory capability score",
    "Interested_subjects": "Interested subjects",
    "Interested_career_area": "interested career area ",
    "Job_Higher_Studies": "Job/Higher Studies?",
    "Type_of_company_want_to_settle_in": "Type of company want to settle in?",
    "Management_or_Technical": "Management or Technical",
    "Hard_smart_worker": "hard/smart worker",
    "Worked_in_teams_ever": "worked in teams ever?"
}

def predict_career(input_data: dict):
    # Convert input to DataFrame
    import pandas as pd
    
    # Convert frontend field names to CSV column names
    mapped_data = {FIELD_MAPPING.get(k, k): v for k, v in input_data.items()}
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
    # Convert frontend field names to CSV column names
    mapped_data = {FIELD_MAPPING.get(k, k): v for k, v in input_data.items()}
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
    results = []
    for role, prob in top_3:
        # Convert probability (0-1) to confidence score (1-10)
        confidence_score = 1 + (prob * 9)
        confidence_score = round(float(confidence_score), 1)
        results.append({
            "role": role,
            "confidence_score": confidence_score
        })
    return results
