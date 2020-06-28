import pandas as pd 
import numpy as np
import datetime as dt
import similaritymeasures
import matplotlib.pyplot as plt

data = pd.read_csv("./dataset_sleep.csv") 

rest_hr = np.zeros((len(data["resting_heart_rate"]),2), dtype = object)
rest_hr[:,0]=( pd.to_datetime(data['data'],format='%d/%m/%y')  - dt.datetime(1970,1,1)).dt.total_seconds()
rest_hr[:,1]=data["resting_heart_rate"]

rev_score = np.zeros((len(data["revitalization_score"]),2), dtype = object)
rev_score[:,0]=( pd.to_datetime(data['data'],format='%d/%m/%y')  - dt.datetime(1970,1,1)).dt.total_seconds()
rev_score[:,1]=data["revitalization_score"]

duration_score = np.zeros((len(data["duration_score"]),2), dtype = object)
duration_score[:,0]=( pd.to_datetime(data['data'],format='%d/%m/%y')  - dt.datetime(1970,1,1)).dt.total_seconds()
duration_score[:,1]=data["duration_score"]

composition_score = np.zeros((len(data["composition_score"]),2), dtype = object)
composition_score[:,0]=( pd.to_datetime(data['data'],format='%d/%m/%y')  - dt.datetime(1970,1,1)).dt.total_seconds()
composition_score[:,1]=data["composition_score"]

frechet_hr_hr = similaritymeasures.frechet_dist(rest_hr,rest_hr)
frechet_hr_rev = similaritymeasures.frechet_dist(rest_hr,rev_score)
frechet_hr_duration = similaritymeasures.frechet_dist(rest_hr,duration_score)
frechet_hr_composition = similaritymeasures.frechet_dist(rest_hr,composition_score)

print("distance hr 2 hr: test "+str(frechet_hr_hr))
print("distance hr 2 rev "+str(frechet_hr_rev))
print("distance hr 2 duration "+str(frechet_hr_duration))
print("distance hr 2 composition "+str(frechet_hr_composition))
