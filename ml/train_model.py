import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# 1. Load dataset
data = pd.read_csv("career_dataset.csv")

# 2. Separate input and output
X = data.drop("career", axis=1)
y = data["career"]

# 3. Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 4. Create ML model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# 5. Train model
model.fit(X_train, y_train)

# 6. Test model
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Model trained successfully!")
print("Accuracy:", accuracy)

# 7. Save trained model
joblib.dump(model, "career_model.pkl")

print("Model saved as career_model.pkl")