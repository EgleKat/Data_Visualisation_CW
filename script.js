//load data
//
d3.csv("data/prison_nationality.csv").then(function(data) {
	console.log(data);

 	// data.forEach(function (x) {
 	// 	return {
 	// 		nationality: x["Nationality"],
 	// 		total: x["Total"]
 	// 	};
 	// });
		//dimensions
		var accent = d3.scaleOrdinal(d3.schemeAccent).domain(["native", "foreign"]);
		var ndx = crossfilter(data);
		var nationalityDimension = ndx.dimension(function(d) {return d["Nationality"];});
		var nationalityCount = nationalityDimension.group().reduceSum(function(d) {return d["Total"];});
		
		var prisonChart = dc.rowChart("#prison_row_chart");

		prisonChart
		.width(768)
		.height(500)
		.dimension(nationalityDimension)
		.group(nationalityCount)
		.colors(accent)
		.elasticX(false)
		.colorAccessor(function(d,i) {
			if (data[i]["UK Nationals"] === "Yes") {
				return "native";
			}
			return "foreign";
		})
		.x(d3.scaleLinear().domain([0,80000]).range([0,prisonChart.width()]))
		//.clipPadding(10)
		.render();
	 	prisonChart.xAxis().scale(prisonChart.x())
		AddXAxis(prisonChart, "Number of People");
		
		//bar graph
		var regionDimension = ndx.dimension(function(d) {return d["Region"];} );
 		var nationalityPercentage = regionDimension.group().reduceSum(function(d) {return d["Total"]/d["Total in UK"]*100;});

		var prisonChartBar = dc.barChart("#prison_bar_chart");

		prisonChartBar
		.width(500)
		.height(400)
		.xUnits(dc.units.ordinal)
		.x(d3.scaleBand())
		.elasticX(true)
		.dimension(regionDimension)
		.group(nationalityPercentage)
		.xAxisLabel("Nationality")
		.yAxisLabel("Percentage")
		.colors(accent)
		.colorAccessor(function(d,i) {
			if(d.key === "UK-born") {
				return "native";
			}
			return "foreign";
		})
		.render();



		dc.config.defaultColors(d3.schemeAccent);




	});
