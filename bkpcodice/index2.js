// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const svg1 = d3.select('body')
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    const svg2 = d3.select('body')
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

d3.csv('./dataset_sleep.csv').then( data => {
    
    var tempo = d3.timeParse("%d/%m/%Y");

    const x = d3.scaleBand()
        .domain(data.map(datapoint => tempo(datapoint.data)))
        .range(0,width);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.overall_score )])
        .range([ height, 0 ]);

    const shapes = svg1.selectAll('svg').data(data);

    const groups = shapes.enter().append('g')
        
    groups.append('rect')
        .attr('x', (d,i) => (i+1)*10)
        .attr('y', 10)
        .attr('width', 3)
        .attr('height', d => ((y(d.overall_score))))
        .attr('fill','orange')

})
d3.csv('./datasets/piogge/pluviotot.csv').then( data => {

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Dato_pluviometrico_giornaliero )])
        .range([ height, 0 ]);

    const shapes = svg2.selectAll('svg').data(data);

    const groups = shapes.enter().append('g')
        
    groups.append('rect')
        .attr('x', (d,i) => (i+1)*10)
        .attr('y', 10)
        .attr('width', 3)
        .attr('height', d => ((y(1/d.Dato_pluviometrico_giornaliero))))
        .attr('fill','green')

})