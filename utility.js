function AddXAxis(chartToUpdate, displayText) {
	chartToUpdate.svg()
	.append("text")
	.attr("text-anchor", "middle")
	.attr("x", chartToUpdate.width() / 2)
	.attr("y", chartToUpdate.height()+10)
	.text(displayText);
	chartToUpdate.svg()
	.attr("height", chartToUpdate.height()+20);
}