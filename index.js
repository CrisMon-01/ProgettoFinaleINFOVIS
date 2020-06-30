const width = 960;
const height = 1700;
const margin = 5;
const padding = 5;
const adj = 30;

const svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
          + adj + " -"
          + adj + " "
          + (width + adj *3) + " "
          + (height + adj*3))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

const timeH = d3.timeParse("%H:%M:%S");

const dataset = d3.csv('./dataset_sleep.csv');

var scalecolposneg = d3.scaleSequential(d3.interpolateRdBu);

dataset.then(function(data) {
    const slices = data.columns.slice(1).map(function() {   //function(id)
        return {
            // id: id,
            // values: data.map(function(d){
            values: data.filter(function(d) { if(d.giorno!='sabato' && d.giorno!='domenica') return d }).map(function(d){
                return {
                    date:  d3.timeParse("%d/%m/%Y")(d.data),
                    // measurement: d[id],
                    ora: timeH(d.ora),
                    overall_score: d.overall_score,
                    composition_score: d.composition_score,
                    revitalization_score: d.revitalization_score,
                    duration_score: d.duration_score,
                    deep_sleep_in_minutes: d.deep_sleep_in_minutes,
                    resting_heart_rate: d.resting_heart_rate,
                    restlessness: d.restlessness,
                    giorno: d.giorno,
                    alba: timeH(d.alba),
                    tramonto: timeH(d.tramonto),
                    lunghezzadelgiorno: timeH(d.lunghezzadelgiorno),
                    tmin: d.tmin,
                    tmax: d.tmax,
                    pioggia: d.pioggia
                };
            })
        };
    });

    scalecolposneg.domain([-1,1]);

    console.log("Column headers", data.columns);
    //["data", "ora", "overall_score", "composition_score", "revitalization_score", "duration_score", "deep_sleep_in_minutes", "resting_heart_rate", "restlessness", "giorno", "alba", "tramonto", "lunghezzadelgiorno"]
    
    // returns the sliced dataset
    console.log("Slices",slices);  
    // ritorna il dataset
    
    // returns the first slice
    console.log("First slice",slices[0]);
    // colonna [0] oltre data
    
    // returns the array in the first slice
    console.log("A array",slices[0].values); 
    // array valori prima colonna  OK con cambio date a data
    
    // returns the date of the first row in the first slice
    console.log("Date element",slices[0].values[0].date);   //ok
    console.log("Date h",slices[0].values[0].ora);   //ok
    console.log("Date overall",slices[0].values[0].overall_score);     //ok
    // ok Sun Oct 20 0019 00:00:00 GMT+0049 (Central European Summer Time
    
    // returns the array's length
    console.log("Array length",(slices[0].values).length);
    //176 # righe dati

    //define scale
    const xScale = d3.scaleTime().range([15,width-15]);
    //yrange
    const yScale1 = d3.scaleLinear().rangeRound([(height/3-150), 0]);    //fitbit
    const yScale2 = d3.scaleLinear().range([(height/3-150), 0]);    //restlessness
    const yScale3 = d3.scaleLinear().rangeRound([(2*(height/3)-150), (height/3)]);    //tmp 
    const yScale4 = d3.scaleLinear().range([height-150,2*height/3]); //pioggia
    const yScale5 = d3.scaleLinear().range([(height/3-150), 0]);

    //update scale
    xScale.domain(d3.extent(data, function(d){
        return  d3.timeParse("%d/%m/%Y")(d.data)})); //data!!
    yScale1.domain([(0),d3.max(data,d => d.overall_score)]);
    // yScale2.domain(d3.extent(data, function(d){
    //     return timeH(d.tramonto)}));     //FUORI TRAMONTO DENTRO RESTLESSNESS
    yScale2.domain([0,d3.max(data,d => d.restlessness)])
    yScale3.domain([0,d3.max(data,d => Math.round(d.tmax))]);   //valori non interi! 
    yScale4.domain([0,d3.max(data,d => Math.round(d.pioggia))]);
    yScale5.domain([0,d3.max(data,d =>Math.round(d.deep_sleep_in_minutes))]);

    //define axis
    const yaxis1 = d3.axisLeft().scale(yScale1); 
    const yaxis2 = d3.axisLeft().scale(yScale2);
    const yaxis3 = d3.axisLeft().scale(yScale3);
    const yaxis4 = d3.axisLeft().scale(yScale4);
    const yaxis5 = d3.axisLeft().scale(yScale5);
    const xaxis = d3.axisBottom().scale(xScale).ticks(((slices[0].values).length-2)/7);    // 174/7 abbiamo slices.values.length - intestazio - ultima riga vuota  

    //draw axis 
    //fitbit 
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + ((height/3)-150) + ")")
        .call(xaxis)
        .selectAll('text').attr("transform", "rotate(-45)").attr("text-anchor", "end");

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'green')
        .attr("transform", "translate(15,0)")   //sposto per mettere diversi assi
        .call(yaxis1);

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'PaleTurquoise')
        .attr("transform", "translate("+(width-10)+",0)") //sposto per mettere diversi assi 
        .call(yaxis2)
        .selectAll('text').attr("transform", "translate("+40+",0)").attr("text-anchor", "end");

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'LightPink')
        .attr("transform", "translate("+(width-10)+",0)") //sposto per mettere diversi assi 
        .call(yaxis5)
        .selectAll('text').attr("transform", "translate("+40+",0)").attr("text-anchor", "end");

    // fitbit 2 temperatura    
    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'green')
        .attr("transform", "translate(15,"+(height/3)+")")   //sposto per mettere diversi assi
        .call(yaxis1);

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'red')
        .attr("transform", "translate("+(width-10)+",0)") //sposto per mettere diversi assi 
        .call(yaxis3)
        .selectAll('text').attr("transform", "translate("+40+",0)").attr("text-anchor", "end");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (2*height/3-150) + ")")
        .call(xaxis)
        .selectAll('text').attr("transform", "rotate(-45)").attr("text-anchor", "end");

    //fitbit 2 pioggia
    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'green')
        .attr("transform", "translate(15,"+(2*height/3)+")")   //sposto per mettere diversi assi
        .call(yaxis1);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height-150) + ")")
        .call(xaxis)
        .selectAll('text').attr("transform", "rotate(-45)").attr("text-anchor", "end");

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'CornflowerBlue')
        .attr("transform", "translate("+(width-10)+",0)") //sposto per mettere diversi assi 
        .call(yaxis4)
        .selectAll('text').attr("transform", "translate("+40+",0)").attr("text-anchor", "end");

    //esami
    rectsii = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("11/12/19")))
        .attr("y", 0)
        .attr('class','sii')
        .attr("width", 2)
        .attr("height",  height/3-150)
        .attr('fill','black');

    rectml =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("16/12/19")))
        .attr("y", 0)
        .attr('class','ml')
        .attr("width", 2)
        .attr("height",  height/3-150)
        .attr('fill','black');

    rectcyber =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("27/01/20")))
        .attr("y", 0)
        .attr('class','cyber')
        .attr("width", 2)
        .attr("height", height/3-150)
        .attr('fill','black');

    // feste
    natale =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("25/12/19")))
        .attr("y", 0)
        .attr('class','natale')
        .attr("width", 1)
        .attr("height", height/3-150)
        .attr('fill','grey');

    capodanno =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("01/01/20")))
        .attr("y", 0)
        .attr('class','capodanno')
        .attr("width", 1)
        .attr("height", height/3-150)
        .attr('fill','grey');

    venticinqueaprile =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("25/04/20")))
        .attr("y", 0)
        .attr('class','venticinqueaprile')
        .attr("width", 1)
        .attr("height", height/3-150)
        .attr('fill','grey');

    // correlazioni
    //overall composition
    over2compf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", (height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.56));
    over2compf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", (height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.8));
    over2compf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", (height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.78));
    over2compf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", (height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.66));

    //overall deepsleep
    over2deepsleepf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", (height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.67));
    over2deepsleepf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", (height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.72));
    over2deepsleepf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", (height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.73));
    over2deepsleepf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", (height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.78));

    //duration deepsleep minutes 
    duration2deepf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", 0)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.59));
    duration2deepf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", 0)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.771));
    duration2deepf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", 0)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.73));
    duration2deepf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", 0)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.69));

    //rev restlessness
    rev2rlnf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", 3)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.44));
    rev2rlnf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", 3)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.503));
    rev2rlnf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", 3)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.61));
    rev2rlnf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", 3)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.28));

    //overall resting hr
    over2rhrf1 = svg.append("rect")
        .attr("x", 15)
        .attr("y", (height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.3));  
        
    over2rhrf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", (height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.35));

    over2rhrf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", (height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.13));

    over2rhrf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", (height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.17));

    //sopra tmax sotto tmin rhr
    tmin2rhrf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", (2*height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.45));
    tax2rhrf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", (2*height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.67));

    tmin2rhrf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", (2*height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.5784309125172407));
    tax2rhrf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", (2*height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.53));

    tmin2rhrf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", (2*height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.04120543576779158));
    tax2rhrf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20")))
        .attr("y", (2*height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.3138589843449648));   
        
    tmin2rhrf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", (2*height/3)-153)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.3010873431154804));
    tax2rhrf4 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20")))
        .attr("y", (2*height/3)-156)
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.13231528145321703));   

    //pioggia rhr
    pioggiarhrf1 = svg.append("rect")
        .attr("x",  15)
        .attr("y", (2*height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("height", 3)
        .attr('fill',scalecolposneg(0.35583880809233215));

    pioggiarhrf2 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("24/11/19"))-15)
        .attr("y", (2*height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("22/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.020539476090520106));

    pioggiarhrf3 = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("26/01/20"))-15)
        .attr("y", (2*height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("08/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.1));

    pioggiarhrf3 = svg.append("rect")
    .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("14/03/20"))-15)
        .attr("y", (2*height/3))
        .attr("width", xScale(d3.timeParse("%d/%m/%Y")("07/12/19")))
        .attr("height", 3)
        .attr('fill',scalecolposneg(-0.140044132214026));

    const lineoverall = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.overall_score); });

    const linecomp = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.composition_score); });

    const linerevstacked = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(Math.round(d.revitalization_score)+Math.round(d.composition_score)));});

    const linerev = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(d.revitalization_score));});

    const lineduration = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(d.duration_score));});
        
    const linedurationstacked = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(Math.round(d.duration_score)+Math.round(d.revitalization_score)+Math.round(d.composition_score)));});

    const lineheartrate = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(d.resting_heart_rate)-10);});

    const linedeep =  d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale5(d.deep_sleep_in_minutes)+30);});

    const linerestlessness = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale2(d.restlessness));});
        // .y(function(d) { return (yScale2(d.tramonto));});

    const linestmin = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale3(d.tmin));});

    const linestmax = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale3(d.tmax));});

    const linespioggia = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale4(d.pioggia));});

    const lines = svg.selectAll("lines").data(slices).enter()
        .append("g");

    //con lo stacked graph sono informazioni ridondanti
    //primo overall
    lines.append("path").attr("d", function(d) { return lineoverall(d.values); })
        .attr('fill','none')
        .attr('stroke','green')
        .attr('stroke-width','3');

    // lines.append("path").attr("d", function(d) { return lineoverall(d.values); })
    //     .attr('fill','none')
    //     .attr('stroke','green')
    //     .attr('stroke-width','3')
    //     .attr("transform", "translate(0,"+(height/3)+")");

    // lines.append("path").attr("d", function(d) { return lineoverall(d.values); })
    //     .attr('fill','none')
    //     .attr('stroke','green')
    //     .attr('stroke-width','3')
    //     .attr("transform", "translate(0,"+(2*height/3)+")");

    //prima comp
    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('fill','none')
        .attr('stroke','Chartreuse');
    
    //seconda
    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('fill','none')
        .attr('stroke','Chartreuse')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terza
    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('fill','none')
        .attr('stroke','Chartreuse')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    //primo grafo duration
    lines.append("path").attr("d", function(d) { return lineduration(d.values); })
        .attr('fill','none')
        .attr('stroke','PaleGreen');

    //secondo 
    lines.append("path").attr("d", function(d) { return linedurationstacked(d.values); })
        .attr('fill','none')
        .attr('stroke','PaleGreen')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terzo
    lines.append("path").attr("d", function(d) { return linedurationstacked(d.values); })
        .attr('fill','none')
        .attr('stroke','PaleGreen')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    //primo revital
    lines.append("path").attr("d", function(d) { return linerev(d.values); })
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine');

    //secondo
    lines.append("path").attr("d", function(d) { return linerevstacked(d.values); })
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terzo
    lines.append("path").attr("d", function(d) { return linerevstacked(d.values); })
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    //primo cuore
    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2');
        
    //secondo
    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terzo
    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    lines.append("path").attr("d", function(d) { return linedeep(d.values); })
        .attr('fill','none')
        .attr('stroke-width','1')
        .attr('stroke','LightPink');

    lines.append("path").attr("d", function(d) { return linerestlessness(d.values); })
        .attr('fill','none')
        .attr('stroke-width','1')
        .attr('stroke','PaleTurquoise');

    lines.append("path").attr("d", function(d) { return linestmin(d.values); })
        .attr('fill','none')
        .attr('stroke','DodgerBlue');

    lines.append("path").attr("d", function(d) { return linestmax(d.values); })
        .attr('fill','none')
        .attr('stroke','Tomato');

    lines.append("path").attr("d", function(d) { return linespioggia(d.values); })
        .attr('fill','none')
        .attr('stroke','CornflowerBlue');

    //leggend
    // primo grafico
    svg.append('circle')
        .attr('cx',50)
        .attr('cy',height/3-65)
        .attr('r',6)
        .style('fill','green')
    svg.append('text')
        .attr('x',60)
        .attr('y',height/3-65)
        .text('overall score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',50)
        .attr('cy',height/3-35)
        .attr('r',6)
        .style('fill','PaleGreen')
    svg.append('text')
        .attr('x',60)
        .attr('y',height/3-35)
        .text('duration score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')
    
    svg.append('circle')
        .attr('cx',160)
        .attr('cy',height/3-65)
        .attr('r',6)
        .style('fill','Chartreuse')
    svg.append('text')
        .attr('x',170)
        .attr('y',height/3-65)
        .text('composition score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',160)
        .attr('cy',height/3-35)
        .attr('r',6)
        .style('fill','MediumAquaMarine')
    svg.append('text')
        .attr('x',170)
        .attr('y',height/3-35)
        .text('revitalization score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',400)
        .attr('cy',height/3-65)
        .attr('r',6)
        .style('fill','DarkRed')
    svg.append('text')
        .attr('x',410)
        .attr('y',height/3-65)
        .text('heart rate')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',300)
        .attr('cy',height/3-65)
        .attr('r',6)
        .style('fill','PaleTurquoise')
    svg.append('text')
        .attr('x',310)
        .attr('y',height/3-65)
        .text('restlessness')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',300)
        .attr('cy',height/3-35)
        .attr('r',6)
        .style('fill','LightPink')
    svg.append('text')
        .attr('x',310)
        .attr('y',height/3-35)
        .text('deep sleep minutes')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle') 

    // secondo grafico
    // svg.append('circle')
    //     .attr('cx',50)
    //     .attr('cy',(2*height)/3-65)
    //     .attr('r',6)
    //     .style('fill','green')
    // svg.append('text')
    //     .attr('x',60)
    //     .attr('y',(2*height)/3-65)
    //     .text('overall score')
    //     .style('font-size','15px')
    //     .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',50)
        .attr('cy',(2*height)/3-35)
        .attr('r',6)
        .style('fill','PaleGreen')
    svg.append('text')
        .attr('x',60)
        .attr('y',(2*height)/3-35)
        .text('duration score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',50)
        .attr('cy',(2*height)/3-65)
        .attr('r',6)
        .style('fill','Chartreuse')
    svg.append('text')
        .attr('x',60)
        .attr('y',(2*height)/3-65)
        .text('composition score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',350)
        .attr('cy',(2*height)/3-35)
        .attr('r',6)
        .style('fill','MediumAquaMarine')
    svg.append('text')
        .attr('x',360)
        .attr('y',(2*height)/3-35)
        .text('revitalization score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')
        
    svg.append('circle')
        .attr('cx',50)
        .attr('cy',(2*height)/3-35)
        .attr('r',6)
        .style('fill','PaleGreen')
    svg.append('text')
        .attr('x',60)
        .attr('y',(2*height)/3-35)
        .text('duration score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',350)
        .attr('cy',(2*height)/3-65)
        .attr('r',6)
        .style('fill','DarkRed')
    svg.append('text')
        .attr('x',360)
        .attr('y',(2*height)/3-65)
        .text('heart rate')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',200)
        .attr('cy',(2*height)/3-65)
        .attr('r',6)
        .style('fill','blue')
    svg.append('text')
        .attr('x',210)
        .attr('y',(2*height)/3-65)
        .text('temperatura minima')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',200)
        .attr('cy',(2*height)/3-35)
        .attr('r',6)
        .style('fill','Red')
    svg.append('text')
        .attr('x',210)
        .attr('y',(2*height)/3-35)
        .text('temperatura massima')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    // terzo grafico
    // svg.append('circle')
    //     .attr('cx',50)
    //     .attr('cy',height-65)
    //     .attr('r',6)
    //     .style('fill','green')
    // svg.append('text')
    //     .attr('x',60)
    //     .attr('y',height-65)
    //     .text('overall score')
    //     .style('font-size','15px')
    //     .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',50)
        .attr('cy',height-65)
        .attr('r',6)
        .style('fill','Chartreuse')
    svg.append('text')
        .attr('x',60)
        .attr('y',height-65)
        .text('composition score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')
        
    svg.append('circle')
        .attr('cx',50)
        .attr('cy',height-35)
        .attr('r',6)
        .style('fill','PaleGreen')
    svg.append('text')
        .attr('x',60)
        .attr('y',height-35)
        .text('duration score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',350)
        .attr('cy',height-65)
        .attr('r',6)
        .style('fill','DarkRed')
    svg.append('text')
        .attr('x',360)
        .attr('y',height-65)
        .text('heart rate')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    // svg.append('circle')
    //     .attr('cx',200)
    //     .attr('cy',height-65)
    //     .attr('r',6)
    //     .style('fill','CornflowerBlue')
    // svg.append('text')
    //     .attr('cx',210)
    //     .attr('cy',height-65)
    //     .text('precipitazioni')
    //     .style('font-size','15px')
    //     .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',200)
        .attr('cy',height-65)
        .attr('r',6)
        .style('fill','CornflowerBlue')
    svg.append('text')
        .attr('x',210)
        .attr('y',height-65)
        .text('precipitazioni')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',200)
        .attr('cy',height-35)
        .attr('r',6)
        .style('fill','MediumAquaMarine')
    svg.append('text')
        .attr('x',210)
        .attr('y',height-35)
        .text('revitalization score')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    // //add event
    // svg.selectAll('path')
    //     .on('mouseover', handleMouseOver)

})

// // event handler
// const handleMouseOver = (d,i,n) => {
//     console.log(n[i]);   //OK
//     d3.select(n[i]) 
//         // .attr('fill','black')
//         // .append('div')
//     svg.append('text')
//         .attr('text-anchor', 'middle')
//         .attr('x', 200)
//         .attr('y',200)
//         .text('prova')
// }