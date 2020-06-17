// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// append the svg object to the body of the page
// var svg = d3.select("body")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + (300+margin.top) + ")");

//Read the data
d3.csv("./datasets/solare/soletot.csv",

  // When reading the csv, I must format variables:
  function(d){
        // console.log(d3.timeParse("%d/%m/%Y")(d.Data));
        // console.log( d3.timeParse("%H:%M")(d.Alba));
        return { date : d3.timeParse("%d/%m/%Y")(d.Data),  value : d3.timeParse("%H:%M")(d.Alba)}
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, (width/3) ]);
    svg.append("g")
      .attr('class','alba')
      .attr("transform", "translate(0," + 200 + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.value; }))
      .range([ 200, 0 ]);
    svg.append("g")
        .attr('class','alba')
        .attr("transform", "translate(0," + height/2-50 + ")")
        .call(d3.axisLeft(y));

        console.log(1000);
        console.log(x(1000))

    // Add the line
    svg.append("path")
      .datum(data)
      .attr('class','alba')
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})

//Read the data
d3.csv("./datasets/piogge/pluviotot.csv",

  // When reading the csv, I must format variables:
  function(d){
        console.log(d3.timeParse("%d/%m/%Y")(d.Data));
        // console.log( d3.timeParse("%H:%M")(d.Alba));
        return { date : d3.timeParse("%d/%m/%Y")(d.Data),  value : d.Dato_pluviometrico_giornaliero}
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([0, (width/3) ]);
    svg.append("g")
      .attr("transform", "translate("+x((width/3)+50)+","+(height)+")")
      .call(d3.axisBottom(x));


    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0,d3.max(data, function(d) { return d.value; })])
      .range([ 200,0 ]);
    svg.append("g")
      .attr("transform", "translate("+x((width/3)+50)+","+y(height-200)+" )")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("transform", "translate("+x((width/3)+50)+","+y(height)+")")
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})