var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));
var Product = require("./models/Product.js");
mongoose.connect('mongodb://localhost:27017/efozol1');

Promise.promisifyAll(Product);



Promise.coroutine(function*(){
	var id1 = (yield Product.findAsync({name:"גבינה"}))[0]._id;
	console.log("ID");
	var id2 = (yield Product.findAsync({name:"חלב"}))[0]._id;
	console.log("Ids", id1, id2);
})();

var items = [
	{name: "גבינה", quantity: 1},
	{name: "חלב", quantity: 2}
];
