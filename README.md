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
composition_score | punteggio influenzato da frequenza cardiaca, tempo in REM <br/> tempo sveglio durante la notte e sulle fasi di questo | Integer
revitalization_score | stima su quanto il sonno è stato riposante <br/> e se durante il sonno ci sono stati movimenti o agitazioni | Integer
duration_score | punteggio ottenuto dalla durata del sonno | Integer
deep_sleep_in_minutes | quanti minuti si è stati nella fase profonda del sonno | Integer
restlessness | quanto il sonno è stato irrequieto, influenzato da <br/> cambi di posizione, movimenti etc | Double

L'overall score nel grafico è stato rappresentato come stacked graph di composition, duration e revitalizzation, in quanto somma aritmetica di questi. <br/>
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

# Run
Run with Docker: <br/>
 `````
  docker build -t demoinfovisfinaleimg .
  docker run -dit --name demoinfovisfinalecontainer -p 8080:80 demoinfovisfinaleimg
 `````
All'indirizzo della macchina che ha lanciato i comandi docker, esposto sulla porta 80, al path / troverete i grafici sugli score. <br/>
Al path /index-spirale.html troverete il grafico a sprile per analizzare al meglio le periodicità settimanali. 

Utilizzo del logo da parte della comunità universitaria.
Il logo dell’Università degli Studi Roma Tre è un marchio registrato di proprietà esclusiva dell’Università e può essere utilizzato dalla comunità universitaria nell’ambito delle attività scientifiche, didattiche e comunicative.