var express = require('express');
var router = express.Router();


var Promise = require("bluebird");



router.get('/products/', function(req, res, next) {

  var pg = require("pg")
  var conString = "pg://postgres:1234@localhost:5432/efozol2";
  var client = new pg.Client(conString);

  client.connect();


  var query = client.query("SELECT * FROM \"Products\" ORDER BY \"Name\"");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));

    res.json(result.rows);

  });
  
});


router.get('/products/:name', function(req, res, next) {

  var pg = require("pg")
  var conString = "pg://postgres:1234@localhost:5432/efozol2";
  var client = new pg.Client(conString);

  client.connect();


  var query = client.query("SELECT * FROM \"Products\" WHERE \"Name\" LIKE $1 ORDER BY \"Name\"", ['%' +req.params.name + '%']);

  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    
    var items = result.rows.map(function(item){
      return item.Name;
    });
    
    res.json(items);
  });
  
});

router.get('/branches', function(req, res, next) {
  
  res.json([
    {pos: [32.0771929, 34.7870064], name:"סופרסל", totalPrice :100},
    {pos: [32.0898466, 34.7799683], name:"טיב טעם", totalPrice :150},
    {pos: [32.0738474, 34.7703552], name:"AM-PM", totalPrice :175}
    ]);
  
});



module.exports = router;
