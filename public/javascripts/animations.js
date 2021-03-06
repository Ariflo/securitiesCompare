$(function(){

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


});
