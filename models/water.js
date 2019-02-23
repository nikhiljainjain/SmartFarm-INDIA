var mongoose = require('mongoose');
//let shortid = require("shortid");

var water = new mongoose.Schema({
    //value: {type: String},//, require: true},
    pump: {type: String, default: "OFF"},
    shade: {type: String, default: "OFF"},
    when_it: {type: Date, default: Date.now},
    //status: {type: String, default: "LOW"}
    moisture: {type: Number}
});

module.exports = mongoose.model('waters',water);