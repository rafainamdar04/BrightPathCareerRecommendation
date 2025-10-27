# BrightPath Career Recommendation System
## Architecture Diagrams for Academic Publication

This document contains all system architecture diagrams designed for academic papers and technical documentation.

---

## Diagram Index

### 1. System Architecture (`01_system_architecture.mmd`)
High-level system architecture showing all layers and components.

### 2. Data Flow Diagram (`02_data_flow.mmd`)
End-to-end data flow from user input to system output.

### 3. Career Prediction Sequence (`03_sequence_career_prediction.mmd`)
Detailed sequence diagram for career prediction and XAI analysis.

### 4. Career Evolution Sequence (`04_sequence_career_evolution.mmd`)
AI-powered career trajectory prediction workflow.

### 5. Resume Analysis Sequence (`05_sequence_resume_analysis.mmd`)
NLP-based resume parsing and gap analysis flow.

### 6. Component Interaction (`06_component_interaction.mmd`)
How major system components interact with each other.

### 7. ML Pipeline Architecture (`07_ml_pipeline.mmd`)
Detailed machine learning pipeline from input to output.

### 8. XAI Explainability Pipeline (`08_xai_pipeline.mmd`)
SHAP-based explainability generation process.

---

## Figure Captions for Papers

### Figure 1: System Architecture
**Caption:** High-level architecture of the BrightPath Career Recommendation System. The system follows a layered architecture with clear separation between client, API gateway, application services, and data layers. The application services layer contains three main service groups: Machine Learning Services (career prediction and evolution), AI Services (explainability and roadmap generation), and NLP Services (resume parsing and analysis).

### Figure 2: Data Flow Diagram
**Caption:** End-to-end data flow in BrightPath. User input from profile forms and resume uploads flows through preprocessing layers (feature engineering and NLP processing) to ML/AI models (Random Forest, Transformer, SHAP, and SBERT), producing predictions, career trajectories, explanations, and skill gap analyses.

### Figure 3: Career Prediction Sequence
**Caption:** Sequence diagram showing the career prediction workflow. The process involves 28 user-provided features being validated, encoded, scaled, and fed to a Random Forest classifier to predict the top 3 career recommendations. Subsequently, SHAP analysis generates feature importance explanations.

### Figure 4: Career Evolution Sequence
**Caption:** AI-powered career evolution prediction workflow. The system uses a Transformer model with multi-head attention to predict the next 3 career stages, followed by a time prediction model that personalizes the timeframe estimates based on the user's complete profile.

### Figure 5: Resume Analysis Sequence
**Caption:** Resume analysis and skill gap detection workflow. The system parses uploaded resumes using spaCy NLP to extract entities, skills, education, and experience. SBERT embeddings enable semantic similarity matching against target role requirements to generate gap analysis and recommendations.

### Figure 6: Component Interaction
**Caption:** Component interaction diagram showing how frontend components (pages, forms, display) communicate with backend services (career prediction, evolution, XAI explanation, roadmap, resume) through the FastAPI router, with services accessing the model layer and data layer as needed.

### Figure 7: ML Pipeline Architecture
**Caption:** Detailed machine learning pipeline architecture. Input features are split into categorical and numerical types, processed through label encoding and standard scaling respectively, then fed to the primary Random Forest model (34 career classes), Transformer evolution model, and time prediction neural network. Post-processing includes Top-K selection and confidence scoring.

### Figure 8: XAI Explainability Pipeline
**Caption:** SHAP-based explainability generation pipeline. The process initializes SHAP TreeExplainer with a background dataset, calculates SHAP values for both global feature importance and local predictions, generates visualizations (waterfall, force, and summary plots), and produces natural language explanations of top contributing factors.

---

## Technical Specifications

### System Components

**Frontend:**
- Framework: React 18 with TypeScript
- Build Tool: Vite
- Port: 5173
- Styling: TailwindCSS

**Backend:**
- Framework: FastAPI (Python 3.10+)
- Server: Uvicorn
- Port: 8000
- API Documentation: OpenAPI/Swagger

**Machine Learning:**
- Career Prediction: Random Forest (100 estimators, max_depth=20)
- Career Evolution: Transformer with Multi-Head Attention (hidden=128)
- Fallback Model: LSTM (hidden=64, 2 layers)
- Time Prediction: Dense Neural Network (64→32→1)

**Natural Language Processing:**
- Text Processing: spaCy (English pipeline)
- Semantic Analysis: Sentence-BERT (all-MiniLM-L6-v2)
- Entity Extraction: Named Entity Recognition (NER)
- Skill Matching: Cosine similarity on embeddings

**Explainability:**
- Method: SHAP (SHapley Additive exPlanations)
- Explainer: TreeExplainer for Random Forest
- Visualizations: Waterfall, Force, Summary plots

### Dataset Characteristics

**Features:** 28 attributes
- Categorical: 14 (work preferences, skills, interests)
- Numerical: 14 (academic scores, ratings, hours)

**Target:** 34 career classes

**Size:** Training dataset with balanced class distribution

### Key Algorithms

1. **Career Prediction:** Random Forest Classification
2. **Career Evolution:** Transformer with Multi-Head Attention
3. **Explainability:** SHAP TreeExplainer
4. **Resume Matching:** SBERT Cosine Similarity
5. **Time Prediction:** Dense Neural Network with ReLU activation

---

## Rendering Instructions

### For LaTeX Papers

1. Export diagrams as PNG or SVG:
```bash
mmdc -i 01_system_architecture.mmd -o 01_system_architecture.png
mmdc -i 01_system_architecture.mmd -o 01_system_architecture.svg
```

2. Include in LaTeX:
```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.9\textwidth]{figures/01_system_architecture.png}
  \caption{High-level architecture of the BrightPath Career Recommendation System.}
  \label{fig:system_architecture}
\end{figure}
```

### For Word Documents

1. Export as high-resolution PNG (300 DPI):
```bash
mmdc -i 01_system_architecture.mmd -o 01_system_architecture.png -w 3000
```

2. Insert image and add caption below

### For Online Viewing

1. Use Mermaid Live Editor: https://mermaid.live/
2. Copy diagram code and paste
3. Export or share link

---

## Color Coding

### System Architecture
- **Blue (#E3F2FD):** Client components
- **Purple (#F3E5F5):** API Gateway
- **Orange (#FFF3E0):** Machine Learning services
- **Green (#E8F5E9):** AI services
- **Pink (#FCE4EC):** NLP services
- **Yellow (#FFF9C4):** Data layer

### Data Flow
- **Light Blue (#E1F5FE):** User
- **Purple (#F3E5F5):** Input collection
- **Orange (#FFF3E0):** Data processing
- **Green (#E8F5E9):** ML/AI models
- **Pink (#FCE4EC):** System output

### Sequence Diagrams
- Clean, minimal styling for clarity
- Auto-numbered steps
- Clear participant labels

---

## Paper-Ready Features

✅ **Clean Design:** Minimal clutter, maximum clarity
✅ **Consistent Styling:** Uniform colors and fonts across all diagrams
✅ **Professional Layout:** Proper spacing and alignment
✅ **Clear Labels:** All components clearly labeled with concise descriptions
✅ **Numbered Sequences:** Easy to reference in text
✅ **High Contrast:** Readable in both print and digital formats
✅ **Scalable Format:** Vector graphics (Mermaid) can be exported at any resolution
✅ **Standard Notation:** Follows established diagramming conventions
✅ **Complete Coverage:** All major system aspects documented

---

## Citation Recommendation

When referencing these diagrams in your paper:

*"Figure X shows the [component/flow/architecture]. The system employs a layered architecture (Figure 1) with distinct separation of concerns. User input flows through preprocessing layers (Figure 2) before being analyzed by machine learning models (Figure 7). The system provides explainability through SHAP analysis (Figure 8), enabling users to understand the reasoning behind career recommendations."*

---

## Maintenance

- All diagrams are in Mermaid format (.mmd)
- Easily editable with any text editor
- Version controlled for tracking changes
- Regenerate images when needed
- Consistent naming: `##_description.mmd`

---

**Document Version:** 1.0  
**Last Updated:** October 27, 2025  
**Prepared for:** Academic Publication  
**System:** BrightPath Career Recommendation System
