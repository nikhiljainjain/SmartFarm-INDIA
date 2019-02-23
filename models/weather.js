let mongoose = require('mongoose');

let idea = new mongoose.Schema({
    
    time: {type: Date, default: Date.now},
});

module.exports = mongoose.model('ideas',idea);