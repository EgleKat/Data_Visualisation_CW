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
		var ndx = crossfilter(data);
		var nationalityDimension = ndx.dimension(function(d) {return d["Nationality"];});
		var nationalityCount = nationalityDimension.group().reduceSum(function(d) {return d["Total"];});


		var prisonChart = dc.rowChart("#prison_chart");

		prisonChart
		.width(768)
		.height(480)
		.x(d3.scaleLinear())
		.elasticX(true)
		.dimension(nationalityDimension)
		.group(nationalityCount)
		.colors(d3.scaleOrdinal().domain(["native", "foreign"])
			.range(["#00FF00", "#7CFC00"]))
		.colorAccessor(function(d,i) {
			if (data[i]["UK Nationals"] === "Yes") {
				console.log("yes");
				return "native";
			}
			return "foreign";
		})
		.render();
	});

