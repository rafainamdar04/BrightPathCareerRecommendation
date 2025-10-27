# How to View the Architecture Diagrams

The BrightPath system architecture and sequence diagrams are created using Mermaid, a markdown-like syntax for generating diagrams. Here are several ways to view them:

## 🌐 Method 1: Online Mermaid Live Editor (Easiest)

1. Go to: **https://mermaid.live/**
2. Copy the content from either:
   - `docs/figures/system_architecture_detailed.mmd`
   - `docs/figures/sequence_detailed.mmd`
3. Paste into the editor
4. The diagram will render automatically
5. You can export as PNG/SVG from the editor

## 📝 Method 2: VS Code with Mermaid Extension

1. Install the "Markdown Preview Mermaid Support" extension in VS Code
2. Open the `.mmd` file
3. Right-click and select "Open Preview to the Side"
4. The diagram will render in the preview pane

## 🖥️ Method 3: GitHub (Automatic)

- GitHub automatically renders Mermaid diagrams in markdown files
- View them directly on GitHub by navigating to the files
- The diagrams will display inline

## 🔧 Method 4: Mermaid CLI (Generate Images)

If you have Node.js installed:

```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Navigate to the figures directory
cd docs/figures

# Generate PNG from system architecture
mmdc -i system_architecture_detailed.mmd -o system_architecture_detailed.png

# Generate PNG from sequence diagram
mmdc -i sequence_detailed.mmd -o sequence_detailed.png

# Generate SVG (scalable)
mmdc -i system_architecture_detailed.mmd -o system_architecture_detailed.svg
mmdc -i sequence_detailed.mmd -o sequence_detailed.svg
```

## 📱 Method 5: Mermaid Chart Website

1. Visit: **https://www.mermaidchart.com/**
2. Sign up for free (optional)
3. Create a new diagram
4. Paste the `.mmd` content
5. View, edit, and export

## 🎨 Diagram Color Coding

### System Architecture Diagram Colors:
- **Blue (#61DAFB)**: Frontend components (React, UI)
- **Teal (#009688)**: Backend services (API, Services)
- **Orange (#FF6F00)**: ML/AI models and components
- **Green (#4CAF50)**: Data layer (datasets, storage)
- **Purple (#9C27B0)**: NLP and external libraries

### Sequence Diagram Colors:
- **Light Blue**: Career Prediction flows
- **Light Orange**: XAI Analysis flows
- **Light Green**: Roadmap Generation flows
- **Light Pink**: Career Evolution flows
- **Light Purple**: Resume Analysis flows
- **Light Yellow**: Advanced Analysis flows
- **Light Green**: Role Comparison flows
- **Light Yellow**: Model Introspection flows

## 📊 Diagram Overview

### System Architecture Diagram
Shows the complete system structure with:
- **Layers**: Client, Presentation, API Gateway, Services, Data Processing, Data Layer
- **Components**: ~40+ components including UI pages, services, models, libraries
- **Connections**: HTTP endpoints, data flows, service dependencies
- **Technologies**: React, FastAPI, TensorFlow, spaCy, SBERT, SHAP

**Complexity**: High - Comprehensive overview of entire system

### Sequence Diagram
Shows 8 detailed user interaction scenarios:
1. **Career Prediction** (16 steps): User input → ML prediction → Results
2. **XAI Analysis** (14 steps): Request → SHAP calculation → Visualization
3. **Career Roadmap** (12 steps): Request → Knowledge base → Structured data
4. **Career Evolution** (16 steps): Current role → Transformer → Future trajectory
5. **Resume Analysis** (26 steps): File upload → NLP parsing → Gap analysis
6. **Advanced Analysis** (22 steps): SBERT embeddings → Semantic matching → PDF report
7. **Role Comparison** (14 steps): Multiple selections → SHAP comparison → Side-by-side
8. **Model Introspection** (17 steps): Architecture request → Visualization → Display

**Total Steps**: 137 annotated interaction steps  
**Complexity**: Very High - Complete workflow coverage

## 💡 Tips for Understanding the Diagrams

### System Architecture
1. Start from **Client Layer** (top) and follow down
2. Notice the color coding for different component types
3. Solid arrows (→) show direct function calls
4. Dashed arrows (-.→) show HTTP/API calls
5. Subgraphs group related components

### Sequence Diagram
1. Follow the numbered steps sequentially
2. Each scenario is color-coded in rectangles
3. Read participant names at the top
4. Solid arrows (→) show requests
5. Dashed arrows (-->) show responses
6. `alt/else` blocks show conditional flows
7. `opt` blocks show optional steps

## 🔗 Quick Links

- **Mermaid Documentation**: https://mermaid.js.org/
- **Mermaid Syntax Guide**: https://mermaid.js.org/intro/syntax-reference.html
- **Architecture Documentation**: See `ARCHITECTURE_DOCUMENTATION.md`
- **Figures Overview**: See `FIGURES.md`

## 📸 Sample Exports

If you've generated PNG/SVG files, they'll appear alongside the `.mmd` files:
- `system_architecture_detailed.png` - Static image
- `system_architecture_detailed.svg` - Scalable vector
- `sequence_detailed.png` - Static image
- `sequence_detailed.svg` - Scalable vector

These can be embedded in presentations, documentation, or papers.

## ❓ Troubleshooting

**Problem**: Diagram doesn't render in VS Code  
**Solution**: Install "Markdown Preview Mermaid Support" extension

**Problem**: Mermaid CLI errors  
**Solution**: Ensure Node.js v16+ is installed, update CLI: `npm update -g @mermaid-js/mermaid-cli`

**Problem**: Diagram too large to view  
**Solution**: Use zoom controls in Mermaid Live Editor, or export to SVG for infinite zoom

**Problem**: Can't read text in diagram  
**Solution**: Export as SVG and open in browser, or increase DPI when generating PNG

## 📝 Making Changes

If you need to modify the diagrams:
1. Edit the `.mmd` file directly
2. Use Mermaid syntax (see documentation)
3. Test in Mermaid Live Editor first
4. Save and commit changes
5. Regenerate images if needed

---

**Created**: October 27, 2025  
**Maintained by**: Development Team
