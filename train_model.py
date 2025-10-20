# train_model.py

import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from imblearn.over_sampling import RandomOverSampler
import pickle

# Load dataset
data = pd.read_csv("data/roo.csv")

# Features & target
X = data.drop("Suggested Job Role", axis=1)
y = data["Suggested Job Role"]

# Separate categorical and numerical columns
cat_cols = X.select_dtypes(include="object").columns
num_cols = X.select_dtypes(include=np.number).columns

# Encode categorical features
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
X_cat = encoder.fit_transform(X[cat_cols])

# Scale numerical features
scaler = StandardScaler()
X_num = scaler.fit_transform(X[num_cols])

# Combine
X_final = np.hstack([X_num, X_cat])

# Oversampling to balance classes
ros = RandomOverSampler(random_state=42)
X_res, y_res = ros.fit_resample(X_final, y)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_res, y_res, test_size=0.2, random_state=42)

# Train ANN with improved parameters
clf = MLPClassifier(
    hidden_layer_sizes=(256, 128, 64),  # Deeper architecture
    activation='relu',                    # ReLU generally works better
    solver='adam',
    max_iter=1000,                       # More iterations
    random_state=42,
    learning_rate_init=0.001,
    verbose=True                          # Show training progress
)
clf.fit(X_train, y_train)

print("Training Accuracy:", clf.score(X_train, y_train))
print("Testing Accuracy:", clf.score(X_test, y_test))

# Save model + encoder + scaler + column info
with open("career_model.pkl", "wb") as f:
    pickle.dump({
        "model": clf,
        "encoder": encoder,
        "scaler": scaler,
        "num_cols": list(num_cols),
        "cat_cols": list(cat_cols)
    }, f)

print("career_model.pkl saved!")
