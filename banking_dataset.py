import pandas as pd
import numpy as np

np.random.seed(42)

rows = 10000

amount = np.random.randint(100, 100000, rows)

account_age = np.random.randint(1, 120, rows)

failed_logins = np.random.randint(0, 20, rows)

location_risk = np.random.randint(0, 100, rows)

device_trust = np.random.randint(0, 100, rows)

fraud = (
    (
        (amount > 70000)
        &
        (location_risk > 70)
    )
    |
    (failed_logins > 10)
    |
    (
        (device_trust < 20)
        &
        (location_risk > 60)
    )
).astype(int)
noise = np.random.rand(rows)

fraud = np.where(
    noise < 0.10,
    1 - fraud,
    fraud
)

df = pd.DataFrame({
    "amount": amount,
    "account_age": account_age,
    "failed_logins": failed_logins,
    "location_risk": location_risk,
    "device_trust": device_trust,
    "fraud": fraud
})

df.to_csv("banking_dataset.csv", index=False)

print("Dataset Created!")
print(df.head())