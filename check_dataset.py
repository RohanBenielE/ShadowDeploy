import pandas as pd

df = pd.read_csv("banking_dataset.csv")

print(df["fraud"].value_counts())