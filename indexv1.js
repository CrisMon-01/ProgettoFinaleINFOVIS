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
    const yScale2 = d3.scaleTime().range([(height/3-150), 0]);    //tramonto
    const yScale3 = d3.scaleLinear().rangeRound([(2*(height/3)-150), (height/3)]);    //tmp 
    const yScale4 = d3.scaleLinear().range([height-150,2*height/3]); //pioggia

    //update scale
    xScale.domain(d3.extent(data, function(d){
        console.log("PROVA1 "+ d.data);
        console.log("PROVA2 "+ d3.timeParse("%d/%m/%Y")(d.data));
        return  d3.timeParse("%d/%m/%Y")(d.data)})); //data!!
    yScale1.domain([(0),d3.max(data,d => d.overall_score)]);
    yScale2.domain(d3.extent(data, function(d){
        return timeH(d.tramonto)}));
    yScale3.domain([0,d3.max(data,d => Math.round(d.tmax))]);   //valori non interi! 
    yScale4.domain([0,d3.max(data,d => Math.round(d.pioggia))]);

    //define axis
    const yaxis1 = d3.axisLeft().scale(yScale1); 
    const yaxis2 = d3.axisLeft().scale(yScale2);
    const yaxis3 = d3.axisLeft().scale(yScale3);
    const yaxis4 = d3.axisLeft().scale(yScale4);
    var xaxis = d3.axisBottom().scale(xScale).ticks(((slices[0].values).length-2)/7);    // 174/7 abbiamo slices.values.length - intestazio - ultima riga vuota  

    //draw axis 
    //fitbit 2 tramonto
    svg.append("g")
        .attr("class", "xaxis")
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
        .attr('stroke', 'orange')
        .attr("transform", "translate("+(width-10)+",0)") //sposto per mettere diversi assi 
        .call(yaxis2)
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

    const lineoverall = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.overall_score); });

    const linecomp = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.composition_score); });

    const linerev = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(Math.round(d.revitalization_score)+Math.round(d.composition_score)));});
        
    const lineduration = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale1(Math.round(d.duration_score)+Math.round(d.revitalization_score)+Math.round(d.composition_score)));});

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

    const linespioggia = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return (yScale4(d.pioggia));});

        var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    

    const lines = svg.selectAll("lines").data(slices).enter();
      
    lines.append('g')
         .attr("clip-path", "url(#clip)");
    
    
    // Add brushing
    var brush1 = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,(height/3)-90] ] )
        .on("end", updateChart)  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    
    var brush2 = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,(height/3)-30], [width,(2*height/3)-90] ] )
        .on("end", updateChart)
  
    var brush3 = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,(2*height/3)-20], [width,(height-90)] ] ) 
        .on("end", updateChart)

    lines.append("g")
        .attr("class", "brush1")
        .call(brush1);

    lines.append("g")
        .attr("class", "brush2")
        .call(brush2);

    lines.append("g")
        .attr("class", "brush3")
        .call(brush3);


    //con lo stacked graph sono informazioni ridondanti
    //primo overall
    lines.append("path").attr("d", function(d) { return lineoverall(d.values); })
        .attr('class','graph1')
        .attr('fill','none')
        .attr('stroke','green')
        .attr('stroke-width','3')
          
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
        .attr('class','graph1')
        .attr('fill','none')
        .attr('stroke','Chartreuse');
        
    
    //seconda
    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('class','graph2')
        .attr('fill','none')
        .attr('stroke','Chartreuse')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terza
    lines.append("path").attr("d", function(d) { return linecomp(d.values); })
        .attr('class','graph3')
        .attr('fill','none')
        .attr('stroke','Chartreuse')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    //primo grafo duration
    lines.append("path").attr("d", function(d) { return lineduration(d.values); })
        .attr('class','graph1')
        .attr('fill','none')
        .attr('stroke','PaleGreen');

    //secondo 
    lines.append("path").attr("d", function(d) { return lineduration(d.values); })
        .attr('class','graph2')
        .attr('fill','none')
        .attr('stroke','Chartreuse')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terzo
    lines.append("path").attr("d", function(d) { return lineduration(d.values); })
        .attr('class','graph3')
        .attr('fill','none')
        .attr('stroke','Chartreuse')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    //primo revital
    lines.append("path").attr("d", function(d) { return linerev(d.values); })
        .attr('class','graph1')
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine');

    //secondo
    lines.append("path").attr("d", function(d) { return linerev(d.values); })
        .attr('class','graph2')
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terzo
    lines.append("path").attr("d", function(d) { return linerev(d.values); })
        .attr('class','graph3')
        .attr('fill','none')
        .attr('stroke','MediumAquaMarine')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    //primo cuore
    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('class','graph1')
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2');
        
    //secondo
    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('class','graph2')
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2')
        .attr("transform", "translate(0,"+(height/3)+")");

    //terzo
    lines.append("path").attr("d", function(d) { return lineheartrate(d.values); })
        .attr('class','graph3')
        .attr('fill','none')
        .attr('stroke','DarkRed')
        .attr('stroke-width','2')
        .attr("transform", "translate(0,"+(2*height/3)+")");

    lines.append("path").attr("d", function(d) { return linetramonto(d.values); })
        .attr('class','tramonto')
        .attr('fill','none')
        .attr('stroke','orange')
    
    lines.append("path").attr("d", function(d) { return linestmin(d.values); })
        .attr('class','graph2')
        .attr('fill','none')
        .attr('stroke','DodgerBlue');

    lines.append("path").attr("d", function(d) { return linestmax(d.values); })
        .attr('class','graph2')
        .attr('fill','none')
        .attr('stroke','Tomato');

    lines.append("path").attr("d", function(d) { return linespioggia(d.values); })
        .attr('class','graph3')
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
        .style('fill','orange')
    svg.append('text')
        .attr('x',310)
        .attr('y',height/3-65)
        .text('tramonto')
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

    svg.append('circle')
        .attr('cx',350)
        .attr('cy',height-35)
        .attr('r',6)
        .style('fill','CornflowerBlue')
    svg.append('text')
        .attr('x',360)
        .attr('y',height-35)
        .text('precipitazioni')
        .style('font-size','15px')
        .attr('alignment-baseline', 'middle')

    svg.append('circle')
        .attr('cx',200)
        .attr('cy',height-65)
        .attr('r',6)
        .style('fill','Chartreuse')
    svg.append('text')
        .attr('x',210)
        .attr('y',height-65)
        .text('composition score')
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

        var idleTimeout
        function idled() { idleTimeout = null; }
    
        function updateChart() {

         extent = d3.event.selection;
         console.log("PEOVA3 "+ xScale.invert(extent[0]));
         console.log("PEOVA3 "+ xScale.invert(extent[1]));
        
         
           
        xScale.domain([xScale.invert(extent[0]),xScale.invert(extent[1])]);
        //line.select(".brush1").call(brush1.move, null);

        xaxis=d3.axisBottom().scale(xScale).ticks(((slices[0].values).length-2)/7); 

        svg.select('.xaxis').transition().duration(1000);
        
        lines
          .select('.graph1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.overall_score) })
          )
  
          // zoom();
}

})
