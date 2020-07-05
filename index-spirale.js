const radians = 0.0174532925;

//CHART CONSTANTS
const chartRadius = 250;
const chartWidth = chartRadius * 2;
const chartHeight = chartRadius * 2;
const labelRadius = chartRadius + 5;
const margin = { "top": 40, "bottom": 40, "left": 50, "right": 40 };
const days = ["domenica","lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];



//CHART OPTIONS
const holeRadiusProportion = 0.3; //fraction of chartRadius. 0 gives you some pointy arcs in the centre.
const holeRadius = holeRadiusProportion * chartRadius;
const segmentsPerCoil = 7; //number of coils. for this example, I have 12 months per year. But you change to whatever suits your data. 
const segmentAngle = 360 / segmentsPerCoil;
var coils; //number of coils, based on data.length / segmentsPerCoil
var coilWidth; //remaining chartRadius (after holeRadius removed), divided by coils + 1. I add 1 as the end of the coil moves out by 1 each time

//SCALES
var colour1 = d3.scaleSequential(d3.interpolatePuBu);
var colour2 = d3.scaleSequential(d3.interpolatePuBu);
var colour3 = d3.scaleSequential(d3.interpolatePuBu);
var colour4 = d3.scaleSequential(d3.interpolatePuBu);


//CREATE svg1 AND A G PLACED IN THE CENTRE OF THE svg1
const svg1 = d3.select("div#chart")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom);

const svg2 = d3.select("div#chart")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom);

const svg3 = d3.select("div#chart")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom);

const svg4 = d3.select("div#chart")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom);

const g1 = svg1.append("g")
    .attr("transform", "translate("
    + (margin.left + chartRadius)
    + ","
    + (margin.top + chartRadius) + ")");

g1.append('text').text('OVERALL').attr("transform", "translate(-40,0)");

const g2 = svg2.append("g")
    .attr("transform", "translate("
    + (margin.left + chartRadius)
    + ","
    + 300 +")");

g2.append('text').text('REVITALIZATION').attr("transform", "translate(-65,0)");

const g3 = svg3.append("g")
    .attr("transform", "translate("
    + 300
    + ","
    + (margin.top + chartRadius) + ")");

g3.append('text').text('DURATION').attr("transform", "translate(-40,0)");

const g4 = svg4.append("g")
    .attr("transform", "translate("
    + 300
    + ","
    + 300 + ")");

g4.append('text').text('COMPOSITION').attr("transform", "translate(-60,0)");

//LOAD THE DATA
const dataset = d3.csv('./dataset_sleep_sprial.csv');

dataset.then(function(data) {

    var dataLength = data.length;
    
    coils = Math.ceil(dataLength / segmentsPerCoil);
    console.log(coils);
    coilWidth = (chartRadius * (1 - holeRadiusProportion)) / (coils + 1);
    //console.log("coilWidth: " + coilWidth);
    var dataExtent1 = d3.extent(data, function (d) { return d.overall_score; });
    colour1.domain(dataExtent1);
    var dataExtent2 = d3.extent(data, function (d) { return d.revitalization_score; });
    colour2.domain(dataExtent2);
    var dataExtent3 = d3.extent(data, function (d) { return d.duration_score; });
    colour3.domain(dataExtent3);
    var dataExtent4 = d3.extent(data, function (d) { return d.composition_score; });
    colour4.domain(dataExtent4);

    var daysLabels1 = g1.selectAll(".days-label")
    .data(days)
    .enter()
    .append("g")
    .attr("class", "days-label");

    var daysLabels2 = g2.selectAll(".days-label")
    .data(days)
    .enter()
    .append("g")
    .attr("class", "days-label");

    var daysLabels3 = g3.selectAll(".days-label")
    .data(days)
    .enter()
    .append("g")
    .attr("class", "days-label");

    var daysLabels4 = g4.selectAll(".days-label")
    .data(days)
    .enter()
    .append("g")
    .attr("class", "days-label");    

    daysLabels1.append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) {
            let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
            return x(labelAngle, labelRadius);
        })
        .attr("y", function (d, i) {
            let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
            return y(labelAngle, labelRadius);
        })
        .style("text-anchor", function (d, i) {
            return i < (days.length / 2) ? "start" : "end";
        });

    daysLabels1.append("line")
        .attr("x2", function (d, i) {
            let lineAngle = (i * segmentAngle);
            let lineRadius = chartRadius + 10;
            return x(lineAngle, lineRadius);
        })
        .attr("y2", function (d, i) {
            let lineAngle = (i * segmentAngle);
            let lineRadius = chartRadius + 10;
            return y(lineAngle, lineRadius);
        });

    daysLabels2.append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) {
            let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
            return x(labelAngle, labelRadius);
        })
        .attr("y", function (d, i) {
            let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
            return y(labelAngle, labelRadius);
        })
        .style("text-anchor", function (d, i) {
            return i < (days.length / 2) ? "start" : "end";
    });
    
    daysLabels2.append("line")
            .attr("x2", function (d, i) {
                let lineAngle = (i * segmentAngle);
                let lineRadius = chartRadius + 10;
                return x(lineAngle, lineRadius);
            })
            .attr("y2", function (d, i) {
                let lineAngle = (i * segmentAngle);
                let lineRadius = chartRadius + 10;
                return y(lineAngle, lineRadius);
    });    

    daysLabels3.append("text")
    .text(function (d) { return d; })
    .attr("x", function (d, i) {
        let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
        return x(labelAngle, labelRadius);
    })
    .attr("y", function (d, i) {
        let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
        return y(labelAngle, labelRadius);
    })
    .style("text-anchor", function (d, i) {
        return i < (days.length / 2) ? "start" : "end";
    });

    daysLabels3.append("line")
            .attr("x2", function (d, i) {
                let lineAngle = (i * segmentAngle);
                let lineRadius = chartRadius + 10;
                return x(lineAngle, lineRadius);
            })
            .attr("y2", function (d, i) {
                let lineAngle = (i * segmentAngle);
                let lineRadius = chartRadius + 10;
                return y(lineAngle, lineRadius);
    });   

    daysLabels4.append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) {
            let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
            return x(labelAngle, labelRadius);
        })
        .attr("y", function (d, i) {
            let labelAngle = (i * segmentAngle) + (segmentAngle / 2);
            return y(labelAngle, labelRadius);
        })
        .style("text-anchor", function (d, i) {
            return i < (days.length / 2) ? "start" : "end";
        });

    daysLabels4.append("line")
            .attr("x2", function (d, i) {
                let lineAngle = (i * segmentAngle);
                let lineRadius = chartRadius + 10;
                return x(lineAngle, lineRadius);
            })
            .attr("y2", function (d, i) {
                let lineAngle = (i * segmentAngle);
                let lineRadius = chartRadius + 10;
                return y(lineAngle, lineRadius);
    });       

    //ASSUMINDATA IS SORTED, CALCULATE EACH DATA POINT'S SEGMENT VERTICES
    data.forEach(function (d, i) {

        let coil = Math.floor(i / segmentsPerCoil);
        let position = i - (coil * segmentsPerCoil);

        //console.log("positions: " + i + " " + coil + " " + position);

        let startAngle = position * segmentAngle;
        let endAngle = (position + 1) * segmentAngle;

        //console.log("angles: " + startAngle + " " + endAngle);
        //console.log(holeRadius + " " + segmentsPerCoil + " " + coilWidth)

        let startInnerRadius = holeRadius + ((i / segmentsPerCoil) * coilWidth)
        let startOuterRadius = holeRadius + ((i / segmentsPerCoil) * coilWidth) + coilWidth;
        let endInnerRadius = holeRadius + (((i + 1) / segmentsPerCoil) * coilWidth)
        let endOuterRadius = holeRadius + (((i + 1) / segmentsPerCoil) * coilWidth) + coilWidth;

        //console.log("start radi: " + startInnerRadius + " " + startOuterRadius);
        //console.log("end radi: " + endInnerRadius + " " + endOuterRadius);

        //vertices of each segment
        d.x1 = x(startAngle, startInnerRadius);
        d.y1 = y(startAngle, startInnerRadius);

        d.x2 = x(endAngle, endInnerRadius);
        d.y2 = y(endAngle, endInnerRadius);

        d.x3 = x(endAngle, endOuterRadius);
        d.y3 = y(endAngle, endOuterRadius);

        d.x4 = x(startAngle, startOuterRadius);
        d.y4 = y(startAngle, startOuterRadius);

        //CURVE CONTROL POINTS
        let midAngle = startAngle + (segmentAngle / 2)
        let midInnerRadius = holeRadius + (((i + 0.5) / segmentsPerCoil) * coilWidth)
        let midOuterRadius = holeRadius + (((i + 0.5) / segmentsPerCoil) * coilWidth) + coilWidth;

        //MID POINTS, WHERE THE CURVE WILL PASS THRU
        d.mid1x = x(midAngle, midInnerRadius);
        d.mid1y = y(midAngle, midInnerRadius);

        d.mid2x = x(midAngle, midOuterRadius);
        d.mid2y = y(midAngle, midOuterRadius);

        //FROM https://stackoverflow.com/questions/5634460/quadratic-b%C3%A9zier-curve-calculate-points
        d.controlPoint1x = (d.mid1x - (0.25 * d.x1) - (0.25 * d.x2)) / 0.5;
        d.controlPoint1y = (d.mid1y - (0.25 * d.y1) - (0.25 * d.y2)) / 0.5;

        d.controlPoint2x = (d.mid2x - (0.25 * d.x3) - (0.25 * d.x4)) / 0.5;
        d.controlPoint2y = (d.mid2y - (0.25 * d.y3) - (0.25 * d.y4)) / 0.5;

        //console.log(d);

    });

    var arcs1 = g1.selectAll(".arc")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "arc");

    var arcs2 = g2.selectAll(".arc")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "arc");

    var arcs3 = g3.selectAll(".arc")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "arc");

    var arcs4 = g4.selectAll(".arc")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "arc");

    //CURVED EDGES
    arcs1.append("path")
        .attr("d", function (d) {
            //start at vertice 1
            let start = "M " + d.x1 + " " + d.y1;
            //inner curve to vertice 2
            let side1 = " Q " + d.controlPoint1x + " " + d.controlPoint1y + " " + d.x2 + " " + d.y2;
            //straight line to vertice 3
            let side2 = "L " + d.x3 + " " + d.y3;
            //outer curve vertice 4
            let side3 = " Q " + d.controlPoint2x + " " + d.controlPoint2y + " " + d.x4 + " " + d.y4;
            //combine into string, with closure (Z) to vertice 1
            return start + " " + side1 + " " + side2 + " " + side3 + " Z"
        })
        .style("fill", function (d) { return colour1(d.overall_score); })
        .style("stroke", "white")

    arcs2.append("path")
        .attr("d", function (d) {
            //start at vertice 1
            let start = "M " + d.x1 + " " + d.y1;
            //inner curve to vertice 2
            let side1 = " Q " + d.controlPoint1x + " " + d.controlPoint1y + " " + d.x2 + " " + d.y2;
            //straight line to vertice 3
            let side2 = "L " + d.x3 + " " + d.y3;
            //outer curve vertice 4
            let side3 = " Q " + d.controlPoint2x + " " + d.controlPoint2y + " " + d.x4 + " " + d.y4;
            //combine into string, with closure (Z) to vertice 1
            return start + " " + side1 + " " + side2 + " " + side3 + " Z"
        })
        .style("fill", function (d) { return colour2(d.revitalization_score); })
        .style("stroke", "white")

    arcs3.append("path")
        .attr("d", function (d) {
            //start at vertice 1
            let start = "M " + d.x1 + " " + d.y1;
            //inner curve to vertice 2
            let side1 = " Q " + d.controlPoint1x + " " + d.controlPoint1y + " " + d.x2 + " " + d.y2;
            //straight line to vertice 3
            let side2 = "L " + d.x3 + " " + d.y3;
            //outer curve vertice 4
            let side3 = " Q " + d.controlPoint2x + " " + d.controlPoint2y + " " + d.x4 + " " + d.y4;
            //combine into string, with closure (Z) to vertice 1
            return start + " " + side1 + " " + side2 + " " + side3 + " Z"
        })
        .style("fill", function (d) { return colour3(d.duration_score); })
        .style("stroke", "white")

    arcs4.append("path")
        .attr("d", function (d) {
            //start at vertice 1
            let start = "M " + d.x1 + " " + d.y1;
            //inner curve to vertice 2
            let side1 = " Q " + d.controlPoint1x + " " + d.controlPoint1y + " " + d.x2 + " " + d.y2;
            //straight line to vertice 3
            let side2 = "L " + d.x3 + " " + d.y3;
            //outer curve vertice 4
            let side3 = " Q " + d.controlPoint2x + " " + d.controlPoint2y + " " + d.x4 + " " + d.y4;
            //combine into string, with closure (Z) to vertice 1
            return start + " " + side1 + " " + side2 + " " + side3 + " Z"
        })
        .style("fill", function (d) { return colour4(d.composition_score); })
        .style("stroke", "white")

});

function x(angle, radius) {
    //change to clockwise
    let a = 360 - angle;
    //start from 12 o'clock
    a = a + 180;
    return radius * Math.sin(a * radians);
};

function y(angle, radius) {
    //change to clockwise
    let a = 360 - angle;
    //start from 12 o'clock
    a = a + 180;
    return radius * Math.cos(a * radians);
};