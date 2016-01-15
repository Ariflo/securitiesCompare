$(document).ready(function(){

	$("#symbolsearch").autocomplete({
		source: function (request, response) {
		        $.ajax({
			        url: "http://dev.markitondemand.com/api/v2/Lookup/jsonp",
			        dataType: "jsonp",
			        data: {
			            input: request.term
			        },
		        	
		        	success: function (data) {
			            var symbolList = $.map(data, function(item) {
			               return item.Symbol;
			            });
			            
			            response(symbolList);
		        		}
		    	});
		    },
		    minLength: 0,
		    appendTo: "#stock1",
		    messages:{
			    noResults: '',
			    results: function() {}
			}
		});

	

	$("#symbolsearch2").autocomplete({
		source: function (request, response) {
		        $.ajax({
			        url: "http://dev.markitondemand.com/api/v2/Lookup/jsonp",
			        dataType: "jsonp",
			        data: {
			            input: request.term
			        },
		        	
		        	success: function (data) {
			            var symbolList = $.map(data, function(item) {
			               return item.Symbol;
			            });
			            
			            response(symbolList);
		        		}
		    	});
		    },
		    minLength: 0,
		    appendTo: "#stock2",
		    messages:{
			    noResults: '',
			    results: function() {}
			}
		});

	$("#symbolsearch3").autocomplete({
		source: function (request, response) {
		        $.ajax({
			        url: "http://dev.markitondemand.com/api/v2/Lookup/jsonp",
			        dataType: "jsonp",
			        data: {
			            input: request.term
			        },
		        	
		        	success: function (data) {
			            var symbolList = $.map(data, function(item) {
			               return item.Symbol;
			            });
			            
			            response(symbolList);
		        		}
		    	});
		    },
		    minLength: 0,
		    appendTo: "#stock3",
		    messages:{
			    noResults: '',
			    results: function() {}
			}
		});

	var portfolioLi;
	var outputArea = $("#portfolioDropdown");

	$('.dropdown-toggle').on('click', function(){

		    var portfolioQueryRequest;
		    var searchUrl = "/portfolio";

		    // Generate the request object
		    portfolioQueryRequest = $.ajax({
		        type: "GET",
		        dataType: 'json',
		        url: searchUrl
		    });

		    // Attach the callback for success 
		    // (We could have used the success callback directly)
		    portfolioQueryRequest.done(function (data) {

		      var portfolios = data;
		
		      // // Clear the output area
		      outputArea.html('');

		      for(var i = 0; i<portfolios.length; i++){

		      	  portfolioLi = ("<li><a href='/portfolio/"+ portfolios[i].portfolio_name +"'>"+ portfolios[i].portfolio_name + "<a></li>");
		      	  outputArea.prepend(portfolioLi);
		      }

		    });

		    // Attach the callback for failure 
		    // (Again, we could have used the error callback direcetly)
		    portfolioQueryRequest.fail(function (error) {
		      console.log("Something Failed During Request:")
		      console.log(error);
		    });
	});


	$('#stockSubmitBtn').on('click', function(e){
		e.preventDefault();
		var tickerval1 = $('#symbolsearch').val();
		var tickerval2 = $('#symbolsearch2').val();
		var tickerval3 = $('#symbolsearch3').val();
		var timePeriod = $("input[name='num']").val();

		var searchUrl = "/admin/dash/search?tickerval1=" + tickerval1+ "&tickerval2="+tickerval2+"&tickerval3="+tickerval3+"&num="+timePeriod
		console.log(searchUrl);
		var queryRequest = $.ajax({
		    type: "GET",
		    dataType: 'json',
		    url: searchUrl
		});

		queryRequest.done(function(data){
			console.log(data);
		});

		queryRequest.fail(function (error) {
		  console.log("Something Failed During Request:")
		  console.log(error);
		});
	});
});

