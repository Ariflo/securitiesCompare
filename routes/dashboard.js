var express = require('express');
var locus = require('locus');
var router = express.Router();
var knex = require("../db/knex");
var pg = require('pg');
var locus = require('locus');
var bcrypt = require('bcrypt');
var methodOverride = require("method-override");
var request = require('request');
var bodyParser = require('body-parser');

var finMath = require('../main');

router.use(methodOverride('_method'));


router.get('/:clientName', function(req, res) {
    if (req.session === null) {
        res.redirect('/');
    } else {
        knex('clients').where({
            id: req.session.id
        }).first().then(function(user) {
            if (user) {
                res.render('dashboard', {
                    title: 'Momentum Investments',
                    name: user.name,
                    phone: user.phone,
                    address: user.address
                });
            } else {
                res.redirect('/');
            }
        });
    }
});

/* POST user info to Dashboard. */
router.post('/:clientName', function(req, res, next) {
    if (req.body.password !== req.body.pwConfirm) {
        res.render("passwordMatchErr", {
            title: 'Momentum Investments',
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address
        });

    } else if (req.body.password.length < 8) {
        res.render("passwordLengthErr", {
            title: 'Momentum Investments',
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address
        });

    } else {
        knex('clients').where({
            email: req.body.email
        }).first().then(function(user) {
            if (user) {
                res.render('emailCopyErr', {
                    title: 'Momentum Investments',
                    name: user.name,
                    phone: user.phone,
                    address: user.address
                });
            } else {
                bcrypt.genSalt(10, function(err, salt) {

                    bcrypt.hash(req.body.password, salt, function(err, hash) {

                        knex('clients').insert({
                            name: req.body.name,
                            company: req.body.company,
                            email: req.body.email,
                            phone: req.body.phone,
                            address: req.body.address,
                            password: hash
                        }).then(function() {
                            res.render('dashboard', {
                                title: 'Momentum Investments',
                                name: req.body.name,
                                phone: req.body.phone,
                                address: req.body.address
                            });
                        });
                    });
                });
            }
        });
    }
});

/* PUT user info to Dashboard after sign-in. */
router.put('/:clientName', function(req, res, next) {

    knex('clients').where({
        email: req.body.email
    }).first().then(function(user) {
        if (user) {
            var pass = req.body.password;
            bcrypt.compare(pass, user.password, function(err, result) {
                if (result) {
                    req.session.id = user.id;
                    req.session.name = user.name;
                    req.session.phone = user.phone;
                    req.session.address = user.address;

                    res.render('dashboard', {
                        title: 'Momentum Investments',
                        id: req.session.id,
                        name: req.session.name,
                        phone: user.phone,
                        address: user.address,
                        company: user.company,
                        email: user.email
                    });
                } else {
                    res.render('signinErr', {
                        title: 'Momentum Investments',
                        name: req.body.name,
                        phone: req.body.phone,
                        address: req.body.address
                    });
                }
            });
        } else {
            res.render('signinErr', {
                title: 'Momentum Investments',
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address
            });
        }
    });

});

//STOCK API CODE GOES HERE
router.get('/:clientName/search', function(req, res) {

            var num = req.query.num;
            var tickerVal1 = req.query.tickerval1;
            var tickerVal2 = req.query.tickerval2;
            var tickerVal3 = req.query.tickerval3;
            var tickerVal4 = req.query.tickerval4;
            var tickerVal5 = req.query.tickerval5;
            var tickerVal6 = req.query.tickerval6;

            function promisifyGet(url) {
                return new Promise(function(resolve, reject) {

                    request.get(url, function(error, response, body) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(response);
                        }
                    })

                });
            };

            var url1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22" + TickerVal1 + "%22%20and%20startDate%20%3D%20%222015-10-05%22%20and%20endDate%20%3D%20%22" + date + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            var p1 = promisifyGet(url1);

            var url2 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22" + TickerVal2 + "%22%20and%20startDate%20%3D%20%222015-10-05%22%20and%20endDate%20%3D%20%22" + date + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            var p2 = promisifyGet(url2);

            var url3 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22" + TickerVal2 + "%22%20and%20startDate%20%3D%20%222015-10-05%22%20and%20endDate%20%3D%20%22" + date + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            var p3 = promisifyGet(url3);

            var url4 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22SPY%22%20and%20startDate%20%3D%20%222015-10-05%22%20and%20endDate%20%3D%20%22" + date + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            var p4 = promisifyGet(url4);

            var url5 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22ACWX%22%20and%20startDate%20%3D%20%222015-10-05%22%20and%20endDate%20%3D%20%22" + date + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            var p5 = promisifyGet(url5);

            var url6 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22BIL%22%20and%20startDate%20%3D%20%222015-10-05%22%20and%20endDate%20%3D%20%22" + date + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            var p6 = promisifyGet(url6);

            //add 3 more promises for the GEM
            //var promiseAll = Promise.all([p1, p2, p3, p4, p5, p6]);
            var promiseAll = Promise.all([p1, p2, p3, p4, p5, p6]);
            //p4,p5,p6

            //responses is an array, one entry for each response
            promiseAll.then(function(responses) {
                    //*****THIS IS WHERE WE CRUNCH THE NUMBERS*********
                    //parsing code goes here
                    var parsedSeries = [];
                    console.log(parsedSeries);

                    for (var i = 0; i < responses.length; i++) {
                    	
                        var response = JSON.parse(responses[i].body);
                        // console.log(response, i);

                        var apiSeries = response.query.results.quote.Adj_Close;
                        
                        var tickerSeries = {
                        	tickerName: response.query.results.quote[0].Symbol,
                        	series: apiSeries,
                        	dates: response.query.results.quote[0].Date
                        };


                        parsedSeries.push(tickerSeries);//full returns data from query


                        //then call imported calc function on parsed data
                        
                        // console.log(responses.length);
                      }
                      console.log(parsedSeries);
                      finMath.findPercentageReturnAndOrderSeries(parsedSeries);
                      var myData = JSON.stringify(finMath.organizeRows(parsedSeries))

                      console.log(myData); // instad of this line send it out

                      res.send( myData )
                      
                    })
										
										

											
		
                .catch(function(error) {
                    console.log(error.stack);
                    res.end();
                });
            });


        router.get('/:clientName/signout', function(req, res) {
            req.session = null;
            res.redirect('/');
        });


        module.exports = router;
