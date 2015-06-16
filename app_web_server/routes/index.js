var express = require('express');
var router = express.Router();


var Promise = require("bluebird");

// var mongoose = Promise.promisifyAll(require('mongoose'));
// var Product = require("../models/Product.js");


//var Sequelize = require('sequelize');
//var sequelize = new Sequelize('database', 'username', 'password');

//var sequelize = new Sequelize('postgres://postgres:0o90O(LK@localhost:5432/efozol');


var pg = require("pg")
var conString = "pg://postgres:1234@localhost:5432/efozol2";
var client = new pg.Client(conString);
client.connect();
 
//mongoose.connect('mongodb://localhost:27017/efozol1');

router.get('/products/', function(req, res, next) {

// return sequelize.sync().then(function() {
//   return User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
// }).then(function(jane) {
//   console.log(jane.get({
//     plain: true
//   }))
// });

  var query = client.query("SELECT * FROM \"Products\" ORDER BY \"Name\"");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));

    res.json(result.rows);

    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write(JSON.stringify(result.rows) + "\n");
    // res.end();
  });
  
});


router.get('/products/:name', function(req, res, next) {

  var query = client.query("SELECT * FROM \"Products\" WHERE \"Name\" LIKE '%" + req.params.name + "%' ORDER BY \"Name\"");
  //var query = client.query("SELECT * FROM \"Products\" ORDER BY \"Name\"");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    
    var items = result.rows.map(function(item){
      return item.Name;
    });
    
    //console.log(JSON.stringify(items, null, "    "));

    res.json(items);
  });


//   var search = req.params.name;
//   var regex = new RegExp('.*'+search+'.*');
// 
//   Product.distinct('name', {name: regex}).then(function(docs){
//     res.json(docs);
//   });
  
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
