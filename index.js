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

    const xScale = d3.scaleTime().range([0,width]);
    const yScale1 = d3.scaleLinear().rangeRound([height, 0]);
    const yScale2 = d3.scaleTime().range([height,0]);
    xScale.domain(d3.extent(data, function(d){
        return  d3.timeParse("%d/%m/%Y")(d.data)})); //data!!
    yScale1.domain([(0), d3.max(slices, function(c) {
        return d3.max(c.values, function(d) {
            return d.overall_score; });
            })
        ]);
    yScale2.domain(d3.extent(data, function(d){
        return timeH(d.tramonto)}));
    
    const yaxis1 = d3.axisLeft().scale(yScale1); 
    const yaxis2 = d3.axisLeft().scale(yScale2);
    const xaxis = d3.axisBottom().scale(xScale).ticks(174/7);    

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis)
        .selectAll('text').attr("transform", "rotate(-45)").attr("text-anchor", "end");

    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'blue')
        .call(yaxis1);
    svg.append("g")
        .attr("class", "axis")
        .attr('stroke', 'red')
        .attr("transform", "translate("+width+",0)")
        .call(yaxis2)
        .selectAll('text').attr("transform", "translate("+40+",0)").attr("text-anchor", "end");

    rect =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("11/12/19")))
        .attr("y", 0)
        .attr('class','sii')
        .attr("width", 1)
        .attr("height", height)
        .attr('fill','black');

    rect =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("16/12/19")))
        .attr("y", 0)
        .attr('class','ml')
        .attr("width", 1)
        .attr("height", height)
        .attr('fill','black');

    rect =  svg.append("rect")
        .attr("x",  xScale(d3.timeParse("%d/%m/%Y")("27/01/20")))
        .attr("y", 0)
        .attr('class','cyber')
        .attr("width", 1)
        .attr("height", height)
        .attr('fill','black');

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

    const lines = svg.selectAll("lines").data(slices).enter()
        .append("g");
        //     d3.line().x(xScale(d3.timeParse("%d/%m/%Y")("06/12/2019")))

    lines.append("path").attr("d", function(d) { return lineoverall(d.values); })
        .attr('fill','none')
        .attr('stroke','blue');

    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('fill','none')
        .attr('stroke','#0058F0');

    lines.append("path").attr("d", function(d) { return linerev(d.values); })
        .attr('fill','none')
        .attr('stroke','#1758BC');

    lines.append("path").attr("d", function(d) { return lineduration(d.values); })
        .attr('fill','none')
        .attr('stroke','#00A0E6');

    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('fill','none')
        .attr('stroke','black');

    lines.append("path").attr("d", function(d) { return linetramonto(d.values); })
        .attr('fill','none')
        .attr('stroke','red');

})