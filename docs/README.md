# BrightPath Documentation

This folder contains all architecture diagrams and documentation for the BrightPath Career Recommendation System, optimized for academic papers and technical documentation.

## 📐 Architecture Diagrams

- Primary source files live in `docs/figures/*.mmd` (Mermaid).
- For GitHub rendering, see the embedded versions in: [FIGURES.md](./FIGURES.md)

### Current Diagram Set (sources in `docs/figures/`)

1. `01_system_block_diagram.mmd` — System Architecture (block diagram)
2. `02_hardware_architecture.mmd` — Hardware architecture (current vs planned)
3. `03_software_layers.mmd` — Layered software architecture
4. `04_ml_pipeline.mmd` — ML pipeline (training to inference)
5. `05_career_prediction_algorithm.mmd` — Career prediction algorithm with roadmap generation
6. `06_career_evolution_transformer.mmd` — Career evolution (Transformer)
7. `07_resume_nlp_pipeline.mmd` — Resume NLP pipeline
8. `08_xai_explanation_flow.mmd` — XAI SHAP explanation flow
9. `09_data_preprocessing.mmd` — Data preprocessing pipeline
10. `10_user_interaction_flow.mmd` — User interaction with roadmap (activity diagram)
11. `11_api_endpoint_architecture.mmd` — API endpoints and services including roadmap
12. `12_hardware_components.mmd` — Hardware component specs
13. `13_roadmap_generation_flow.mmd` — Career roadmap generation with Mistral AI

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

### Method 3: GitHub (embedded)
- Diagrams render automatically when embedded in markdown code fences.
- Use [FIGURES.md](./FIGURES.md) for GitHub-rendered versions.

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

**Last Updated:** November 5, 2025  
**Version:** 2.2 (Roadmap Integration)  
**Status:** Ready for Academic Publication
