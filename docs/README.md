# BrightPath Documentation

This folder contains all architecture diagrams and documentation for the BrightPath Career Recommendation System, optimized for academic papers and technical documentation.

## 📐 Architecture Diagrams

All diagrams are in the `figures/` folder and use Mermaid format for easy editing and rendering.

### Available Diagrams

1. **System Architecture** (`01_system_architecture.mmd`)
   - Complete system overview with all layers
   - Shows client, gateway, services, and data layers
   - Color-coded by component type

2. **Data Flow** (`02_data_flow.mmd`)
   - End-to-end data flow through the system
   - From user input to system output
   - Shows all processing stages

3. **Career Prediction Sequence** (`03_sequence_career_prediction.mmd`)
   - Step-by-step career prediction workflow
   - Includes XAI explanation generation
   - Numbered sequence for easy reference

4. **Career Evolution Sequence** (`04_sequence_career_evolution.mmd`)
   - AI-powered career trajectory prediction
   - Transformer model workflow
   - Personalized timeline generation

5. **Resume Analysis Sequence** (`05_sequence_resume_analysis.mmd`)
   - NLP-based resume parsing
   - SBERT semantic analysis
   - Skill gap analysis workflow

6. **Component Interaction** (`06_component_interaction.mmd`)
   - How system components interact
   - Frontend-backend communication
   - Model and data layer access

7. **ML Pipeline** (`07_ml_pipeline.mmd`)
   - Detailed machine learning pipeline
   - Data preprocessing steps
   - Model architecture details

8. **XAI Pipeline** (`08_xai_pipeline.mmd`)
   - SHAP explainability generation
   - Visualization creation process
   - Natural language explanation

## 📄 Documentation Files

- **[PAPER_DIAGRAMS.md](PAPER_DIAGRAMS.md)** - Complete guide for using diagrams in academic papers
  - Figure captions for each diagram
  - Technical specifications
  - Rendering instructions for LaTeX/Word
  - Citation recommendations

## 🎨 Viewing Diagrams

### Method 1: Mermaid Live Editor (Recommended)
1. Go to https://mermaid.live/
2. Copy diagram code from `.mmd` file
3. Paste and view instantly
4. Export as PNG or SVG

### Method 2: VS Code
1. Install "Markdown Preview Mermaid Support" extension
2. Open `.mmd` file
3. Click preview button

### Method 3: GitHub
- Diagrams render automatically in GitHub when embedded in markdown

### Method 4: Generate Images
```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Generate PNG (default)
mmdc -i figures/01_system_architecture.mmd -o figures/01_system_architecture.png

# Generate high-res PNG for papers (300 DPI)
mmdc -i figures/01_system_architecture.mmd -o figures/01_system_architecture.png -w 3000

# Generate SVG (scalable)
mmdc -i figures/01_system_architecture.mmd -o figures/01_system_architecture.svg
```

## 📊 For Academic Papers

### LaTeX Example
```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.9\textwidth]{figures/01_system_architecture.png}
  \caption{System architecture of BrightPath showing layered design.}
  \label{fig:architecture}
\end{figure}
```

### Caption Templates
See `PAPER_DIAGRAMS.md` for ready-to-use figure captions for each diagram.

## 🎯 Design Principles

All diagrams follow these principles:
- ✅ **Clean and minimal** - No unnecessary clutter
- ✅ **Consistent styling** - Uniform colors and fonts
- ✅ **Clear labels** - Concise, descriptive text
- ✅ **High contrast** - Readable in print and digital
- ✅ **Professional** - Academic publication quality
- ✅ **Scalable** - Vector format, any resolution

## 🔧 Technical Details

**System:**
- Frontend: React 18 + TypeScript + Vite
- Backend: FastAPI + Python 3.10+
- ML: Random Forest, Transformer, LSTM
- NLP: spaCy, Sentence-BERT
- XAI: SHAP

**Features:**
- 28 input features (14 categorical, 14 numerical)
- 34 career classes
- Top-3 predictions
- AI-powered career evolution
- Resume parsing and gap analysis
- SHAP-based explanations

## 📝 Quick Reference

| Diagram | Purpose | Best Used For |
|---------|---------|---------------|
| 01 | System Architecture | Overall system overview |
| 02 | Data Flow | Understanding data movement |
| 03 | Career Prediction | ML prediction workflow |
| 04 | Career Evolution | AI trajectory prediction |
| 05 | Resume Analysis | NLP processing flow |
| 06 | Component Interaction | Component relationships |
| 07 | ML Pipeline | Detailed ML process |
| 08 | XAI Pipeline | Explainability generation |

## 🚀 Getting Started

1. **For viewing:** Open diagrams in https://mermaid.live/
2. **For papers:** See `PAPER_DIAGRAMS.md` for captions and export instructions
3. **For editing:** Modify `.mmd` files with any text editor
4. **For images:** Use Mermaid CLI to generate PNG/SVG

## 📚 Additional Resources

- Mermaid Documentation: https://mermaid.js.org/
- Mermaid Syntax: https://mermaid.js.org/intro/syntax-reference.html
- GitHub Repo: https://github.com/rafainamdar04/BrightPathCareerRecommendation

---

**Last Updated:** October 27, 2025  
**Version:** 2.0 (Clean, Paper-Ready)  
**Status:** Ready for Academic Publication
