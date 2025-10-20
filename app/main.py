# app/main.py

from fastapi import FastAPI, HTTPException
from app.schemas import CareerInput, CareerOutput, Top3CareerOutput, CareerRoadmap
from fastapi import Body
from app.model import predict_career, predict_top3_careers
from app.model import preprocess_input
from app.utils import get_career_roadmap
from fastapi.middleware.cors import CORSMiddleware

from app.xai import explain_prediction
from fastapi.responses import JSONResponse

app = FastAPI(title="Career Prediction API")

# Allow all origins (for local testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Career Prediction API Running!"}


@app.post("/predict_top3_careers", response_model=Top3CareerOutput)
def predict_top3(input_data: CareerInput):
    # Get the data as dict - field names will match the schema (with underscores)
    input_dict = input_data.model_dump()
    top_3_predictions = predict_top3_careers(input_dict)
    return {"top_predictions": top_3_predictions}


# New XAI endpoint: expects {"role": ..., ...input fields...}

from fastapi import Request, Path


# Now: role is a path parameter, input is body (CareerInput)

from fastapi import Query

@app.post("/xai_explanations/{role}")
def xai_explanations(
    input_data: CareerInput,
    role: str = Path(..., description="Career role to explain"),
    generate_visualization: bool = Query(False, description="Generate SHAP visualization plot")
):
    """
    Generate XAI (SHAP-based) feature importance insights for the given user input and a specific predicted career.
    Path parameter: role (string)
    Body: CareerInput fields
    Query: generate_visualization (bool)
    """
    input_dict = input_data.model_dump()
    xai_result = explain_prediction(input_dict, career=role, generate_visualization=generate_visualization)
    return JSONResponse(content=xai_result)
@app.get("/career_roadmap/{role}", response_model=CareerRoadmap)
def get_roadmap(role: str):
    """
    Get the career roadmap (skills, certifications, projects) for a specific role using Mistral 7B API (placeholder).
    """
    import urllib.parse
    decoded_role = urllib.parse.unquote(role)
    try:
        roadmap_data = get_career_roadmap(decoded_role)
        return {
            "role": decoded_role,
            "skills": roadmap_data.get("skills", []),
            "certifications": roadmap_data.get("certifications", []),
            "projects": roadmap_data.get("projects", [])
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": str(e)
            }
        )
