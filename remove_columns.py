import pandas as pd
import os

# Columns to remove (least relevant for career prediction)
columns_to_remove = [
    "In a Realtionship?",
    "Interested Type of Books",
    "interested in games",
    "Gentle or Tuff behaviour?",
    "Taken inputs from seniors or elders",
    "Salary Range Expected",
    "Salary/work",
    "olympiads",
    "talenttests taken?",
    "Introvert"
]

# Read the original CSV
print("Reading original dataset...")
df = pd.read_csv("data/roo.csv")
print(f"Original shape: {df.shape}")
print(f"Original columns: {df.columns.tolist()}")

# Remove the specified columns
print(f"\nRemoving {len(columns_to_remove)} columns...")
df_cleaned = df.drop(columns=columns_to_remove, errors='ignore')

print(f"New shape: {df_cleaned.shape}")
print(f"Removed columns: {columns_to_remove}")
print(f"\nRemaining columns ({len(df_cleaned.columns)}):")
for i, col in enumerate(df_cleaned.columns, 1):
    print(f"  {i}. {col}")

# Backup original file
if os.path.exists("data/roo_backup.csv"):
    print("\nBackup already exists, skipping backup...")
else:
    print("\nCreating backup of original file...")
    df.to_csv("data/roo_backup.csv", index=False)

# Save the cleaned dataset
print("\nSaving cleaned dataset...")
df_cleaned.to_csv("data/roo.csv", index=False)

print("\n✓ Dataset updated successfully!")
print(f"✓ Reduced from {df.shape[1]} to {df_cleaned.shape[1]} columns")
