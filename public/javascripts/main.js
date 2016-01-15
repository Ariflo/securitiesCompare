 // find out which series has the maximum return


 function findPercentageReturnAndOrderSeries(series) {
	for (var i = series.length - 1; i >= 0; i--) {
	         var start = series[i].series[0];
	         var end = series[i].series[series[i].series.length - 1];
	         series[i].returnVal = returnValOfSeries(start, end);
	}

	series.sort(function(series1, series2) {
	         return series1.returnVal - series2.returnVal;
	});

	return series;
}

function organizeRows(series){
	var processedSeries = findPercentageReturnAndOrderSeries(series);
	var chartData = processedSeries;
	var rows = new Array();

	for (var c = 0; c < chartData[0].dates.length; c++) {
	       rows.push([chartData[0].dates[c], chartData[0].series[c], chartData[1].series[c], chartData[2].series[c]]);
	}
	var rowNum =    rows.map(function(item){
		parseInt(item, 10);
	});      
	return rowNum;
}


 function returnValOfSeries(start, end) {
     	return (end - start) / start * 100;
 }


 module.exports = {
	'findPercentageReturnAndOrderSeries': findPercentageReturnAndOrderSeries,
	'returnValOfSeries': returnValOfSeries,
	'organizeRows': organizeRows
 };
