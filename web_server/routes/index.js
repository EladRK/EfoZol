var express = require('express');
var router = express.Router();


var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));
var Product = require("../models/Product.js");
mongoose.connect('mongodb://localhost:27017/efozol1');

router.get('/products/:name', function(req, res, next) {

  var search = req.params.name;
  var regex = new RegExp('.*'+search+'.*');

  Product.distinct('name', {name: regex}).then(function(docs){
    res.json(docs);
  });
  
});

router.get('/branches', function(req, res, next) {
  
  res.json([
		{pos: [32.0771929, 34.7870064], name:"סופרסל", totalPrice :100},
		{pos: [32.0898466, 34.7799683], name:"טיב טעם", totalPrice :150},
		{pos: [32.0738474, 34.7703552], name:"AM-PM", totalPrice :175}
	]);
//   
//   var search = req.params.name;
// 
//   var regex = new RegExp('.*'+search+'.*');
// 
//   Product.find({name: regex}, {}).then(function(docs){
//     res.json(docs);
//   });
  
});






module.exports = router;
