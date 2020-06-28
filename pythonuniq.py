import pandas as pd 

data = pd.read_csv("./dataset_sleep_deep_sleep.csv") 

df=data.groupby('giorno').agg({'deep_sleep_in_minutes_medio':'mean'})

print(df)