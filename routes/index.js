var express = require('express');
var router = express.Router();
var knex = require ("../db/knex");

/* GET home page. */
router.get('/', function(req, res, next) {
	
	knex('clients').where({id: req.session.id}).first().then(function(user){

		if(user){
			res.render('index', { title: 'Momentum Investments', name: user.name});
		}else{
			res.render('index', { title: 'Momentum Investments', name: 'client'});
		}

	});
});

module.exports = router;
