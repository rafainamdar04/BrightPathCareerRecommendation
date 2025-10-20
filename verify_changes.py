import pandas as pd

print("="*70)
print("DATASET COLUMN REMOVAL - VERIFICATION REPORT")
print("="*70)

# Check backup exists
try:
    df_backup = pd.read_csv("data/roo_backup.csv")
    print(f"\n✓ Backup file exists: data/roo_backup.csv")
    print(f"  Original dataset shape: {df_backup.shape}")
    print(f"  Original columns: {df_backup.shape[1]}")
except FileNotFoundError:
    print("\n✗ Warning: Backup file not found!")

# Check cleaned dataset
df_new = pd.read_csv("data/roo.csv")
print(f"\n✓ Cleaned dataset: data/roo.csv")
print(f"  New dataset shape: {df_new.shape}")
print(f"  New columns: {df_new.shape[1]}")

# Calculate reduction
if 'df_backup' in locals():
    removed = df_backup.shape[1] - df_new.shape[1]
    print(f"\n📊 Columns removed: {removed}")
    print(f"   Reduction: {(removed/df_backup.shape[1])*100:.1f}%")
    
    # Show removed columns
    removed_cols = set(df_backup.columns) - set(df_new.columns)
    removed_cols.discard('Suggested Job Role')  # Exclude target column
    print(f"\n🗑️  Removed columns ({len(removed_cols)}):")
    for i, col in enumerate(sorted(removed_cols), 1):
        print(f"   {i}. {col}")

# Show remaining columns
print(f"\n✅ Remaining columns ({df_new.shape[1]}):")
for i, col in enumerate(df_new.columns, 1):
    marker = "🎯" if col == "Suggested Job Role" else "  "
    print(f"   {marker} {i}. {col}")

# Check model
import pickle
print("\n" + "="*70)
print("MODEL VERIFICATION")
print("="*70)

try:
    with open("career_model.pkl", "rb") as f:
        model_data = pickle.load(f)
    
    print("\n✓ Model loaded successfully")
    print(f"  Numerical features: {len(model_data['num_cols'])}")
    print(f"  Categorical features: {len(model_data['cat_cols'])}")
    print(f"  Total input features: {len(model_data['num_cols']) + len(model_data['cat_cols'])}")
    print(f"  Model classes: {len(model_data['model'].classes_)} career roles")
    
    print("\n📈 Model Architecture:")
    print(f"  Hidden layers: {model_data['model'].hidden_layer_sizes}")
    print(f"  Activation: {model_data['model'].activation}")
    print(f"  Solver: {model_data['model'].solver}")
    
except Exception as e:
    print(f"\n✗ Error loading model: {e}")

print("\n" + "="*70)
print("✓ All verifications complete!")
print("="*70)
