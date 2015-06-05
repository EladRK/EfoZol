var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/efozol1');

router.get('/products/:name', function(req, res, next) {

  
  var search = req.params.name;

  var regex = new RegExp('.*'+search+'.*');

   var collection = db.get('products');
            
    collection.find({name: regex},{},function(e,docs){
       res.json(docs);
    });
  
});


module.exports = router;
