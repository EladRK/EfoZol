var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));
var ObjectId = mongoose.Schema.Types.ObjectId;


var BranchPriceSchema = new mongoose.Schema({
	price: Number,
	bid: ObjectId
})

var ProductSchema = new mongoose.Schema({ 
    name: String,
    prices: [BranchPriceSchema]
});

var products = mongoose.model('Product', ProductSchema);

module.exports = products;