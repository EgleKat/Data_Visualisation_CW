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
		.height(480)
		.x(d3.scaleLinear())
		.elasticX(true)
		.dimension(nationalityDimension)
		.group(nationalityCount)
		.colors(accent)
		.colorAccessor(function(d,i) {
			if (data[i]["UK Nationals"] === "Yes") {
				return "native";
			}
			return "foreign";
		})
		.render();


		var regionDimension  =ndx.dimension(function(d) {return d["Region"];} );
 		var nationalityPercentage = regionDimension.group().reduceSum(function(d) {return d["Total"]/d["Total in UK"]*100;});

		var prisonChartBar = dc.barChart("#prison_bar_chart");

		prisonChartBar
		.width(768)
		.height(480)
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


// d3.csv("data/prison_nationality_percentage.csv").then(function(data) {
// 	console.log(data);

//  	// data.forEach(function (x) {
//  	// 	return {
//  	// 		nationality: x["Nationality"],
//  	// 		total: x["Total"]
//  	// 	};
//  	// });
// 		//dimensions
// 		var ndx = crossfilter(data);
// 		var nationalityDimension = ndx.dimension(function(d) {return d["Nationality"];});
// 		var nationalityPercentage = nationalityDimension.group().reduceSum(function(d) {return d["Number in Prisons"]/d["Total in UK"]*100;});


// 		var prisonChartBar = dc.barChart("#prison_bar_chart");

// 		prisonChartBar
// 		.width(768)
// 		.height(480)
// 		.xUnits(dc.units.ordinal)
// 		.x(d3.scaleBand())
// 		.elasticX(true)
// 		.dimension(nationalityDimension)
// 		.group(nationalityPercentage)
// 		.xAxisLabel("Nationality")
// 		.yAxisLabel("Percentage")
// 		// .label(function(d) {
// 		// 	return d.data.value * 100 + '%';
// 		// })
// 		.render();

// 		dc.config.defaultColors(d3.schemeAccent);




// 	});
