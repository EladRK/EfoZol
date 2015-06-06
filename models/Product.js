var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));


var schema = new mongoose.Schema({ 
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', schema);