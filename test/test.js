  var code = require('../main');
  var expect = require('chai').expect;
  var main = require('../main.js');

  describe('findPercentageReturnAndOrderSeries', function() {
  	// setup - create arrays
  	var series = [
  	{
        tickerName: 'AAPL',
        series: [110.78,111.31,110.78,109.5,112.12,111.6,111.79,110.21,111.86,111.04,111.73,113.77,113.76,115.5,119.08,115.28,114.55,119.27,120.53,119.5,121.18,122.57,122,120.92,121.06,120.57,116.77,116.11,115.72,112.34,114.175,113.69,117.29,118.78,119.3,117.75,118.88,118.03,117.81,118.3,117.34,116.28,115.2,119.03,118.28,118.23,115.62,116.17,113.18,112.48,110.49,111.34,108.98,106.03,107.33,107.23,108.61,108.03,106.82,108.74,107.32,105.26,105.35,102.71,100.7,96.45,96.96,98.53,98.87]
    }
    ];


  	//write tests, call function with arrays from above
    it('RUNS WITHOUT THROWING AN ERROR', function(){
    	main.findPercentageReturnAndOrderSeries(series);
    });

    it('Puts return values in each object', function(){
    	main.findPercentageReturnAndOrderSeries(series);
    	console.log(series)
    	return series[0].returnVal == 33.33;
    })



  });


