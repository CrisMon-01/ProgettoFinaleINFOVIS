DROP TABLE if exists fitbit;
DROP TABLE if exists meteo;
DROP TABLE if exists temperatura;
DROP TABLE if exists pioggia;


CREATE TABLE fitbit (dataf DATE, ora String , overall_score INT ,composition_score INT, revitalization_score INT, duration_score INT, deep_sleep_in_minutes INT, resting_heart_rate INT, restlessness DOUBLE) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';


LOAD DATA LOCAL INPATH '/Applications/GitHub/ProgettoFinaleINFOVIS/dataset_sleep.csv' OVERWRITE INTO TABLE fitbit;

CREATE TABLE IF NOT EXISTS meteo(datam DATE, giorno String, alba String, tramonto String, lunghezzadelgiorno String) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INPATH '/Applications/GitHub/ProgettoFinaleINFOVIS/datasets/solare/soletot1.csv' OVERWRITE INTO TABLE meteo;

CREATE TABLE temperatura(datat DATE, tmin DOUBLE, tmax DOUBLE) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INPATH '/Applications/GitHub/ProgettoFinaleINFOVIS/datasets/temperature/temptot1.csv' OVERWRITE INTO TABLE temperatura;

CREATE TABLE pioggia(datap DATE, pioggia DOUBLE) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INPATH '/Applications/GitHub/ProgettoFinaleINFOVIS/datasets/piogge/pluviotot1.csv' OVERWRITE INTO TABLE pioggia;


CREATE TABLE totaldata AS
SELECT *
FROM fitbit F JOIN meteo M ON(F.dataf=M.datam) JOIN temperatura T ON(F.dataf=T.datat)JOIN pioggia P ON(F.dataf=P.datap)


