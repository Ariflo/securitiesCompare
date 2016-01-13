// you want to find out which series has the maximum return
// not just what the max return is

function findPercentageReturnAndOrderSeries(series) {
    for (var i = series.length - 1; i >= 0; i--) {
      var start = series[i].series[0];
      var end = series[i].series[series[i].series.length -1];
      series[i].returnVal = returnValOfSeries(start, end);

    }

    
    series.sort(function(series1, series2){
        return series1.returnVal - series2.returnVal;
    });
    return series;
    
}

function returnValOfSeries(start, end) {
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

console.log('hello');

module.exports = {
    'findPercentageReturnAndOrderSeries': findPercentageReturnAndOrderSeries,
    'returnValOfSeries' : returnValOfSeries
};
