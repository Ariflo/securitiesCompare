google.charts.load('current', {
    'packages': ['line']
});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Date');
    data.addColumn('number', 'Stock 1');
    data.addColumn('number', 'Stock 2');
    data.addColumn('number', 'Stock 3');


    console.log("BAAAAAM");
    // ajax 

    var localUrl = "http://localhost:3000/dash/eric/search?tickerval1=aapl&tickerval2=goog&tickerval3=amzn&num=100";

    $.get(localUrl, function(data) {
        console.log("BAAAAAM", data);
    });

    // drawChart();

    console.log("yo");


    var options = {
        chart: {
            title: 'Momentum of your three stocks',
            subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
    };

    // var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, options);
}
