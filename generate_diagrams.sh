#!/bin/bash
# Batch script to generate PNG diagrams from Mermaid files
# Requires Mermaid CLI: npm install -g @mermaid-js/mermaid-cli

mmdc -i docs/figures/system_architecture.mmd -o docs/figures/system_architecture.png -b transparent -w 1200
mmdc -i docs/figures/data_flow.mmd -o docs/figures/data_flow.png -b transparent -w 1200
mmdc -i docs/figures/model_architecture_lstm.mmd -o docs/figures/model_architecture_lstm.png -b transparent -w 1200
mmdc -i docs/figures/deployment.mmd -o docs/figures/deployment.png -b transparent -w 1200
mmdc -i docs/figures/sequence.mmd -o docs/figures/sequence.png -b transparent -w 1200
mmdc -i docs/figures/component.mmd -o docs/figures/component.png -b transparent -w 1200
mmdc -i docs/figures/er_diagram.mmd -o docs/figures/er_diagram.png -b transparent -w 1200
mmdc -i docs/figures/ui_flow.mmd -o docs/figures/ui_flow.png -b transparent -w 1200
