var express = require('express');
var router = express.Router();


var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));
var Product = require("../models/Product.js");
mongoose.connect('mongodb://localhost:27017/efozol1');

router.get('/products/:name', function(req, res, next) {

  
  var search = req.params.name;

  var regex = new RegExp('.*'+search+'.*');

  Product.find({name: regex}, {}).then(function(docs){
    res.json(docs);
  });
  
});


module.exports = router;
