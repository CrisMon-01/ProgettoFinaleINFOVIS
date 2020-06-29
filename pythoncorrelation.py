import pandas as pd
data = pd.read_csv("dataset_sleep.csv")

#overall
correlation = data["overall_score"].corr(data["composition_score"], method="pearson")
print("overall 2 composition_score "+str(correlation))
correlation = data["overall_score"].corr(data["revitalization_score"], method="pearson")
print("overall 2 revitalization_score "+str(correlation))
correlation = data["overall_score"].corr(data["duration_score"], method="pearson")
print("overall 2 duration_score "+str(correlation))
correlation = data["overall_score"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("overall 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["overall_score"].corr(data["resting_heart_rate"], method="pearson")
print("overall 2 resting_heart_rate "+str(correlation))
correlation = data["overall_score"].corr(data["restlessness"], method="pearson")
print("overall 2 restlessness "+str(correlation))
correlation = data["overall_score"].corr(data["tmin"], method="pearson")
print("overall 2 tmin "+str(correlation))
correlation = data["overall_score"].corr(data["tmax"], method="pearson")
print("overall 2 tmax "+str(correlation))
correlation = data["overall_score"].corr(data["pioggia"], method="pearson")
print("overall 2 pioggia "+str(correlation))
#composition
correlation = data["composition_score"].corr(data["overall_score"], method="pearson")
print("composition_score 2 overall_score "+str(correlation))
correlation = data["composition_score"].corr(data["revitalization_score"], method="pearson")
print("composition_score 2 revitalization_score "+str(correlation))
correlation = data["composition_score"].corr(data["duration_score"], method="pearson")
print("composition_score 2 duration_score "+str(correlation))
correlation = data["composition_score"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("composition_score 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["composition_score"].corr(data["resting_heart_rate"], method="pearson")
print("composition_score 2 resting_heart_rate "+str(correlation))
correlation = data["composition_score"].corr(data["restlessness"], method="pearson")
print("composition_score 2 restlessness "+str(correlation))
correlation = data["composition_score"].corr(data["tmin"], method="pearson")
print("composition_score 2 tmin "+str(correlation))
correlation = data["composition_score"].corr(data["tmax"], method="pearson")
print("composition_score 2 tmax "+str(correlation))
correlation = data["composition_score"].corr(data["pioggia"], method="pearson")
print("composition_score 2 pioggia "+str(correlation))
#revitalization
correlation = data["revitalization_score"].corr(data["overall_score"], method="pearson")
print("revitalization_score 2 overall_score "+str(correlation))
correlation = data["revitalization_score"].corr(data["composition_score"], method="pearson")
print("revitalization_score 2 revitalization_score "+str(correlation))
correlation = data["revitalization_score"].corr(data["duration_score"], method="pearson")
print("revitalization_score 2 duration_score "+str(correlation))
correlation = data["revitalization_score"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("revitalization_score 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["revitalization_score"].corr(data["resting_heart_rate"], method="pearson")
print("revitalization_score 2 resting_heart_rate "+str(correlation))
correlation = data["revitalization_score"].corr(data["restlessness"], method="pearson")
print("revitalization_score 2 restlessness "+str(correlation))
correlation = data["revitalization_score"].corr(data["tmin"], method="pearson")
print("revitalization_score 2 tmin "+str(correlation))
correlation = data["revitalization_score"].corr(data["tmax"], method="pearson")
print("revitalization_score 2 tmax "+str(correlation))
correlation = data["revitalization_score"].corr(data["pioggia"], method="pearson")
print("revitalization_score 2 pioggia "+str(correlation))
#duration
correlation = data["duration_score"].corr(data["overall_score"], method="pearson")
print("duration_score 2 overall_score "+str(correlation))
correlation = data["duration_score"].corr(data["composition_score"], method="pearson")
print("duration_score 2 composition_score "+str(correlation))
correlation = data["duration_score"].corr(data["revitalization_score"], method="pearson")
print("duration_score 2 revitalization_score "+str(correlation))
correlation = data["duration_score"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("duration_score 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["duration_score"].corr(data["resting_heart_rate"], method="pearson")
print("duration_score 2 resting_heart_rate "+str(correlation))
correlation = data["duration_score"].corr(data["restlessness"], method="pearson")
print("duration_score 2 restlessness "+str(correlation))
correlation = data["duration_score"].corr(data["tmin"], method="pearson")
print("duration_score 2 tmin "+str(correlation))
correlation = data["duration_score"].corr(data["tmax"], method="pearson")
print("duration_score 2 tmax "+str(correlation))
correlation = data["duration_score"].corr(data["pioggia"], method="pearson")
print("duration_score 2 pioggia "+str(correlation))
#deep_sleep
correlation = data["deep_sleep_in_minutes"].corr(data["overall_score"], method="pearson")
print("deep_sleep_in_minutes 2 overall_score "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["composition_score"], method="pearson")
print("deep_sleep_in_minutes 2 composition_score "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["revitalization_score"], method="pearson")
print("deep_sleep_in_minutes 2 revitalization_score "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["duration_score"], method="pearson")
print("deep_sleep_in_minutes 2 duration_score "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["resting_heart_rate"], method="pearson")
print("deep_sleep_in_minutes 2 resting_heart_rate "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["restlessness"], method="pearson")
print("deep_sleep_in_minutes 2 restlessness "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["tmin"], method="pearson")
print("deep_sleep_in_minutes 2 tmin "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["tmax"], method="pearson")
print("deep_sleep_in_minutes 2 tmax "+str(correlation))
correlation = data["deep_sleep_in_minutes"].corr(data["pioggia"], method="pearson")
print("deep_sleep_in_minutes 2 pioggia "+str(correlation))
#resting_heart_rate
correlation = data["resting_heart_rate"].corr(data["overall_score"], method="pearson")
print("resting_heart_rate 2 overall_score "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["composition_score"], method="pearson")
print("resting_heart_rate 2 composition_score "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["revitalization_score"], method="pearson")
print("resting_heart_rate 2 revitalization_score "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["duration_score"], method="pearson")
print("resting_heart_rate 2 duration_score "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("resting_heart_rate 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["restlessness"], method="pearson")
print("resting_heart_rate 2 restlessness "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["tmin"], method="pearson")
print("resting_heart_rate 2 tmin "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["tmax"], method="pearson")
print("resting_heart_rate 2 tmax "+str(correlation))
correlation = data["resting_heart_rate"].corr(data["pioggia"], method="pearson")
print("resting_heart_rate 2 pioggia "+str(correlation))
#restlessness
correlation = data["restlessness"].corr(data["overall_score"], method="pearson")
print("restlessness 2 overall_score "+str(correlation))
correlation = data["restlessness"].corr(data["composition_score"], method="pearson")
print("restlessness 2 composition_score "+str(correlation))
correlation = data["restlessness"].corr(data["revitalization_score"], method="pearson")
print("restlessness 2 revitalization_score "+str(correlation))
correlation = data["restlessness"].corr(data["duration_score"], method="pearson")
print("restlessness 2 duration_score "+str(correlation))
correlation = data["restlessness"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("restlessness 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["restlessness"].corr(data["resting_heart_rate"], method="pearson")
print("restlessness 2 resting_heart_rate "+str(correlation))
correlation = data["restlessness"].corr(data["tmin"], method="pearson")
print("restlessness 2 tmin "+str(correlation))
correlation = data["restlessness"].corr(data["tmax"], method="pearson")
print("restlessness 2 tmax "+str(correlation))
correlation = data["restlessness"].corr(data["pioggia"], method="pearson")
print("restlessness 2 pioggia "+str(correlation))
#tmin
correlation = data["tmin"].corr(data["overall_score"], method="pearson")
print("tmin 2 overall_score "+str(correlation))
correlation = data["tmin"].corr(data["composition_score"], method="pearson")
print("tmin 2 composition_score "+str(correlation))
correlation = data["tmin"].corr(data["revitalization_score"], method="pearson")
print("tmin 2 revitalization_score "+str(correlation))
correlation = data["tmin"].corr(data["duration_score"], method="pearson")
print("tmin 2 duration_score "+str(correlation))
correlation = data["tmin"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("tmin 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["tmin"].corr(data["resting_heart_rate"], method="pearson")
print("tmin 2 resting_heart_rate "+str(correlation))
#tmax
correlation = data["tmax"].corr(data["overall_score"], method="pearson")
print("tmax 2 overall_score "+str(correlation))
correlation = data["tmax"].corr(data["composition_score"], method="pearson")
print("tmax 2 composition_score "+str(correlation))
correlation = data["tmax"].corr(data["revitalization_score"], method="pearson")
print("tmax 2 revitalization_score "+str(correlation))
correlation = data["tmax"].corr(data["duration_score"], method="pearson")
print("tmax 2 duration_score "+str(correlation))
correlation = data["tmax"].corr(data["deep_sleep_in_minutes"], method="pearson")
print("tmax 2 deep_sleep_in_minutes "+str(correlation))
correlation = data["tmax"].corr(data["resting_heart_rate"], method="pearson")
print("tmax 2 resting_heart_rate "+str(correlation))

