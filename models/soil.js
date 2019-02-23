let mongoose = require('mongoose');
//let shortid = require("shortid");

let soil = new mongoose.Schema({
    value: {type: String, default: undefined, require: true},
    time: {type: Date, default: Date.now},
    status: {type: String, default: "Normal"}
});

module.exports = mongoose.model('soils',soil);