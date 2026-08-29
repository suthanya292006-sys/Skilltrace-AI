import joblib
import pandas as pd

# Load trained model
model = joblib.load("career_model.pkl")

print("=== SkillTrace AI Career Recommendation ===")

python = int(input("Python (1=Yes, 0=No): "))
java = int(input("Java (1=Yes, 0=No): "))
javascript = int(input("JavaScript (1=Yes, 0=No): "))
sql = int(input("SQL (1=Yes, 0=No): "))
machine_learning = int(input("Machine Learning (1=Yes, 0=No): "))
data_analysis = int(input("Data Analysis (1=Yes, 0=No): "))
web_development = int(input("Web Development (1=Yes, 0=No): "))
cybersecurity = int(input("Cybersecurity (1=Yes, 0=No): "))
cloud = int(input("Cloud (1=Yes, 0=No): "))
devops = int(input("DevOps (1=Yes, 0=No): "))
ui_ux = int(input("UI/UX (1=Yes, 0=No): "))

projects = int(input("Number of Projects: "))
assessment_score = int(input("Assessment Score: "))
portfolio_score = int(input("Portfolio Score: "))

# Create DataFrame with the exact training feature names
student = pd.DataFrame([{
    "python": python,
    "java": java,
    "javascript": javascript,
    "sql": sql,
    "machine_learning": machine_learning,
    "data_analysis": data_analysis,
    "web_development": web_development,
    "cybersecurity": cybersecurity,
    "cloud": cloud,
    "devops": devops,
    "ui_ux": ui_ux,
    "projects": projects,
    "assessment_score": assessment_score,
    "portfolio_score": portfolio_score
}])

# Predict career
prediction = model.predict(student)

print("\nRecommended Career:", prediction[0])