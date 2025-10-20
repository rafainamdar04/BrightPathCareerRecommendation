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
    Talent_tests_taken: str
    Olympiads: str
    Reading_and_writing_skills: str
    Memory_capability_score: str
    Interested_subjects: str
    Interested_career_area: str
    Job_Higher_Studies: str
    Type_of_company_want_to_settle_in: str
    Taken_inputs_from_seniors_or_elders: str
    Interested_in_games: str
    Interested_Type_of_Books: str
    Salary_Range_Expected: str
    In_a_Relationship: str
    Gentle_or_Tuff_behaviour: str
    Management_or_Technical: str
    Salary_work: str
    Hard_smart_worker: str
    Worked_in_teams_ever: str
    Introvert: str

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
