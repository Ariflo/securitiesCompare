var express = require('express');
var locus = require('locus');
var router = express.Router();
var knex = require ("../db/knex");
var pg = require('pg');
var locus = require('locus');
var bcrypt = require('bcrypt');


/* POST user info to Dashboard. */
router.post('/dash', function(req, res, next) {
	if (req.body.password !== req.body.pwConfirm){
		res.render("passwordMatchErr", { title: 'Momentum Investments' });

	}else if(req.body.password.length < 8){
		res.render("passwordLengthErr" , { title: 'Momentum Investments' });

	}else{
		knex('clients').where({email: req.body.email}).first().then(function(user){
			if(user){
				res.render('emailCopyErr' , { title: 'Momentum Investments' });
			}else{
				bcrypt.genSalt(10, function(err, salt){

					bcrypt.hash(req.body.password, salt, function(err, hash){

						knex('clients').insert({name: req.body.name, company: req.body.company, email: req.body.email, phone: req.body.phone, address: req.body.address, password: hash}).then(function(){
							res.render('dashboard', { title: 'Momentum Investments' });
						});
					});
				});
			}
		});
	}
});

module.exports = router;