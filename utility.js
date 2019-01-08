function AddXAxis(chartToUpdate, displayText) {
	chartToUpdate.svg()
	.append("text")
	//.attrs("class", "x-axis-label")
	.attr("text-anchor", "middle")
	.attr("x", chartToUpdate.width() / 2)
	.attr("y", chartToUpdate.height()+10)
	.text(displayText);
	chartToUpdate.svg()
	.attr("height", chartToUpdate.height()+20);
}

function AddYAxis(chartToUpdate, displayText) {
	chartToUpdate.svg()
	.append("text")
	.attr("class", "y-axis-label y-label")
	.attr("text-anchor", "middle")
	.attr("x", -1*chartToUpdate.height()/2)
	.attr("y", 20)
	//.attr("transform","translate(-225,184),rotate(-90)")
	.attr("transform","rotate(-90)")
	.text(displayText);

	chartToUpdate.svg()
	.attr("width", chartToUpdate.width()+20)};

function zoom() {
  bars.attr("transform", "translate(" + d3.event.translate[0]+",0)scale(" + d3.event.scale + ",1)");

  chart.select(".x.axis")
    .attr("transform", "translate(" + d3.event.translate[0]+","+(height)+")")
    .call(xAxis.scale(x.rangeRoundBands([0, width * d3.event.scale],.1 * d3.event.scale)));

  chart.select(".y.axis")
    .call(yAxis);
}
//<text transform="translate(12,184),rotate(-90)" class="y-axis-label y-label" text-anchor="middle">Percentage</text>