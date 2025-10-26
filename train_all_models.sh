#!/bin/bash
# Master Training Script - Trains all models and generates comprehensive documentation
# Run this script to train all models, compare them, and generate research documentation

echo "================================================================================"
echo "BRIGHTPATH CAREER RECOMMENDATION SYSTEM"
echo "Comprehensive Model Training & Documentation Generation"
echo "================================================================================"
echo ""

# Navigate to backend directory
cd backend

echo "📋 Step 1: Installing/Updating required packages..."
pip install -q -r requirements.txt
pip install -q seaborn scikit-learn
echo "   ✓ Packages ready"
echo ""

echo "================================================================================"
echo "🧠 Step 2: Training MLP Career Recommendation Model"
echo "================================================================================"
python train_model.py
if [ $? -eq 0 ]; then
    echo "   ✅ MLP model trained successfully"
else
    echo "   ❌ MLP training failed"
    exit 1
fi
echo ""

echo "================================================================================"
echo "🔄 Step 3: Training LSTM Career Evolution Model"
echo "================================================================================"
python train_evolution_model.py
if [ $? -eq 0 ]; then
    echo "   ✅ LSTM model trained successfully"
else
    echo "   ❌ LSTM training failed"
    exit 1
fi
echo ""

echo "================================================================================"
echo "🚀 Step 4: Training Advanced Transformer Model"
echo "================================================================================"
python train_evolution_advanced.py
if [ $? -eq 0 ]; then
    echo "   ✅ Transformer model trained successfully"
else
    echo "   ❌ Transformer training failed"
    exit 1
fi
echo ""

echo "================================================================================"
echo "📊 Step 5: Comparing Models"
echo "================================================================================"
python model_comparison.py
if [ $? -eq 0 ]; then
    echo "   ✅ Model comparison complete"
else
    echo "   ⚠️  Model comparison failed (non-critical)"
fi
echo ""

echo "================================================================================"
echo "📝 Step 6: Generating Research Documentation"
echo "================================================================================"
python generate_research_documentation.py
if [ $? -eq 0 ]; then
    echo "   ✅ Research documentation generated"
else
    echo "   ⚠️  Documentation generation failed (non-critical)"
fi
echo ""

echo "================================================================================"
echo "✨ ALL TRAINING COMPLETED SUCCESSFULLY!"
echo "================================================================================"
echo ""
echo "📁 Generated Files:"
echo "   Models:"
echo "     • career_model.pkl (MLP)"
echo "     • career_evolution_model.h5 (LSTM)"
echo "     • career_evolution_advanced.h5 (Transformer)"
echo "     • time_prediction_model.h5"
echo ""
echo "   Metrics & Reports:"
echo "     • mlp_training_metrics.json"
echo "     • lstm_training_metrics.json"
echo "     • transformer_training_metrics.json"
echo "     • model_comparison_report.json"
echo "     • research_summary.json"
echo ""
echo "   Visualizations:"
echo "     • mlp_confusion_matrix.png"
echo "     • lstm_confusion_matrix.png"
echo "     • lstm_training_history.png"
echo "     • transformer_confusion_matrix.png"
echo "     • transformer_training_history.png"
echo "     • model_comparison_charts.png"
echo "     • model_comparison_radar.png"
echo ""
echo "   Documentation:"
echo "     • RESEARCH_DOCUMENTATION.md (Main research paper document)"
echo ""
echo "================================================================================"
echo "📖 Next Steps:"
echo "   1. Review RESEARCH_DOCUMENTATION.md for research paper content"
echo "   2. Check confusion matrices for model performance visualization"
echo "   3. Use model_comparison_charts.png for presentations"
echo "   4. Review JSON files for detailed metrics"
echo "================================================================================"
