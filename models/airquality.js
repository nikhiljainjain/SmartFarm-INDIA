let mongoose = require('mongoose');
//let shortid = require("shortid");

let air = new mongoose.Schema({
    
    o3:  {
        valuePPB: {type: Number, default: 34},
        category: {type: String, default: "Good"},
        color: {type: String, default: "00E400"}
    },
    
    pm25: {
        valuePPB: {type: Number, default: 34},
        category: {type: String, default: "Good"},
        color: {type: String, default: "00E400"}
    },
    
    pm10: {
        valuePPB: {type: Number, default: 34},
        category: {type: String, default: "Good"},
        color: {type: String, default: "00E400"}
    },
    
    co: {
        valuePPB: {type: Number, default: 34},
        category: {type: String, default: "Good"},
        color: {type: String, default: "00E400"}
    },
    
    no2: {
        valuePPB: {type: Number, default: 34},
        category: {type: String, default: "Good"},
        color: {type: String, default: "00E400"}
    },
    
    so2: {
        valuePPB: {type: Number, default: 34},
        category: {type: String, default: "Good"},
        color: {type: String, default: "00E400"}
    },
    
    time: {type: Date, default: Date.now},
});

module.exports = mongoose.model('airdatas',air);