var Promise = require("bluebird");
Promise.longStackTraces();
var mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.connect('mongodb://localhost:27017/efozol1');

var schema = new mongoose.Schema({ 
    name: String,
    price: Number
});

var Product = mongoose.model('Product', schema);


var items = [
    {"name" : "חומוס", "price" : 11},
    {"name" : "חמאה", "price" : 5},
    {"name" : "לחם", "price" : 4.4},
    {"name" : "חלב" , "price" : 3.5},
    {"name" : "גבינה", "price": 4.0}].map(function(item){
        return new Product({
            name: item.name,
            price: item.price
        });
     });

Promise.try(function(){
    return Product.removeAsync({});
}).then(function(){
    return Promise.map(items, function(item){
        return item.saveAsync();
    });
}).then(function(){
    console.log("Done!");
    process.exit();
});
