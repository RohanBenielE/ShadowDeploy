from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

model = joblib.load("model_v2.pkl")

class PredictionRequest(BaseModel):
    features: list[float]

@app.get("/")
def home():
    return {"message": "Model V2 Running"}

@app.post("/predict")
def predict(data: PredictionRequest):

    
    print(data.features)
    
    prediction = model.predict([data.features])[0]

    probability = model.predict_proba([data.features])[0][1]

    return {
        "model": "v2",
        "prediction": int(prediction),
        "probability": float(probability)
    }