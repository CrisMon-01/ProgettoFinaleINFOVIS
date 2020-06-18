// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select('body')
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv('./dataset_sleep.csv').then( data => {
    // console.log(data[0]);    //prima linea csv
    // console.log(data[0].sleep_log_entry_id); //campo del csv
    // console.log(data);
    var tempo = d3.timeParse("%d/%m/%Y");

    // console.log(tempo(data[0].date))

    const punti = svg.append('g')
        .attr('class','punti');

    const punto = punti.selectAll('.punti')
        .data(data);

    const group = punto.enter().append('g')

    // console.log(data.map(item => item.date))
    // console.log(data.map(item => item.date)[0])

    // When reading the csv, I must format variables:
    // data.date = data => {d3.timeParse("%Y-%m-%d")(d.date)}
    for(var i = 0; i<(data.map(item => item.date)).length; i++){
        var tempo = d3.timeParse("%d/%m/%Y");
        console.log(tempo(data.map(item => item.date)[i])); //OK
    }

    var x = d3.scaleTime()
       .domain(d3.extent(data, function(d) { return tempo(d); }))
       .range([ 0, width ]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.overall_score )])
        .range([ height, 0 ]);

    // const punti = svg.append('g')
    //     .attr('class','punti');

    // const punto = punti.selectAll('.punti')
    //     .data(data);

    // // const group = punto.enter().append('circle')
    // //     attr('cx', x())

    // svg.append("path")
    // .datum(data)
    // .attr("fill", "none")
    // .attr("stroke", "steelblue")
    // .attr("stroke-width", 1.5)
    // .attr("d", d3.line()
    //   .x(function(d) { return x(tempo) })
    //   .y(function(d) { return y(d.overall_score) })
    //   );

    // // Add X axis --> it is a date format
    // var x = d3.scaleTime()
    //    .domain(d3.extent(data, function(d) { return d.date; }))
    //    .range([ 0, width ]);
    //  svg.append("g")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(d3.axisBottom(x));

    // // Add Y axis
    // var y = d3.scaleLinear()
    //    .domain([0, d3.max(data, function(d) { return +d.overall_score; })])
    //    .range([ height, 0 ]);
    //  svg.append("g")
    //    .call(d3.axisLeft(y));

    //       // Add the line
    // svg.append("path")
    // .datum(data)
    // .attr("fill", "none")
    // .attr("stroke", "steelblue")
    // .attr("stroke-width", 1.5)
    // .attr("d", d3.line()
    //   .x(function(d) { return x(d.date) })
    //   .y(function(d) { return y(d.overall_score) })
    //   );

  });  