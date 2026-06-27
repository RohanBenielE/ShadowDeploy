import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

df = pd.read_csv("../banking_dataset.csv")

X = df[
    [
        "amount",
        "account_age",
        "failed_logins",
        "location_risk",
        "device_trust"
    ]
]
y = df["fraud"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression(max_iter=2000)

print(df.head())
print(df["fraud"].value_counts())

model.fit(X_train, y_train)

print(model.score(X_test, y_test))

joblib.dump(model, "model_v1.pkl")

print("V1 Trained!")