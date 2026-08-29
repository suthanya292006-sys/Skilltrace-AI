from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI()

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "ml",
    "career_model.pkl"
)

model = joblib.load(MODEL_PATH)

# --------------------------------------------------
# INPUT
# --------------------------------------------------

class CareerInput(BaseModel):
    Python: int
    Java: int
    JavaScript: int
    SQL: int
    Machine_Learning: int
    Data_Analysis: int
    Web_Development: int
    Cybersecurity: int
    Cloud: int
    DevOps: int
    UI_UX: int
    Number_of_Projects: int
    Assessment_Score: float
    Portfolio_Score: float


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "SkillTrace AI Career Recommendation API is running"
    }


# --------------------------------------------------
# PREDICT
# --------------------------------------------------

@app.post("/predict")
def predict(data: CareerInput):

    try:

        # Create all possible feature names used by
        # the trained model.

        feature_data = {

            "python": data.Python,

            "java": data.Java,

            "javascript": data.JavaScript,

            "sql": data.SQL,

            "machine_learning":
                data.Machine_Learning,

            "data_analysis":
                data.Data_Analysis,

            "web_development":
                data.Web_Development,

            "cybersecurity":
                data.Cybersecurity,

            "cloud":
                data.Cloud,

            "devops":
                data.DevOps,

            "ui_ux":
                data.UI_UX,

            # The trained model expects "projects"
            # rather than "number_of_projects".

            "projects":
                data.Number_of_Projects,

            # Also keep this available in case the
            # model uses this name.

            "number_of_projects":
                data.Number_of_Projects,

            "assessment_score":
                data.Assessment_Score,

            "portfolio_score":
                data.Portfolio_Score
        }

        # Create DataFrame

        input_data = pd.DataFrame([feature_data])

        # --------------------------------------------------
        # IMPORTANT
        # Match exactly the features used during training.
        # --------------------------------------------------

        if hasattr(model, "feature_names_in_"):

            required_features = list(
                model.feature_names_in_
            )

            input_data = input_data.reindex(
                columns=required_features,
                fill_value=0
            )

        # --------------------------------------------------
        # PREDICTION
        # --------------------------------------------------

        prediction = model.predict(
            input_data
        )[0]

        return {
            "recommended_career":
                str(prediction)
        }

    except Exception as e:

        print("Prediction error:", str(e))

        return {
            "error": str(e)
        }