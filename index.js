const width = 960;
const height = 500;
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

dataset.then(function(data) {
    const slices = data.columns.slice(1).map(function() {   //function(id)
        return {
            // id: id,
            values: data.map(function(d){
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
    const yScale1 = d3.scaleLinear().rangeRound([height, 0]);
    const yScale2 = d3.scaleTime().range([height,0]);
    const yScale3 = d3.scaleLinear().rangeRound([height,0]);
    const yScale4 = d3.scaleLinear().range([height,0]);

    //update scale
    xScale.domain(d3.extent(data, function(d){
        return  d3.timeParse("%d/%m/%Y")(d.data)})); //data!!
    yScale1.domain([(0), d3.max(slices, function(c) {
        return d3.max(c.values, function(d) {
            return d.overall_score; });
            })
        ]);
    yScale2.domain(d3.extent(data, function(d){
        return timeH(d.tramonto)}));
    yScale3.domain([0,35]);
    yScale4.domain([0,1]);
    // yScale3.domain([d3.min(slices, function(c) {
    //         return d3.min(c.values, function(d) {
    //             return d.tmin; });
    //             }), d3.max(slices, function(c) {
    //         return d3.max(c.values, function(d) {
    //             return d.tmax; });
    //             })
    //         ]);
    
    //define axis
    const yaxis1 = d3.axisLeft().scale(yScale1); 
    const yaxis2 = d3.axisLeft().scale(yScale2);
    const yaxis3 = d3.axisLeft().scale(yScale3);
    const xaxis = d3.axisBottom().scale(xScale).ticks(((slices[0].values).length-2)/7);    // 174/7 abbiamo slices.values.length - intestazio - ultima riga vuota  

    //draw axis 
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis)
        .selectAll('text').attr("transform", "rotate(-45)").attr("text-anchor", "end");

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'green')
        .attr("transform", "translate(15,0)")   //sposto per mettere diversi assi
        .call(yaxis1);

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'red')
        .attr("transform", "translate(-10,0)")  //sposto per mettere diversi assi 
        .call(yaxis3);

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'orange')
        .attr("transform", "translate("+(width-10)+",0)") //sposto per mettere diversi assi 
        .call(yaxis2)
        .selectAll('text').attr("transform", "translate("+40+",0)").attr("text-anchor", "end");

    rectsii = svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("11/12/19")))
        .attr("y", 0)
        .attr('class','sii')
        .attr("width", 1)
        .attr("height", height)
        .attr('fill','black');

    rectml =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("16/12/19")))
        .attr("y", 0)
        .attr('class','ml')
        .attr("width", 1)
        .attr("height", height)
        .attr('fill','black');

    rectcyber =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("27/01/20")))
        .attr("y", 0)
        .attr('class','cyber')
        .attr("width", 1)
        .attr("height", height)
        .attr('fill','black');

    const rectsrain = svg.selectAll('rect').data(slices).enter()
        .append('g')
    rectsrain.append("rect")
        .attr("x", function(d) { return xScale(d.date); })
        .attr("y", 0)
        .attr("width", 1)
        .attr("height", 20)
        .attr('fill','blue');

    const lineoverall = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.overall_score); });

    const linecomp = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.composition_score); });

    const linerev = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(d.revitalization_score));});

    const lineduration = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(d.duration_score));});

    const lineheartrate = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(d.resting_heart_rate));});

    const linetramonto = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale2(d.tramonto));});

    const linestmin = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale3(d.tmin));});

    const linestmax = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale3(d.tmax));});

    const lines = svg.selectAll("lines").data(slices).enter()
        .append("g");

    lines.append("path").attr("d", function(d) { return lineoverall(d.values); })
        .attr('fill','none')
        .attr('stroke','green')
        .attr('stroke-width','2');

    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('fill','none')
        .attr('stroke','Chartreuse');

    lines.append("path").attr("d", function(d) { return linerev(d.values); })
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine');

    lines.append("path").attr("d", function(d) { return lineduration(d.values); })
        .attr('fill','none')
        .attr('stroke','PaleGreen');

    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2');

    lines.append("path").attr("d", function(d) { return linetramonto(d.values); })
        .attr('fill','none')
        .attr('stroke','orange');

    lines.append("path").attr("d", function(d) { return linestmin(d.values); })
        .attr('fill','none')
        .attr('stroke','DodgerBlue');

    lines.append("path").attr("d", function(d) { return linestmax(d.values); })
        .attr('fill','none')
        .attr('stroke','Tomato');

})