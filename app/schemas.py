# app/schemas.py

from pydantic import BaseModel

class CareerInput(BaseModel):
    # Numerical Features - using underscore names that frontend sends
    Acedamic_percentage_in_Operating_Systems: float
    Percentage_in_Algorithms: float
    Percentage_in_Programming_Concepts: float
    Percentage_in_Software_Engineering: float
    Percentage_in_Computer_Networks: float
    Percentage_in_Electronics_Subjects: float
    Percentage_in_Computer_Architecture: float
    Percentage_in_Mathematics: float
    Percentage_in_Communication_skills: float
    Hours_working_per_day: float
    Logical_quotient_rating: float
    Hackathons: int
    Coding_skills_rating: float
    Public_speaking_points: float

    # Categorical Features - using underscore names that frontend sends
    Can_work_long_time_before_system: str
    Self_learning_capability: str
    Extra_courses_did: str
    Certifications: str
    Workshops: str
    Reading_and_writing_skills: str
    Memory_capability_score: str
    Interested_subjects: str
    Interested_career_area: str
    Job_Higher_Studies: str
    Type_of_company_want_to_settle_in: str
    Management_or_Technical: str
    Hard_smart_worker: str
    Worked_in_teams_ever: str
    
    # Note: Removed columns that are no longer in the dataset:
    # - In_a_Realtionship
    # - Interested_Type_of_Books
    # - Interested_in_games
    # - Gentle_or_Tuff_behaviour
    # - Taken_inputs_from_seniors_or_elders
    # - Salary_Range_Expected
    # - Salary_work
    # - Olympiads
    # - Talenttests_taken
    # - Introvert

class CareerOutput(BaseModel):
    predicted_role: str

class CareerPrediction(BaseModel):
    role: str
    confidence_score: float  # Confidence score on a scale of 1-10

class Top3CareerOutput(BaseModel):
    top_predictions: list[CareerPrediction]

class CareerRoadmap(BaseModel):
    role: str
    skills: list[str]
    certifications: list[str]
    projects: list[str]
