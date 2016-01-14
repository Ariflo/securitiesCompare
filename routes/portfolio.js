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
			res.render('dashboardSavedResults',{title: 'Momentum Investments', name: req.session.name, phone: req.session.phone, address: req.session.address, ticker1:tickers[0], ticker2:tickers[1], ticker3:tickers[2], portName: req.params.portfolioName});	
		});		
	});
});

// router.put('/:portfolioName', function(req, res, next) {
// 	knex('portfolios').where({portfolio_name: req.params.portfolioName}).first().then(function(portfolio){
// 		knex('securities').where({portfolio_id: portfolio.id}).pluck('ticker').then(function(tickers){
// 			res.render('dashboardSavedResults',{title: 'Momentum Investments', name: req.session.name, phone: req.session.phone, address: req.session.address, ticker1:tickers[0], ticker2:tickers[1], ticker3:tickers[2], portName:});	
// 		});		
// 	});
// });


module.exports = router;