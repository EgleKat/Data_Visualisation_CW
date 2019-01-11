
//load data
d3.csv("data/prison_nationality.csv").then(function(data) {
	
		//dimensions
		var accent = d3.scaleOrdinal(["#814bff","#ffc04b","#ffa41c"]).domain(["native", "foreign", "eu"]);
			var ndx = crossfilter(data);
			var nationalityDimension = ndx.dimension(function(d) {return d["Nationality"];});
				var nationalityCount = nationalityDimension.group().reduceSum(function(d) {return d["Total"];});

					var prisonChart = dc.rowChart("#prison_row_chart");

						prisonChart
						.width(600)
							.height(500)
								.dimension(nationalityDimension)
									.group(nationalityCount)
										.colors(accent)
											.elasticX(true)
												.legend(dc.legend())
													.colorAccessor(function(d,i) {
														var obj = data.find(function(dataobj) {return dataobj["Nationality"] === d.key;});
														if(d.key === "EEA European"){
															return "eu";
														}
														else if (obj["UK Nationals"] === "Yes") {
															return "native";
														}
														return "foreign";
													})
													.x(d3.scaleLinear().domain([0,80000]).range([0,prisonChart.width()-50]))
		//.clipPadding(10)
		.render();
			prisonChart.xAxis().scale(prisonChart.x())
				AddYAxis(prisonChart, "Nationality");	

		//bar graph
		var regionDimension = ndx.dimension(function(d) {return d["Region"];} );
			var nationalityPercentage = regionDimension.group().reduceSum(function(d) {
				return d["Total"]/d["Total in UK"]*100;});

				var prisonChartBar = dc.barChart("#prison_bar_chart");

					prisonChartBar
					.width(500)
						.height(400)
							.xUnits(dc.units.ordinal)
								.x(d3.scaleBand())
		//	.y(d3.scaleLinear().range([0,100]))
		.elasticX(true)
			.dimension(regionDimension)
				.group(nationalityPercentage)
					.xAxisLabel("Nationality")
						.yAxisLabel("",30)
							.colors(accent)
								.outerPadding(5)
									.colorAccessor(function(d,i) {
										if(d.key === "EEA European")
											return "eu";
										else if(d.key === "UK-born") {
											return "native";
										}
										return "foreign";
									})
									.render();
										AddYAxis(prisonChartBar,"Percentage");
									});



// d3.csv("data/employment_ratio.csv").then(function(data) {

// 	var stackedChart = dc.barChart("#employment_stacked_chart");

// 	var ndx = crossfilter(data);
// 	var nationalityDimension = ndx.dimension(function (d) {return d["Nationality"];})
// 	var employmentGroup = nationalityDimension.group().reduce(function(p, v) {
// 		p[v.Status] = (p[v.Status] || 0) + v.Ratio;
// 		return p;
// 	}, function(p, v) {
// 		p[v.Status] = (p[v.Status] || 0) - v.Ratio;
// 		return p;
// 	}, function() {
// 		return {};
// 	});
// 	function sel_stack(i) {
// 		return function(d) {
// 			return d.value[i];
// 		};
// 	}

// 	console.log(data);

// 	stackedChart
// 	.width(768)
// 	.height(480)
// 	.x(d3.scaleOrdinal().domain([1,21]))
// 	.margins({left: 80, top: 20, right: 10, bottom: 20})
// 	.brushOn(false)
// 	.clipPadding(10)
// 	.title(function(d) {
// 		return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
// 	})
// 	.dimension(nationalityDimension)
// 	.group(employmentGroup, "1", sel_stack('1'))
// 	.renderLabel(true);
// 	chart.legend(dc.legend());


// 	// dc.override(stackedChart, 'legendables', function() {
// 	// 	var items = stackedChart._legendables();
// 	// 	return items.reverse();
// 	// });
// 	for(var i = 2; i<6; ++i)
// 		stackedChart.stack(employmentGroup, ''+i, sel_stack(i));
// 	chart.render();

// });

d3.csv("data/nhs_expenditure_nationality.csv").then(function(data) {

	var nhsBarChart = dc.barChart("#nhs_bar_chart");

		var ndx = crossfilter(data);

		var nationalityDimension = ndx.dimension(function(d) {return d["Nationality"];} );
			var expenditureGroup = nationalityDimension.group().reduceSum(function(d){return d["Cost"];});
				var filterDimension = ndx.dimension(function(d) {return d["Nationality"];} );

					nhsBarChart
					.width(600)
						.height(600)
							.xUnits(dc.units.ordinal)
								.x(d3.scaleBand())
									.elasticX(true)
										.elasticY(true)
											.dimension(nationalityDimension)
												.group(expenditureGroup)
													.xAxisLabel("Nationality",20)
														.yAxisLabel("",50)
															.outerPadding(5)
																.colors(d3.scaleOrdinal(["#ff9d0a","#9a8de6","#9172ff	","#cb3dff"]))
																	.colorAccessor(function (d, i){console.log(i);	return i;})
																		.render();

																			AddYAxis(nhsBarChart, "GBP (Millions)");
																			filterDimension.filterFunction(multivalue_filter(["EU (visitors and residents)","Non-EU (~12% is covered)"]));
																				var budgetActive = false;

																				document.getElementById("nhs_button").addEventListener("click", function(){
																					if(budgetActive){
			//apply filter to exclude nhs budget
			filterDimension.filterFunction(multivalue_filter(["EU (visitors and residents)","Non-EU (~12% is covered)"]));
			budgetActive = false;
		}else{
			filterDimension.filterAll();
			budgetActive = true;
		}
		redrawAll();
	}); 
	redrawAll();

});

		var redrawAll = function() {
			dc.redrawAll();
			var svg = $('#prison_row_chart svg');
			svg.attr("height", svg.height()+20);

		}