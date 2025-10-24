# 🏗️ BrightPath Career Recommendation System - Architecture Diagram

## Overview
This document provides comprehensive system architecture diagrams for the BrightPath Career Recommendation System, including component architecture, data flow, deployment architecture, and technology stack.

---

## 1. High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[User Browser]
        B[React/Vite Frontend<br/>Port 5173]
    end
    
    subgraph "API Gateway Layer"
        C[FastAPI Backend<br/>Port 8000]
        D[CORS Middleware]
        E[Static File Server]
    end
    
    subgraph "Application Layer"
        F[Career Prediction<br/>Service]
        G[XAI Explanation<br/>Service]
        H[Career Roadmap<br/>Service]
        I[Career Evolution<br/>Service]
        J[Resume Analysis<br/>Service]
    end
    
    subgraph "ML/AI Layer"
        K[MLPClassifier<br/>Neural Network]
        L[SHAP Explainer<br/>XAI Engine]
        M[Transformer Model<br/>Career Evolution]
        N[NLP Parser<br/>Resume Processing]
    end
    
    subgraph "Data Layer"
        O[Trained Models<br/>.pkl/.h5 files]
        P[Training Dataset<br/>roo.csv]
        Q[Static Assets<br/>SHAP Visualizations]
    end
    
    subgraph "External Services"
        R[Mistral AI API<br/>via OpenRouter]
    end
    
    A -->|HTTP/HTTPS| B
    B -->|REST API Calls| C
    C --> D
    C --> E
    D --> F
    D --> G
    D --> H
    D --> I
    D --> J
    
    F --> K
    G --> L
    H --> R
    I --> M
    J --> N
    
    K --> O
    L --> O
    L --> Q
    M --> O
    N --> O
    
    K --> P
    M --> P
    
    style A fill:#e1f5ff
    style B fill:#bbdefb
    style C fill:#90caf9
    style K fill:#ffccbc
    style L fill:#ffccbc
    style M fill:#ffccbc
    style N fill:#ffccbc
    style R fill:#c8e6c9
```

---

## 2. Detailed Component Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        A1[App.tsx<br/>Main Router]
        A2[LandingPage]
        A3[CareerRecommendation]
        A4[XAIAnalysis]
        A5[CareerRoadmap]
        A6[CareerEvolution]
        A7[ResumeUpload]
        A8[Components<br/>EnhancedRoadmap<br/>SkillGapAnalysis]
    end
    
    subgraph "Backend API Endpoints"
        B1[main.py]
        B2[/predict_top3_careers]
        B3[/xai_explanations/:role]
        B4[/career_roadmap/:role]
        B5[/predict_career_evolution]
        B6[/upload_resume]
        B7[/analyze_resume]
    end
    
    subgraph "Business Logic Modules"
        C1[model.py<br/>ML Predictions]
        C2[xai.py<br/>SHAP Analysis]
        C3[utils.py<br/>Roadmap Gen]
        C4[career_evolution_advanced.py<br/>Transformer Model]
        C5[resume_parser.py<br/>PDF/DOCX Parser]
        C6[resume_analyzer.py<br/>Skill Extraction]
    end
    
    subgraph "Data Models"
        D1[schemas.py<br/>Pydantic Models]
        D2[CareerInput]
        D3[CareerOutput]
        D4[Top3CareerOutput]
        D5[CareerRoadmap]
        D6[CareerEvolutionOutput]
        D7[ResumeAnalysis]
    end
    
    A1 --> A2
    A1 --> A3
    A1 --> A4
    A1 --> A5
    A1 --> A6
    A1 --> A7
    A3 --> A8
    
    A3 -->|API Call| B2
    A4 -->|API Call| B3
    A5 -->|API Call| B4
    A6 -->|API Call| B5
    A7 -->|API Call| B6
    A7 -->|API Call| B7
    
    B1 --> B2
    B1 --> B3
    B1 --> B4
    B1 --> B5
    B1 --> B6
    B1 --> B7
    
    B2 --> C1
    B3 --> C2
    B4 --> C3
    B5 --> C4
    B6 --> C5
    B7 --> C6
    
    B2 --> D2
    B2 --> D4
    B3 --> D2
    B4 --> D5
    B5 --> D6
    B6 --> D7
    
    style A1 fill:#e1bee7
    style B1 fill:#90caf9
    style C1 fill:#ffccbc
    style D1 fill:#fff9c4
```

---

## 3. Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant FastAPI
    participant MLModel
    participant SHAP
    participant MistralAI
    participant Database
    
    User->>Frontend: Enter Career Details (28 Features)
    Frontend->>Frontend: Validate Input
    Frontend->>FastAPI: POST /predict_top3_careers
    FastAPI->>MLModel: Process Input Features
    MLModel->>Database: Load Trained Model (.pkl)
    Database-->>MLModel: Model Weights
    MLModel->>MLModel: Feature Engineering & Scaling
    MLModel->>MLModel: Neural Network Prediction
    MLModel-->>FastAPI: Top 3 Careers + Probabilities
    FastAPI-->>Frontend: JSON Response
    Frontend-->>User: Display Top 3 Recommendations
    
    User->>Frontend: Click "Get XAI" for Career
    Frontend->>FastAPI: POST /xai_explanations/:role
    FastAPI->>SHAP: Initialize TreeExplainer
    SHAP->>MLModel: Analyze Feature Contributions
    SHAP->>SHAP: Calculate SHAP Values
    SHAP->>SHAP: Generate Visualization
    SHAP-->>FastAPI: Feature Importance + Plot URL
    FastAPI-->>Frontend: XAI Results
    Frontend-->>User: Display SHAP Analysis
    
    User->>Frontend: Click "View Roadmap"
    Frontend->>FastAPI: GET /career_roadmap/:role
    FastAPI->>MistralAI: Request Career Roadmap
    MistralAI->>MistralAI: Generate Skills & Certs
    MistralAI-->>FastAPI: Structured Roadmap
    FastAPI-->>Frontend: Roadmap JSON
    Frontend-->>User: Display Roadmap
    
    User->>Frontend: Click "Career Evolution"
    Frontend->>FastAPI: POST /predict_career_evolution
    FastAPI->>MLModel: Predict Current Role
    MLModel-->>FastAPI: Current Role
    FastAPI->>MLModel: Load Transformer Model
    MLModel->>MLModel: Multi-Head Attention Analysis
    MLModel->>MLModel: Predict 3 Future Stages
    MLModel-->>FastAPI: Career Trajectory
    FastAPI-->>Frontend: Evolution Path + Timeframes
    Frontend-->>User: Display Career Path
```

---

## 4. Machine Learning Pipeline

```mermaid
graph TD
    subgraph "Training Phase"
        A[Raw Dataset<br/>roo.csv] --> B[Data Preprocessing]
        B --> C[Feature Engineering]
        C --> D[Handle Class Imbalance<br/>RandomOverSampler]
        D --> E[Train-Test Split<br/>80/20]
        E --> F[Train MLPClassifier<br/>3 Hidden Layers<br/>200-150-100]
        F --> G[Model Evaluation<br/>Accuracy/Precision/Recall]
        G --> H[Save Model<br/>career_model.pkl<br/>label_encoder.pkl<br/>scaler.pkl]
        
        D --> I[Train Career Evolution<br/>Transformer Model]
        I --> J[Multi-Head Attention<br/>Layer]
        J --> K[Save Evolution Model<br/>career_evolution_model.h5]
    end
    
    subgraph "Prediction Phase"
        L[User Input<br/>28 Features] --> M[Load Models]
        H --> M
        K --> M
        M --> N[Feature Scaling<br/>StandardScaler]
        N --> O[Neural Network<br/>Forward Pass]
        O --> P[Softmax Activation]
        P --> Q[Top 3 Predictions<br/>with Probabilities]
        
        Q --> R[SHAP Analysis]
        R --> S[Feature Importance<br/>Waterfall Plot]
        
        Q --> T[Career Evolution]
        T --> U[Transformer Prediction]
        U --> V[Future Career Path<br/>3 Stages]
    end
    
    style A fill:#fff9c4
    style H fill:#c8e6c9
    style K fill:#c8e6c9
    style Q fill:#bbdefb
    style V fill:#f8bbd0
```

---

## 5. Technology Stack Diagram

```mermaid
graph TB
    subgraph "Frontend Stack"
        F1[React 18<br/>Component Library]
        F2[TypeScript<br/>Type Safety]
        F3[Vite<br/>Build Tool]
        F4[Tailwind CSS<br/>Styling]
        F5[Axios<br/>HTTP Client]
        F6[React Router<br/>Navigation]
    end
    
    subgraph "Backend Stack"
        B1[FastAPI<br/>Web Framework]
        B2[Python 3.9+<br/>Language]
        B3[Uvicorn<br/>ASGI Server]
        B4[Pydantic v2<br/>Validation]
    end
    
    subgraph "ML/AI Stack"
        M1[scikit-learn<br/>ML Framework]
        M2[TensorFlow/Keras<br/>Deep Learning]
        M3[SHAP<br/>Explainable AI]
        M4[imbalanced-learn<br/>Data Balancing]
        M5[pandas/numpy<br/>Data Processing]
    end
    
    subgraph "Visualization & NLP"
        V1[matplotlib<br/>Plotting]
        V2[seaborn<br/>Statistical Viz]
        V3[spaCy/NLTK<br/>NLP Processing]
        V4[PyPDF2/python-docx<br/>Document Parsing]
    end
    
    subgraph "External APIs"
        E1[Mistral AI<br/>LLM]
        E2[OpenRouter<br/>API Gateway]
    end
    
    F1 --> F3
    F2 --> F3
    F4 --> F3
    F5 --> F1
    F6 --> F1
    
    B1 --> B3
    B2 --> B1
    B4 --> B1
    
    M1 --> B1
    M2 --> B1
    M3 --> B1
    M4 --> M1
    M5 --> M1
    
    V1 --> M3
    V2 --> M1
    V3 --> B1
    V4 --> B1
    
    E1 --> E2
    E2 --> B1
    
    F3 -.->|REST API| B1
    
    style F1 fill:#61dafb
    style B1 fill:#009688
    style M1 fill:#ff6f00
    style E1 fill:#7c4dff
```

---

## 6. Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        D1[Local Machine<br/>Windows/Linux/Mac]
        D2[Git Bash Terminal]
        D3[VS Code IDE]
    end
    
    subgraph "Backend Server"
        B1[Uvicorn Server<br/>0.0.0.0:8000]
        B2[Virtual Environment<br/>venv/]
        B3[Python Dependencies<br/>requirements.txt]
        B4[Backend Scripts<br/>start_backend.sh/.bat]
    end
    
    subgraph "Frontend Server"
        F1[Vite Dev Server<br/>localhost:5173]
        F2[Node Modules<br/>node_modules/]
        F3[NPM Dependencies<br/>package.json]
        F4[Frontend Scripts<br/>start_frontend.sh/.bat]
    end
    
    subgraph "Data & Models"
        M1[Trained Models<br/>backend/]
        M2[Dataset Files<br/>backend/data/]
        M3[Static Files<br/>backend/static/]
    end
    
    subgraph "Network Layer"
        N1[HTTP Protocol]
        N2[CORS Enabled<br/>Cross-Origin]
        N3[REST API<br/>JSON Payloads]
    end
    
    D1 --> D2
    D1 --> D3
    D2 --> B4
    D2 --> F4
    
    B4 --> B2
    B2 --> B3
    B3 --> B1
    B1 --> M1
    B1 --> M2
    B1 --> M3
    
    F4 --> F2
    F2 --> F3
    F3 --> F1
    
    F1 -.->|Proxy| N1
    N1 --> N2
    N2 --> N3
    N3 --> B1
    
    style D1 fill:#e1f5ff
    style B1 fill:#a5d6a7
    style F1 fill:#ffccbc
    style M1 fill:#fff9c4
```

---

## 7. API Endpoint Architecture

```mermaid
graph LR
    subgraph "API Routes"
        A[FastAPI App]
    end
    
    subgraph "Core Endpoints"
        B1[GET /<br/>Health Check]
        B2[POST /predict_top3_careers<br/>Career Recommendations]
        B3[POST /xai_explanations/:role<br/>SHAP Analysis]
        B4[GET /career_roadmap/:role<br/>Skill Roadmap]
        B5[POST /predict_career_evolution<br/>Career Trajectory]
    end
    
    subgraph "Resume Endpoints"
        C1[POST /upload_resume<br/>File Upload]
        C2[POST /analyze_resume<br/>Skill Extraction]
        C3[POST /resume_career_match<br/>Match Score]
    end
    
    subgraph "Static Endpoints"
        D1[GET /static/*<br/>SHAP Visualizations]
    end
    
    subgraph "Request/Response Models"
        E1[CareerInput<br/>28 Features]
        E2[Top3CareerOutput<br/>3 Predictions]
        E3[XAIExplanation<br/>Feature Importance]
        E4[CareerRoadmap<br/>Skills/Certs]
        E5[CareerEvolutionOutput<br/>Future Path]
        E6[ResumeAnalysis<br/>Extracted Data]
    end
    
    A --> B1
    A --> B2
    A --> B3
    A --> B4
    A --> B5
    A --> C1
    A --> C2
    A --> C3
    A --> D1
    
    B2 --> E1
    B2 --> E2
    B3 --> E1
    B3 --> E3
    B4 --> E4
    B5 --> E5
    C2 --> E6
    
    style A fill:#4caf50
    style B2 fill:#2196f3
    style B3 fill:#ff9800
    style B5 fill:#9c27b0
    style C1 fill:#00bcd4
```

---

## 8. Security & Middleware Layer

```mermaid
graph TB
    subgraph "Request Flow"
        A[Client Request]
    end
    
    subgraph "Middleware Stack"
        B1[CORS Middleware<br/>Allow All Origins]
        B2[Request Validation<br/>Pydantic Schemas]
        B3[Error Handling<br/>Try-Catch Blocks]
        B4[Logging Middleware<br/>Request/Response Logs]
    end
    
    subgraph "Security Measures"
        C1[Input Sanitization]
        C2[Type Validation]
        C3[File Upload Limits]
        C4[Error Message Filtering]
    end
    
    subgraph "Response Layer"
        D1[JSON Response]
        D2[HTTP Status Codes]
        D3[Error Details]
    end
    
    A --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    
    B2 --> C1
    B2 --> C2
    B4 --> C3
    B3 --> C4
    
    B4 --> D1
    D1 --> D2
    D1 --> D3
    
    style A fill:#e3f2fd
    style B1 fill:#ffccbc
    style C1 fill:#fff9c4
    style D1 fill:#c8e6c9
```

---

## 9. Feature Engineering Pipeline

```mermaid
graph LR
    subgraph "Input Features (28)"
        A1[Academic Scores<br/>9 subjects]
        A2[Performance Metrics<br/>5 indicators]
        A3[Categorical Features<br/>14 attributes]
    end
    
    subgraph "Preprocessing"
        B1[Label Encoding<br/>Binary Features]
        B2[One-Hot Encoding<br/>Multi-class Features]
        B3[Standard Scaling<br/>Numerical Features]
        B4[Feature Selection<br/>Correlation Analysis]
    end
    
    subgraph "Feature Matrix"
        C1[Processed Features<br/>~40 dimensions]
    end
    
    subgraph "Model Input"
        D1[Neural Network<br/>Input Layer]
    end
    
    A1 --> B3
    A2 --> B3
    A3 --> B1
    A3 --> B2
    
    B1 --> C1
    B2 --> C1
    B3 --> C1
    B4 --> C1
    
    C1 --> D1
    
    style A1 fill:#bbdefb
    style B1 fill:#ffccbc
    style C1 fill:#c8e6c9
    style D1 fill:#f8bbd0
```

---

## 10. System Integration Overview

```mermaid
graph TB
    A[User Interface Layer] --> B[API Gateway Layer]
    B --> C[Application Service Layer]
    C --> D[Business Logic Layer]
    D --> E[Data Access Layer]
    D --> F[ML/AI Engine Layer]
    D --> G[External API Layer]
    
    subgraph "Horizontal Concerns"
        H1[Logging & Monitoring]
        H2[Error Handling]
        H3[Security & Validation]
        H4[Caching Strategy]
    end
    
    B -.-> H1
    C -.-> H2
    D -.-> H3
    E -.-> H4
    
    style A fill:#e1bee7
    style B fill:#90caf9
    style D fill:#ffccbc
    style F fill:#a5d6a7
    style H3 fill:#fff9c4
```

---

## Key Features Highlighted

### 🎯 Core Capabilities
- **Career Prediction**: ML-powered top 3 career recommendations with confidence scores
- **Explainable AI**: SHAP-based feature importance visualization
- **Career Evolution**: Transformer-based career trajectory prediction (3 future stages)
- **Career Roadmap**: AI-generated skills, certifications, and project suggestions
- **Resume Analysis**: Automated resume parsing and skill extraction

### 🔧 Technical Highlights
- **Neural Network**: 3-layer MLP (200-150-100 neurons) with ReLU activation
- **Transformer Model**: Multi-head attention for career evolution
- **SHAP Integration**: TreeExplainer for interpretable predictions
- **Data Balancing**: RandomOverSampler to handle class imbalance
- **RESTful API**: FastAPI with Pydantic validation
- **Modern Frontend**: React + TypeScript + Vite + Tailwind CSS

### 📊 Data Processing
- **Input Features**: 28 features across academic, skill, and personality domains
- **Output Classes**: 17+ career categories
- **Training Dataset**: roo.csv with balanced sampling
- **Feature Engineering**: Label encoding, one-hot encoding, standard scaling

---

## How to Use This Document

1. **For Developers**: Reference the component and data flow diagrams for implementation
2. **For Architects**: Use the high-level and deployment diagrams for system design
3. **For Stakeholders**: Focus on the overview and technology stack diagrams
4. **For ML Engineers**: Study the ML pipeline and feature engineering diagrams

---

## Document Information
- **Created**: 2025
- **Version**: 1.0
- **Project**: BrightPath Career Recommendation System
- **Diagram Format**: Mermaid (Markdown-compatible)

To view these diagrams:
1. Open this file in GitHub (automatic rendering)
2. Use VS Code with Mermaid preview extension
3. Use online Mermaid editors (mermaid.live)
4. Use markdown editors that support Mermaid (Obsidian, Notion, etc.)
