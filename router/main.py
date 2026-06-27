import os
import uuid
from datetime import datetime

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

MODEL_V1_URL = os.getenv("MODEL_V1_URL", "http://localhost:8001")
MODEL_V2_URL = os.getenv("MODEL_V2_URL", "http://localhost:8002")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stats = {
    "total_requests": 0,
    "disagreements": 0,
    "v2_status": "HEALTHY",
}

recent_comparisons = []


@app.get("/")
def home():
    return {"message": "Shadow Router Running"}


class PredictionRequest(BaseModel):
    features: list[float]


@app.post("/shadow-predict")
async def shadow_predict(data: PredictionRequest):

    features = data.features

    async with httpx.AsyncClient() as client:

        v1 = await client.post(
            f"{MODEL_V1_URL}/predict",
            json={"features": features},
        )

        v2 = await client.post(
            f"{MODEL_V2_URL}/predict",
            json={"features": features},
        )

    v1_data = v1.json()
    v2_data = v2.json()

    request_id = str(uuid.uuid4())[:8]

    agreed = (
        v1_data["prediction"]
        ==
        v2_data["prediction"]
    )

    stats["total_requests"] += 1

    if not agreed:
        stats["disagreements"] += 1

    comparison = {
        "request_id": request_id,
        "timestamp": datetime.now().isoformat(),
        "v1_prediction": v1_data["prediction"],
        "v2_prediction": v2_data["prediction"],
        "agreed": agreed,
    }

    recent_comparisons.append(comparison)

    recent_comparisons[:] = recent_comparisons[-20:]

    rate = (
        stats["disagreements"]
        /
        stats["total_requests"]
    ) * 100

    if rate > 10:
        stats["v2_status"] = "FLAGGED"

    return {
        "request_id": request_id,
        "shown_to_user": v1_data,
        "shadow_model": v2_data,
        "agreed": agreed,
    }


@app.get("/stats")
def get_stats():

    total = stats["total_requests"]

    rate = 0

    if total > 0:
        rate = (
            stats["disagreements"]
            /
            total
        ) * 100

    return {
        "total_requests": total,
        "disagreements": stats["disagreements"],
        "disagreement_rate": rate,
        "v2_status": stats["v2_status"],
        "recent_comparisons": recent_comparisons,
    }