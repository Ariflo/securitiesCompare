var express = require('express');
var locus = require('locus');
var router = express.Router();
var knex = require ("../db/knex");
var pg = require('pg');
var locus = require('locus');
var bcrypt = require('bcrypt');
var methodOverride = require("method-override");
var request = require('request');

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
		res.render("passwordMatchErr", { title: 'Momentum Investments', name:req.body.name, phone: req.body.phone,  address: req.body.address});

	}else if(req.body.password.length < 8){
		res.render("passwordLengthErr" , { title: 'Momentum Investments', name:req.body.name, phone: req.body.phone,  address: req.body.address});

	}else{
		knex('clients').where({email: req.body.email}).first().then(function(user){
			if(user){
				res.render('emailCopyErr' , { title: 'Momentum Investments', name: user.name, phone: user.phone, address: user.address});
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

					res.render('dashboard', {title: 'Momentum Investments', id: req.session.id, name: req.session.name, phone: user.phone,  address: user.address, company: user.company, email: user.email}); 
				}else{
					res.render('signinErr', {title: 'Momentum Investments', name:req.body.name, phone: req.body.phone,  address: req.body.address});
				}
			});
		}else{
			res.render('signinErr', {title: 'Momentum Investments', name:req.body.name, phone: req.body.phone,  address: req.body.address});
		}
	});
	
});

router.get('/:clientName/search', function(req, res){

	var num = req.query.num;
	var tickerVal1 = req.query.tickerval1;
	var tickerVal2 = req.query.tickerval2;
	var tickerVal3 = req.query.tickerval3;
	// var tickerVal4 = req.query.tickerval4;
	// var tickerVal5 = req.query.tickerval5;
	// var tickerVal6 = req.query.tickerval6;

	function promisifyGet(url) {
	    return new Promise(function(resolve, reject) {

	        request.get(url, function(error, response, body) {
	            if (error) {
	                reject(error);
	            } else {
	                resolve(response);
	            }
	        });
	    });
	};
	
	var url1 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A" + num + "%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + tickerVal1 + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
	var p1 = promisifyGet(url1);
	
	var url2 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A" + num + "%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + tickerVal2 + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
	var p2 = promisifyGet(url2);
	
	var url3 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A" + num + "%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + tickerVal3 + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
	var p3 = promisifyGet(url3);
	
         // var url4 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A" + num + "%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + tickerVal3 + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
         // var p4 = promisifyGet(url3);

         // var url5 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A" + num + "%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + tickerVal3 + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
         // var p5 = promisifyGet(url3);

         // var url6 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A" + num + "%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + tickerVal3 + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
         // var p6 = promisifyGet(url3);
	    
	//add 3 more promises for the GEM
	var promiseAll = Promise.all([p1, p2, p3]);
	//p4,p5,p6

	//responses is an array, one entry for each response
	promiseAll.then(function(responses) {
	 //*****THIS IS WHERE WE CRUNCH THE NUMBERS*********
	});
});

router.get('/:clientName/signout', function(req, res){
	req.session = null;
	res.redirect('/');
});


module.exports = router;