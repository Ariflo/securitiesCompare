var express = require('express');
var locus = require('locus');
var router = express.Router();
var knex = require ("../db/knex");
var pg = require('pg');
var locus = require('locus');
var bcrypt = require('bcrypt');
var methodOverride = require("method-override");

router.use(methodOverride('_method'));

router.get('/:clientName', function(req, res){
	if(req.session === null){
		res.redirect('/');	
	}else{
		knex('clients').where({id: req.session.id}).first().then(function(user){
			if(user){
				res.render('dashboard', { title: 'Momentum Investments', name: user.name, phone: user.phone, address: user.address});	
			}else{
				res.redirect('/');	
			}
		});

	}
	
});

/* POST user info to Dashboard. */
router.post('/:clientName', function(req, res, next) {
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
							res.render('dashboard', { title: 'Momentum Investments', name:req.body.name, phone: req.body.phone,  address: req.body.address});
						});
					});
				});
			}
		});
	}
});

router.put('/:clientName', function(req, res, next){

	knex('clients').where({email: req.body.email}).first().then(function(user){
		if(user){
			var pass = req.body.password;
			bcrypt.compare(pass, user.password, function(err, result){
				if(result){
					req.session.id = user.id; 
					req.session.name = user.name;
					req.session.phone = user.phone;
					req.session.address = user.address; 

					res.render('dashboard', {title: 'Momentum Investments', id: req.session.id, name: req.session.name, phone: user.phone,  address: user.address}); 
				}else{
					res.render('signinErr', {title: 'Momentum Investments'});
				}
			});
		}else{
			res.render('signinErr', {title: 'Momentum Investments'});
		}
	});
	
});


router.get('/:client/signout', function(req, res){
	req.session = null;
	res.redirect('/');
});

module.exports = router;