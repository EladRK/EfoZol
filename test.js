var Promise = require("bluebird");
var Product = require("./models/Product.js");
Promise.promisifyAll(Product);

Promise.coroutine(function*(){
	var id1 = yield Product.findAsync({name:"גבינה"});
	console.log("ID");
	var id2 = yield Product.findAsync({name:"חלב"});
	console.log("Ids", id1, id2);
})();

var items = [
	{name: "גבינה", quantity: 1},
	{name: "חלב", quantity: 2}
];
