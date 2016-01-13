 function findPercentageReturnAndOrderSeries(series) {
 	var start, end;

	     for (var i = series.length - 1; i >= 0; i--) {
		       start = series[i].series[0];
		       end = series[i].series[series[i].series.length -1];
		       series[i].returnVal = _returnValOfSeries(start, end);
		}

	     series.sort(function(series1, series2){
	         return  series2.returnVal - series1.returnVal;
	     });

	     return series;
     
 }
 
 function _returnValOfSeries(start, end) {
   return (end - start) / start * 100;
 }
 
 // function x(series) {
 //     var arrStart = series1[0];
 
 //     // var arrStart = response.Elements[0].DataSeries.close.values[0];
 
 //     var valuesLength = response.Elements[0].DataSeries.close.values.length;
 //     var arrEnd = response.Elements[0].DataSeries.close.values[valuesLength - 1];
 
 //     //calculations code
 
 //     var returnedVal = returnValOfSeries(arrStart, arrEnd);
 //     finalValues.push(returnedVal);
 
 //     return returnedVal;
 
 // }
 
 module.exports = {
     'findPercentageReturnAndOrderSeries': findPercentageReturnAndOrderSeries,
     'returnValOfSeries' : _returnValOfSeries
 };
