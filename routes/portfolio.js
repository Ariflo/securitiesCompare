var express = require('express');
var router = express.Router();
var knex = require ("../db/knex");


router.get('/', function(req, res, next) {
	knex('portfolios').where({client_id:req.session.id}).then(function(portfolios){
		res.send(portfolios);	
	});
});

router.post('/', function(req, res, next) {

	knex('clients').where({id: req.session.id}).first().then(function(user){
		knex('portfolios').insert({client_id:user.id, portfolio_name:req.body.portName}).then(function(){
			knex('portfolios').where({portfolio_name:req.body.portName}).first().then(function(portfolio){
				knex('securities').insert([{client_id: portfolio.client_id, portfolio_id: portfolio.id, ticker:req.body.tickerval1},{client_id: portfolio.client_id, portfolio_id: portfolio.id, ticker:req.body.tickerval2},{client_id: portfolio.client_id, portfolio_id: portfolio.id, ticker:req.body.tickerval3}]).then(function(){
						res.redirect('/'+ req.session.name+'/dash');
				});
			});
		});
	});
});

router.get('/:portfolioName', function(req, res, next) {
	knex('portfolios').where({portfolio_name: req.params.portfolioName}).first().then(function(portfolio){
		knex('securities').where({portfolio_id: portfolio.id}).pluck('ticker').then(function(tickers){
			req.session.portName = req.params.portfolioName;
			req.session.portId = portfolio.id;
			res.render('dashboardSavedResults',{title: 'Momentum Investments', name: req.session.name, phone: req.session.phone, address: req.session.address, ticker1:tickers[0], ticker2:tickers[1], ticker3:tickers[2], portName: req.params.portfolioName});	
		});		
	});
});

router.put('/:portfolioName', function(req, res, next) {
	if(req.body.portName !== req.session.portName || req.body.tickerval1 !== req.session.ticker1 || req.body.tickerval2 !== req.session.ticker2 || req.body.tickerval3 !== req.session.ticker3){
		knex('portfolios').where({id: req.session.portId}).update({portfolio_name: req.body.portName}).then(function(){
				knex('securities').where({portfolio_id: req.session.portId, ticker:req.session.ticker1}).update({ticker:req.body.tickerval1}).then(function(){
					knex('securities').where({portfolio_id: req.session.portId, ticker:req.session.ticker2}).update({ticker:req.body.tickerval2}).then(function(){
						knex('securities').where({portfolio_id: req.session.portId, ticker:req.session.ticker3}).update({ticker:req.body.tickerval3}).then(function(){
							res.redirect('/'+req.session.name+'/dash');
						});
					});
				});
			});			
	}else{
		res.redirect('/'+req.session.name+'/dash');
	}		
});

// router.delete ('/:portfolioName', function(req, res, next) {
// 	knex('portfolios').where({portfolio_name: req.params.portfolioName}).first().then(function(portfolio){
// 		knex('securities').where({portfolio_id: portfolio.id}).pluck('ticker').then(function(tickers){
// 			res.render('dashboardSavedResults',{title: 'Momentum Investments', name: req.session.name, phone: req.session.phone, address: req.session.address, ticker1:tickers[0], ticker2:tickers[1], ticker3:tickers[2], portName:});	
// 		});		
// 	});
// });


module.exports = router;