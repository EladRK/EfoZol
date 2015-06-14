var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProductSchema = new mongoose.Schema({ 
    name: String,
    bid: ObjectId,
    price: Number
});

var products = mongoose.model('Product', ProductSchema);

module.exports = products;