var express = require('express');
var router = express.Router();
var knex = require ("../db/knex");

/* GET users listing. */
router.get('/edit', function(req, res, next) {
	knex('clients').where({id: req.session.id}).first().then(function(user){
		res.render('edit', {title:"Momentum Investments", name: user.name, phone: user.phone, address: user.address});
	});
});

router.get('/settings', function(req, res, next) {
	knex('clients').where({id: req.session.id}).first().then(function(user){
		res.render('settings', {title:"Momentum Investments", name: user.name, phone: user.phone, address: user.address});
	});
});

module.exports = router;
