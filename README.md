# Progetto Finale 
![Logo Roma Tre](figure/Logo_Roma_Tre.jpg)
<br/>
Progetto per il corso di InfoVis basato su tecnologia d3.js <br/>
Il progetto si basa sulla visualizzazione dei dati nell'intervallo dal 20/10/2019 al 30/04/2020 <br/>
I dati su cui si è impostato il lavoro sono stati presi da diverse fonti per cercare di trovare correlazioni e ricorrenze. <br/>

## DATI:
* Fitbit
* Opendata Regione Lazio:
    * Temperature minime e massime (Pomezia)
    * Precipitazioni (Pomezia)
* Consultazione di dataset online 
    * Tramonto

I dati Fitbit sono così organizzati:
dato | descrizione | tipo
-----|-------------|-----
overall_score | dato sintetico complessivo, somma aritmetica di composition <br/> revitalization e duration | Integer
composition_score | punteggio influenzato dal tempo in fase REM <br/> tempo sveglio durante la notte e sulle fasi di questo | Integer
revitalization_score | stima su quanto il sonno è stato riposante <br/> in base a frequenza cardiaca e agitazione durante il sonno | Integer
duration_score | punteggio ottenuto dalla durata del sonno | Integer
deep_sleep_in_minutes | quanti minuti si è stati nella fase profonda del sonno | Integer
restlessness | quanto il sonno è stato irrequieto, influenzato da <br/> cambi di posizione, movimenti etc | Double

L'overall score nei grafici seguenti al primo è stato sostituito dallo stacked graph di composition, duration e revitalizzation, in quanto somma aritmetica di questi. <br/>
I dati sono stati rappresentati tramite un insieme di grafici in modo da evidenziare correlazioni. <br/>
* Vi è una correlazione tra le precipitazioni e il sonno. <br/>
Nei grafici è stato poi filtrato il week end in quanto mostrava dei dati facilmente prevedibili. <br/>

Oltre ai grafici è stata introdotta una visualizzazione a spirale per evidenziare periodicità riguardanti il sonno. <br/>
Le correlazioni trovate in questa visualizzazione sono
* Nel week end c'è un maggior valore del sonno
* Il martedì e il mercoledì sono giorni molto simili 
* Il Giovedì da fine Marzo e per tutto aprile vi è stato un notevole aumento di riposo

## Attuali TO-DO 
- Parentela diretta o inversa <br/>
- Distanza tra curve <br/>

## Correlazioni
Attraverso la metrica di pearson sono state determinate correlazioni dirette e inverse per stabilire se quanto riportato dai grafici fosse o meno reale. <br>
Per la verifica, attraverso il programma pythoncorrelation.py, eseguibile come:
 `````
 python3 pythoncorrelation.py
 `````
Si ottengono i seguenti risultati:
 `````
overall 2 composition_score 0.7216263087378664
overall 2 revitalization_score 0.04514058550961356
overall 2 duration_score 0.9155343467340677
overall 2 deep_sleep_in_minutes 0.7180993978620007
overall 2 resting_heart_rate 0.17515964856149938
overall 2 restlessness -0.011600012004912208
overall 2 tmin -0.15648541237356023
overall 2 tmax -0.11003529856897838
overall 2 pioggia -0.08759056297523173
composition_score 2 overall_score 0.7216263087378664
composition_score 2 revitalization_score -0.22213899791620784
composition_score 2 duration_score 0.49477176473106477
composition_score 2 deep_sleep_in_minutes 0.6035651004808297
composition_score 2 resting_heart_rate 0.13741217591113322
composition_score 2 restlessness 0.06803755959444997
composition_score 2 tmin -0.14013901422616626
composition_score 2 tmax -0.12560666924160255
composition_score 2 pioggia -0.010692971988733993
revitalization_score 2 overall_score 0.04514058550961356
revitalization_score 2 revitalization_score -0.22213899791620784
revitalization_score 2 duration_score -0.17054227618671944
revitalization_score 2 deep_sleep_in_minutes -0.2054456785087636
revitalization_score 2 resting_heart_rate 0.25202694095346656
revitalization_score 2 restlessness -0.4846033385020221
revitalization_score 2 tmin -0.1768889883734366
revitalization_score 2 tmax -0.15807759805913116
revitalization_score 2 pioggia -0.1039738065092124
duration_score 2 overall_score 0.9155343467340677
duration_score 2 composition_score 0.49477176473106477
duration_score 2 revitalization_score -0.17054227618671944
duration_score 2 deep_sleep_in_minutes 0.6948502503887958
duration_score 2 resting_heart_rate 0.06960177020516307
duration_score 2 restlessness 0.11718687571562135
duration_score 2 tmin -0.06974350648091712
duration_score 2 tmax -0.022947933031111683
duration_score 2 pioggia -0.0732883237146473
deep_sleep_in_minutes 2 overall_score 0.7180993978620008
deep_sleep_in_minutes 2 composition_score 0.6035651004808297
deep_sleep_in_minutes 2 revitalization_score -0.2054456785087636
deep_sleep_in_minutes 2 duration_score 0.6948502503887958
deep_sleep_in_minutes 2 resting_heart_rate 0.014880816958071023
deep_sleep_in_minutes 2 restlessness 0.22047784985071386
deep_sleep_in_minutes 2 tmin -0.006592478390925329
deep_sleep_in_minutes 2 tmax 0.0230687547640661
deep_sleep_in_minutes 2 pioggia 0.031218817250696446
resting_heart_rate 2 overall_score 0.17515964856149938
resting_heart_rate 2 composition_score 0.13741217591113322
resting_heart_rate 2 revitalization_score 0.2520269409534666
resting_heart_rate 2 duration_score 0.06960177020516307
resting_heart_rate 2 deep_sleep_in_minutes 0.014880816958071025
resting_heart_rate 2 restlessness -0.18709019739060465
resting_heart_rate 2 tmin -0.609061696212945
resting_heart_rate 2 tmax -0.6453034199889537
resting_heart_rate 2 pioggia -0.1554821607167556
restlessness 2 overall_score -0.011600012004912208
restlessness 2 composition_score 0.06803755959444997
restlessness 2 revitalization_score -0.48460333850202214
restlessness 2 duration_score 0.11718687571562135
restlessness 2 deep_sleep_in_minutes 0.22047784985071386
restlessness 2 resting_heart_rate -0.18709019739060465
restlessness 2 tmin 0.23460738556479854
restlessness 2 tmax 0.18721836584236207
restlessness 2 pioggia 0.16333580442638157
tmin 2 overall_score -0.15648541237356023
tmin 2 composition_score -0.14013901422616626
tmin 2 revitalization_score -0.17688898837343658
tmin 2 duration_score -0.06974350648091711
tmin 2 deep_sleep_in_minutes -0.006592478390925328
tmin 2 resting_heart_rate -0.609061696212945
tmax 2 overall_score -0.11003529856897837
tmax 2 composition_score -0.12560666924160255
tmax 2 revitalization_score -0.15807759805913113
tmax 2 duration_score -0.022947933031111683
tmax 2 deep_sleep_in_minutes 0.023068754764066102
tmax 2 resting_heart_rate -0.6453034199889537
  `````
Le correlazioni dirette possono essere considerate:
* assenti o deboli per valori tra 0 e 0,3
* notevoli per calori tra 0,3 e 0,7
* forti per valori tra 0,7 e 1
Stessa scala può essere utilizzata per correlazioni inverse con il segno negativo. <br/>
Oltre le correlazioni sono state calcolate anche le distanze tra le curve, mediante la metrica: distanza di Fréchet per calcolare le curve più simili. La distanza Fréchet è una misura di similarità fra le curve che tiene conto della posizione e dell'ordinamento dei punti lungo le curve.
  `````
    distance hr 2 hr: test 0.0
    distance hr 2 rev 50.0
    distance hr 2 duration 36.0
    distance hr 2 composition 52.0
  `````

## Correlazioni riscontrate dai grafici
* overall_score come somma algebrica di composition duration e revitalization score
* correlazione inversa tra resting_hearth_rate e temperature (minime e massime)
* correlazione inversa tra resting_hearth_rate e orario del tramonto
* forte correlazione tra pioggia e minor valore degli score del sonno
* variazione dei punteggi di sonno per gli esami (poco prima calo e poi aumento e dopo l'esame un'alterazione positiva e negativa) 

# Run
Run with Docker: <br/>
 `````
  docker build -t demoinfovisfinaleimg .
  docker run -dit --name demoinfovisfinalecontainer -p 8080:80 demoinfovisfinaleimg
 `````
All'indirizzo della macchina che ha lanciato i comandi docker, esposto sulla porta 80, al path / troverete i grafici sugli score. <br/>
Al path /index-spirale.html troverete il grafico a spirale per analizzare al meglio le periodicità settimanali. <br/>
Al path /index-deepsleep-day.html troverete la treemap calcolata sulla base della media dei minuti di sonno profondo per ogni giorno della settimana. <br/>

Utilizzo del logo da parte della comunità universitaria.
Il logo dell’Università degli Studi Roma Tre è un marchio registrato di proprietà esclusiva dell’Università e può essere utilizzato dalla comunità universitaria nell’ambito delle attività scientifiche, didattiche e comunicative.
