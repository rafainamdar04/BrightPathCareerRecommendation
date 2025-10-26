# BrightPath Research Figures

This page collects core figures for the paper. All plots render directly on GitHub. Source images live under `docs/figures` and can be regenerated with `python backend/generate_figures.py`.

## End-to-end system architecture

```mermaid
flowchart LR
  A[Frontend (Vite/React)] -->|REST/JSON| B[Backend API (FastAPI)]
  B --> C[Preprocessing\n(Scaling + OneHotEncoder)]
  C --> D[MLP Career Recommender]
  D --> E[XAI (SHAP)]
  D --> F[Career Roadmap Generator]
  E --> G[Explanations]
  F --> H[Roadmap]
  G --> I[(Response)]
  H --> I
```

## Data distribution and correlation

![Label distribution](figures/data_distribution.png)

![Correlation heatmap](figures/correlation_heatmap.png)

## Model architecture and training curve

```mermaid
graph TD
  In[Input (77 features)] --> L1[Dense 128, ReLU]
  L1 --> L2[Dense 64, ReLU]
  L2 --> Out[Output 34, Softmax]
```

![Training curve](figures/training_curve.png)

## Evaluation: Confusion matrix and PR curve

![Confusion matrix](figures/confusion_matrix.png)

![Precision–Recall](figures/pr_curve.png)

## Explainability (XAI)

![SHAP global importance](figures/shap_global.svg)

![SHAP local explanation](figures/shap_local.svg)

## Career roadmap graph (concept)

```mermaid
flowchart LR
  Start([Current Role/Skillset]) --> S1[Upskill: Algorithms + DSA]
  S1 --> S2[Cert: Cloud Fundamentals]
  S2 --> S3[Project: CRUD Web App]
  S3 --> S4[Cert: DB Design]
  S4 --> Goal([Target Role: Software Engineer])
```

Notes
- The model diagram reflects the training script configuration; exact sizes may change with new training runs.
- SHAP placeholders are shown if your Python environment doesn’t support SHAP (Python 3.14+). To generate the real plots, run `python backend/generate_figures.py` in Python 3.10–3.13.
