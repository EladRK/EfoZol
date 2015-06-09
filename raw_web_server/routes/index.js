
/*
 * GET home page.
 */

// exports.index = function(req, res){
// res.render('index', { title: 'Express' });
// };

var express = require('express');
var router = express.Router();

router.get('/demoapi', function(req, res, next) {

	res.json({test: 1});
  
});
