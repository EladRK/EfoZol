var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/efozol1');

router.get('/productList', function(req, res, next) {
  // res.json({ a: 1 });

   var collection = db.get('products');
    collection.find({},{},function(e,docs){
       res.json(docs);
    });
  
  // res.json(
  //   [
  //     {name: 'milk', price: 5.5, store: '1' },
  //     {name: 'butter', price: 5, store: '1' },
  //     {name: 'bread', price: 10, store: '2' },
  //     {name: 'spaggety', price: 20, store: '2' },
  //     {name: 'oranges', price: 4, store: '3' }
  //   ]
  //   );
});


module.exports = router;
