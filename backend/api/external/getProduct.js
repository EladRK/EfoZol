module.exports.do = function(req, res, next) {

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
  
};
