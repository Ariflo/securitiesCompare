var express = require('express');
var locus = require('locus');
var router = express.Router();

/* GET Dashboard. */
router.post('/dash', function(req, res, next) {
	res.render('dashboard');
});

module.exports = router;