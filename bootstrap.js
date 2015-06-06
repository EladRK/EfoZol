var Promise = require("bluebird");
Promise.longStackTraces();
var mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.connect('mongodb://localhost:27017/efozol1');

var Product = require("./models/Product.js");

var ObjectId = mongoose.Types.ObjectId;

var bids = [];
for(var i = 0; i < 5; i++){
    bids[i] = ObjectId();
}

function Item(name){
    var prices = [];
    for(var i = 0; i < 5; i++){
        prices[i] = {
            price: i + 10,
            bid: bids[i],
            name: name
        };
    }
    return prices;
}



var items = [
      Item("חלב" ),
      Item("גבינה" ),
      Item("תפוזים" ),
      Item("ענבים" ),
      Item("בננות" ),
      Item("חומוס" ),
      Item("קוטג'" ),
      Item("לחמניות" ),
      Item("לחם אחיד" ),
      Item("לחם אורגני" ),
      Item("ביצים" ),
      Item("ביצים אורגניות"),
      Item("ביצי כפר" ),
      Item("ביצי חופש" )
  ].reduce(function(prev, cur) {
    return prev.concat(cur);
  }, []).map(function(item){
    return new Product({
      name: item.name,
      price: item.price
    });
  });

Promise.try(function() {
  return Product.removeAsync({});
}).then(function(){
  return Promise.map(items, function(item){
    console.log("HI", item);
    return item.saveAsync();
  });
}).then(function(){
  console.log("Done!");
  process.exit();
});
