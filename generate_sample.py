import pandas as pd
import json

df = pd.read_csv('data/roo.csv')
# Get first row as sample
sample_row = df.iloc[0]

# Create request body matching the schema
request_body = {
    "Acedamic_percentage_in_Operating_Systems": float(sample_row["Acedamic percentage in Operating Systems"]),
    "Percentage_in_Algorithms": float(sample_row["percentage in Algorithms"]),
    "Percentage_in_Programming_Concepts": float(sample_row["Percentage in Programming Concepts"]),
    "Percentage_in_Software_Engineering": float(sample_row["Percentage in Software Engineering"]),
    "Percentage_in_Computer_Networks": float(sample_row["Percentage in Computer Networks"]),
    "Percentage_in_Electronics_Subjects": float(sample_row["Percentage in Electronics Subjects"]),
    "Percentage_in_Computer_Architecture": float(sample_row["Percentage in Computer Architecture"]),
    "Percentage_in_Mathematics": float(sample_row["Percentage in Mathematics"]),
    "Percentage_in_Communication_skills": float(sample_row["Percentage in Communication skills"]),
    "Hours_working_per_day": float(sample_row["Hours working per day"]),
    "Logical_quotient_rating": float(sample_row["Logical quotient rating"]),
    "Hackathons": int(sample_row["hackathons"]),
    "Coding_skills_rating": float(sample_row["coding skills rating"]),
    "Public_speaking_points": float(sample_row["public speaking points"]),
    "Can_work_long_time_before_system": str(sample_row["can work long time before system?"]),
    "Self_learning_capability": str(sample_row["self-learning capability?"]),
    "Extra_courses_did": str(sample_row["Extra-courses did"]),
    "Certifications": str(sample_row["certifications"]),
    "Workshops": str(sample_row["workshops"]),
    "Reading_and_writing_skills": str(sample_row["reading and writing skills"]),
    "Memory_capability_score": str(sample_row["memory capability score"]),
    "Interested_subjects": str(sample_row["Interested subjects"]),
    "Interested_career_area": str(sample_row["interested career area"]),
    "Job_Higher_Studies": str(sample_row["Job/Higher Studies?"]),
    "Type_of_company_want_to_settle_in": str(sample_row["Type of company want to settle in?"]),
    "Management_or_Technical": str(sample_row["Management or Technical"]),
    "Hard_smart_worker": str(sample_row["hard/smart worker"]),
    "Worked_in_teams_ever": str(sample_row["worked in teams ever?"])
}

print("Sample Request Body:")
print("=" * 60)
print(json.dumps(request_body, indent=2))
print("\n" + "=" * 60)
print(f"Total fields: {len(request_body)}")
print(f"Target role was: {sample_row['Suggested Job Role']}")
