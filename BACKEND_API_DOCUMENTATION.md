# Backend API Endpoints Documentation

## Base URL
`http://127.0.0.1:8000`

---

## 1. Core Career Prediction Endpoints

### 1.1 Get Top 3 Career Predictions
**Endpoint:** `POST /predict_top3_careers`

**Input (CareerInput):**
```json
{
  "Acedamic_percentage_in_Operating_Systems": 88.0,
  "Percentage_in_Algorithms": 90.0,
  "Percentage_in_Programming_Concepts": 92.0,
  "Percentage_in_Software_Engineering": 87.0,
  "Percentage_in_Computer_Networks": 85.0,
  "Percentage_in_Electronics_Subjects": 78.0,
  "Percentage_in_Computer_Architecture": 84.0,
  "Percentage_in_Mathematics": 89.0,
  "Percentage_in_Communication_skills": 82.0,
  "Hours_working_per_day": 6.0,
  "Logical_quotient_rating": 8.0,
  "Hackathons": 5,
  "Coding_skills_rating": 9.0,
  "Public_speaking_points": 7.0,
  "Can_work_long_time_before_system": "yes",
  "Self_learning_capability": "yes",
  "Extra_courses_did": "yes",
  "Certifications": "app development",
  "Workshops": "data science",
  "Reading_and_writing_skills": "excellent",
  "Memory_capability_score": "excellent",
  "Interested_subjects": "programming",
  "Interested_career_area": "software developer",
  "Job_Higher_Studies": "Job",
  "Type_of_company_want_to_settle_in": "product development",
  "Management_or_Technical": "Technical",
  "Hard_smart_worker": "smart worker",
  "Worked_in_teams_ever": "yes"
}
```

**Output:**
```json
{
  "top_predictions": [
    {
      "role": "Applications Developer",
      "confidence_score": 9.9
    },
    {
      "role": "Software Developer",
      "confidence_score": 2.1
    },
    {
      "role": "Systems Analyst",
      "confidence_score": 1.5
    }
  ]
}
```

---

### 1.2 Career Evolution/Progression
**Endpoint:** `POST /predict_career_evolution`

**Query Parameters:**
- `role` (optional): Override the starting role

**Input:** Same as CareerInput (above)

**Output:**
```json
{
  "current_role": "Applications Developer",
  "future_roles": [
    {
      "role": "Senior Applications Developer",
      "timeframe": "2-3 years",
      "confidence": 0.85
    },
    {
      "role": "Lead Developer",
      "timeframe": "5-7 years",
      "confidence": 0.72
    },
    {
      "role": "Engineering Manager",
      "timeframe": "8-10 years",
      "confidence": 0.65
    }
  ],
  "trajectory_description": "Starting as Applications Developer, you can progress to Senior Applications Developer (2-3 years), then Lead Developer (5-7 years), and eventually Engineering Manager (8-10 years).",
  "skills_to_develop": ["leadership", "system design", "project management"],
  "milestones": [
    {
      "year": 2,
      "role": "Senior Applications Developer",
      "salary_range": "$80,000 - $100,000"
    }
  ],
  "success_factors": ["continuous learning", "networking", "building portfolio"]
}
```

---

## 2. XAI (Explainable AI) Endpoints

### 2.1 XAI Feature Importance Explanations
**Endpoint:** `POST /xai_explanations/{role}`

**Path Parameter:**
- `role`: Career role to explain (e.g., "Applications Developer")

**Query Parameters:**
- `generate_visualization`: boolean (default: true)

**Input:** Same as CareerInput

**Output:**
```json
{
  "career": "Applications Developer",
  "top_features": [
    {
      "feature": "Percentage in Programming Concepts",
      "impact": "positive",
      "contribution": 0.150,
      "insight": "Strong programming foundation"
    }
  ],
  "top_factors": [...],  // Same as top_features (backward compatibility)
  "summary": "Your profile strongly matches Applications Developer...",
  "shap_values": {
    "Percentage in Programming Concepts": 0.150,
    "certifications_app development": 0.120
  },
  "feature_contributions": {...},
  "lime_explanation": ["Text explanations..."],  // Legacy SHAP-based
  "confidence": {
    "confidence_score": 0.9999,
    "confidence_level": "Very High",
    "probability_distribution": [
      {"role": "Applications Developer", "probability": 0.9999},
      {"role": "Software Developer", "probability": 0.0001}
    ]
  },
  "prediction_confidence": 0.9999,
  "confidence_level": "Very High",
  "probability_distribution": [...],
  "improvement_recommendations": [
    {
      "area": "Software Engineering",
      "priority": "High",
      "action": "Enroll in course...",
      "resources": ["Coursera", "Udemy"],
      "timeline": "3-6 months"
    }
  ],
  "lime_explanations": {
    "method": "LIME",
    "target_class": "Applications Developer",
    "prediction_probability": 0.9999,
    "explanations": [
      {
        "feature": "certifications_full stack",
        "condition": "certifications_full stack <= 0.00",
        "weight": 0.0157,
        "impact": "positive"
      }
    ]
  },
  "visualization": "/static/shap_Applications_Developer.png",
  "visualization_waterfall": "/static/shap_waterfall_Applications_Developer.png",
  "visualization_beeswarm": "/static/shap_beeswarm_Applications_Developer.png"
}
```

---

### 2.2 Counterfactual Analysis (Career Transition)
**Endpoint:** `POST /xai_counterfactual/{target_role}`

**Path Parameter:**
- `target_role`: Target career (e.g., "Database Developer")

**Query Parameters:**
- `max_changes`: int (default: 3) - Maximum feature changes to suggest

**Input:** Same as CareerInput

**Output:**
```json
{
  "current_prediction": "Applications Developer",
  "current_role": "Applications Developer",
  "target_role": "Database Developer",
  "current_probability": 1.0,
  "counterfactual_probability": 0.0,
  "changes_needed": [
    {
      "feature": "Certifications",
      "current_value": "app development",
      "impact_difference": -0.125,
      "direction": "change",
      "suggestion": "Change or improve Certifications - current focus less aligned with Database Developer"
    }
  ],
  "feasibility": "Moderate",
  "summary": "To transition from Applications Developer to Database Developer, focus on 3 key areas...",
  "transition_plan": {
    "difficulty": "Moderate",
    "estimated_timeline": "9-18 months",
    "short_term_actions": [
      "Enroll in database certification course",
      "Practice SQL fundamentals"
    ],
    "long_term_goals": [
      "Gain 2+ years database experience",
      "Lead database architecture project"
    ],
    "key_challenges": ["Limited database experience"],
    "recommended_resources": ["Oracle Database Course", "PostgreSQL Tutorial"]
  }
}
```

---

### 2.3 Compare Two Roles
**Endpoint:** `POST /xai_compare_roles`

**Query Parameters:**
- `role_a`: First role to compare
- `role_b`: Second role to compare

**Input:** Same as CareerInput

**Output:**
```json
{
  "role_a": "Applications Developer",
  "role_b": "Database Developer",
  "shap_comparison": {
    "role_a_features": [...],
    "role_b_features": [...]
  }
}
```

---

## 3. Career Planning Endpoints

### 3.1 Career Roadmap
**Endpoint:** `GET /career_roadmap/{role}`

**Path Parameter:**
- `role`: Career role (e.g., "Software Developer")

**Output:**
```json
{
  "role": "Software Developer",
  "skills": [
    "Programming (Python/Java)",
    "Data Structures & Algorithms",
    "Version Control (Git)"
  ],
  "certifications": [
    "AWS Certified Developer",
    "Microsoft Certified: Azure Developer"
  ],
  "project_ideas": [
    "Full-Stack Web Application",
    "Microservices Architecture"
  ],
  "learning_resources": [
    "Coursera - Software Development",
    "Udemy - Advanced Programming"
  ],
  "timeline": "6-12 months to job-ready"
}
```

---

## 4. Model Information Endpoints

### 4.1 Model Architecture
**Endpoint:** `GET /model_architecture`

**Output:**
```json
{
  "model_type": "MLPClassifier",
  "layers": [...],
  "total_parameters": 150000,
  "input_features": 28,
  "output_classes": 17
}
```

### 4.2 Model Architecture Visualization
**Endpoint:** `GET /model_architecture/visualization`

**Output:**
```json
{
  "visualization_url": "/static/model_architecture.png"
}
```

---

## 5. Resume Analysis Endpoints

### 5.1 Upload Resume
**Endpoint:** `POST /upload_resume`

**Input:** 
- Form data with file upload (PDF/DOCX)
- Field: `file`

**Output:**
```json
{
  "message": "Resume uploaded successfully",
  "filename": "resume.pdf",
  "text_preview": "First 500 chars of extracted text..."
}
```

---

### 5.2 Analyze Resume for Role
**Endpoint:** `POST /analyze_resume_for_role`

**Input:**
- Form data:
  - `file`: Resume file (PDF/DOCX)
  - `target_career`: Career role to analyze for

**Output:**
```json
{
  "target_career": "Software Developer",
  "career_fit_score": 75.5,
  "matching_keywords": ["python", "javascript", "react"],
  "missing_keywords": ["kubernetes", "docker", "microservices"],
  "section_analysis": {
    "skills": 80.0,
    "experience": 70.0,
    "education": 85.0,
    "projects": 60.0
  },
  "feedback": [
    "Good fit for Software Developer.",
    "Add 2-3 relevant projects to demonstrate hands-on experience.",
    "Add these key skills: kubernetes, docker, microservices"
  ],
  "improvement_suggestions": [
    "Focus on cloud technologies",
    "Build portfolio projects"
  ]
}
```

---

### 5.3 Compare Resume with Roadmap
**Endpoint:** `POST /compare_resume_with_roadmap`

**Input:**
- Form data:
  - `file`: Resume file
  - `target_career`: Career role

**Output:**
```json
{
  "target_career": "Software Developer",
  "roadmap": {
    "skills": ["Python", "Java", "Git"],
    "certifications": ["AWS", "Azure"]
  },
  "resume_coverage": {
    "matched_skills": ["Python", "Git"],
    "missing_skills": ["Java"],
    "matched_certifications": [],
    "missing_certifications": ["AWS", "Azure"]
  },
  "gap_analysis": {
    "skill_gaps": ["Java"],
    "certification_gaps": ["AWS", "Azure"],
    "priority_actions": [
      "Learn Java programming",
      "Get AWS certification"
    ]
  },
  "readiness_score": 65.0,
  "recommendations": [
    "Focus on missing skills first",
    "Consider AWS certification within 3 months"
  ]
}
```

---

### 5.4 Full Resume Analysis
**Endpoint:** `POST /api/analyze_resume`

**Input:**
- Form data:
  - `file`: Resume file
  - `targetRole`: Target career role

**Output:**
```json
{
  "careerFit": 75.5,
  "matchingKeywords": ["python", "react"],
  "missingKeywords": ["docker", "kubernetes"],
  "sectionScores": {
    "skills": 80,
    "experience": 70,
    "education": 85,
    "projects": 60
  },
  "feedback": ["Good fit...", "Add more projects..."],
  "improvementSuggestions": ["Focus on cloud tech..."],
  "skillGaps": ["docker", "kubernetes"],
  "strengths": ["python", "react"],
  "recommendedCourses": ["Docker Mastery", "Kubernetes Basics"],
  "estimatedReadiness": 70
}
```

---

### 5.5 Download Resume Report
**Endpoint:** `POST /api/analyze_resume/download_report`

**Input:**
- Form data:
  - `file`: Resume file
  - `targetRole`: Target career role

**Output:**
- PDF file download with analysis report

---

## Frontend Integration Requirements

### 1. Form Input Fields
The frontend form must collect all 28 fields matching the CareerInput schema:
- Numerical fields (float): All percentage fields, hours, ratings
- Integer fields: Hackathons
- String/Select fields: All categorical fields (yes/no, certifications, workshops, etc.)

### 2. API Call Flow
```
User fills form → 
  POST /predict_top3_careers → 
  User selects career →
  POST /predict_career_evolution?role={selected} →
  GET /career_roadmap/{selected} →
  POST /xai_explanations/{selected} →
  POST /xai_counterfactual/{alternate_career}
```

### 3. Field Name Mapping
Frontend should use the exact field names as specified in CareerInput schema with underscores.

### 4. Response Handling
- Parse `top_predictions` array for career options
- Display confidence scores as percentages (multiply by 10)
- Show SHAP and LIME explanations separately
- Handle improvement recommendations as structured objects
- Display visualizations using returned image paths

### 5. Error Handling
All endpoints return errors in format:
```json
{
  "detail": "Error message or error object"
}
```
