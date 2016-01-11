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


});
