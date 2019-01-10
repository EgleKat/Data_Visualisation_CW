


d3.csv('data/employment_ratio_2.csv')
.then(function(data) {

// Setup svg using Bostock's margin convention

var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select("#employment_stacked_chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Transpose the data into layers
// var dataset = d3.stack(["Employed", "Unemployed", "Economically Inactive"].map(function(economicStatus) {
//   return data.map(function(d) {
//     return {x: (d["Nationality"]), y: +d[economicStatus]};
//   }); 
// }));

var stack = d3.stack()
.keys(["Employed", "Unemployed", "Economically Inactive"])
.order(d3.stackOrderNone)
.offset(d3.stackOffsetNone);

dataset = stack(data);






var x = d3.scaleOrdinal(d3.schemeAccent)
.domain(["Employed", "Unemployed", "Economically Inactive"]);

// Set x, y and colors
// var x = d3.scale.ordinal()
// .domain(["Employed", "Unemployed", "Economically Inactive"])
// //.domain(dataset[0].map(function(d) { console.log(d); return d.x; }))
// .range([10, width-10]);

  
// var y = d3.scale.linear()
// .domain([0, 100])
// .range([height,0]);

    //(d3.scaleLinear().domain([0,80000]).range([0,prisonChart.width()]))


var colors = ["#d25c4d", "#f2b447", "#d9d574"];


// Define and draw axes
var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(5)
.tickSize(-width, 0, 0)
.tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.ticks(3);
svg.append("g")
.attr("class", "y axis")
.call(yAxis);

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
.data(dataset)
.enter().append("g")
.attr("class", "cost")
.style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
.data(function(d) { return d; })
.enter()
.append("rect")
.attr("x", function(d) { return x(d.x); })
.attr("y", function(d) { return y(d.y0 + d.y); })
.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
.attr("width", x.rangeBand())
.on("mouseover", function() { tooltip.style("display", null); })
.on("mouseout", function() { tooltip.style("display", "none"); })
.on("mousemove", function(d) {
  var xPosition = d3.mouse(this)[0] - 15;
  var yPosition = d3.mouse(this)[1] - 25;
  tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
  tooltip.select("text").text(d.y);
});


// Draw legend
var legend = svg.selectAll(".legend")
.data(colors)
.enter().append("g")
.attr("class", "legend")
.attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

legend.append("rect")
.attr("x", width - 18)
.attr("width", 18)
.attr("height", 18)
.style("fill", function(d, i) {return colors.slice().reverse()[i];});

legend.append("text")
.attr("x", width + 5)
.attr("y", 9)
.attr("dy", ".35em")
.style("text-anchor", "start")
.text(function(d, i) { 
  switch (i) {
    case 0: return "Employed";
    case 1: return "Unemployed";
    case 2: return "Economically Inactive";
  }
});


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
.attr("class", "tooltip")
.style("display", "none");

tooltip.append("rect")
.attr("width", 30)
.attr("height", 20)
.attr("fill", "white")
.style("opacity", 0.5);

tooltip.append("text")
.attr("x", 15)
.attr("dy", "1.2em")
.style("text-anchor", "middle")
.attr("font-size", "12px")
.attr("font-weight", "bold");
});
