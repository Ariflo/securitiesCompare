var express = require('express');
var router = express.Router();
var knex = require ("../db/knex");
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/edit', function(req, res, next) {
	knex('clients').where({id: req.session.id}).first().then(function(user){
		var pass = user.password.slice(0,20)
		res.render('edit', {title:"Momentum Investments", name: user.name, company: user.company, email: user.email, phone: user.phone, address: user.address, password: pass});
	}); 
});

router.post('/edit', function(req, res, next) {

	if (req.body.password !== req.body.pwConfirm){
		res.render("passwordMatchErrEdit", { title: 'Momentum Investments', name: req.body.name, company: req.body.company, email: req.body.email, phone: req.body.phone, address: req.body.address});

	}else if(req.body.password.length < 8){
		res.render("passwordLengthErrEdit" , { title: 'Momentum Investments', name: req.body.name, company: req.body.company, email: req.body.email, phone: req.body.phone, address: req.body.address});

	}else{			
		bcrypt.genSalt(10, function(err, salt){

			bcrypt.hash(req.body.password, salt, function(err, hash){

				knex('clients').where({id: req.session.id}).first().update({name: req.body.name, company: req.body.company, email: req.body.email, phone: req.body.phone, address: req.body.address, password: hash}).then(function(){
					res.redirect('/'+ req.body.name + '/dash');
				});
			});
		});
	}
});

router.get('/settings', function(req, res, next) {
	knex('clients').where({id: req.session.id}).first().then(function(user){
		knex('portfolios').where({client_id: user.id}).then(function(portfolios){ 
			res.render('settings', {title:"Momentum Investments", name: user.name, phone: user.phone, address: user.address, portfolios:portfolios});
		})
	});
});


router.get('/settings/delete', function(req, res, next) {
	knex('clients').where({id: req.session.id}).first().del().then(function(){
		req.session = null;
		res.redirect('/');
	});
});

module.exports = router;
