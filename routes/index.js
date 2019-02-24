var express = require('express');
var router = express.Router();
var Water = require("../models/water");
var Soil = require("../models/soil");
//var Weather = require("../models/weather");
const request = require('request');
const config = require("../config.js");

var response = {
    status: "OK", 
    list: [], 
    data: {
        airquality:{},
        observations: {
            tempC : 20,
            humidity : 22,
            weather : "rainy"
        }
    }//undefined
};

function resetValue(){
    response = {
        status: "OK", 
        list: []
    };  
}

var Images ={                             
    shed_open:"https://bit.ly/2SgsCnS",   
    shed_close:"https://bit.ly/2Xkw848",  
    rainy:"https://bit.ly/2T3oigj",       
    cloudy:"https://bit.ly/2Ix8KNw",      
    sunny:"https://bit.ly/2tzkeGf",       
    pump_off:"https://bit.ly/2Nn5QtE",    
    pump_on:"https://bit.ly/2SRDbD0",     
    very_dry_soil:"https://bit.ly/2Nl4gbK",
    wet_soil:"https://bit.ly/2Xs5GpA",    
    dry_soil:"https://bit.ly/2Te2sXi"     
}; 

function dataCollect(option, callback){
    request(option, function (error, response, body) {
    	const json = JSON.parse(body);
    		
    	if (!json.success) {
    		console.error('Oh no!');
    		callback('Oh no!');
    	} else {
    	    console.log("Calling to API");
    		//console.log(json);
    		callback(json);
    	}
    });
};

/* GET home page. */
router.get('/', function(req, res, next) {
    Water.find({}, "moisture",(err,data)=>{
      if (err) throw err;
      const dataX = data[data.length - 1];
      console.log(dataX);
      res.render('index', {mosiStatus: dataX.moisture,data: response.data.observations});
    });
    /*let options = {
	    method: 'GET',
	    url: `https://api.aerisapi.com/airquality/vellore,india?&format=json&client_id=${config.access_id}&client_secret=${config.secret_key}` 
    };
     
    dataCollect(options, (observations)=>{
        response.data.airquality = observations.response[0].periods[0];
        response.data.airquality.pollutants = undefined;
        response.data.airquality.dateTimeISO = undefined;
        response.data.airquality.timestamp = undefined;
        
        options.url = `https://api.aerisapi.com/observations/chennai,india?&format=json&filter=allstations&limit=1&client_id=${config.access_id}&client_secret=${config.secret_key}`;
    
        dataCollect(options, (data)=>{
            const newData = data.response.ob;
            response.data.observations.tempC = newData.tempC;
            response.data.observations.humidity = newData.humidity;
            response.data.observations.weather = newData.weather;
            //res.json(response);
            console.log(response.data);
            
        });
    });*/
    
    
    //res.render('index', { image: Images});
});

//value getting



//water pump controller 
router.post("/pump/controller",(req,res)=>{
    console.log(req.body);
    Water.create({moisture: req.body.value}, (err, created)=>{
        if (err){
            response.status = "NOT";
            throw err;
        }
        res.json(response);
    });
    //res.json(response);
    /*let options = {
	    method: 'GET',
	    url: `https://api.aerisapi.com/airquality/vellore,india?&format=json&client_id=${config.access_id}&client_secret=${config.secret_key}` 
    };
     
    dataCollect(options, (observations)=>{
        response.data.airquality = observations.response[0].periods[0];
        response.data.airquality.pollutants = undefined;
        response.data.airquality.dateTimeISO = undefined;
        response.data.airquality.timestamp = undefined;
        
        options.url = `https://api.aerisapi.com/observations/chennai,india?&format=json&filter=allstations&limit=1&client_id=${config.access_id}&client_secret=${config.secret_key}`;
    
        dataCollect(options, (data)=>{
            const newData = data.response.ob;
            response.data.observations.tempC = newData.tempC;
            response.data.observations.humidity = newData.humidity;
            response.data.observations.weather = newData.weather;
            //res.json(response);
            console.log(response.data);
            Water.findOne({}, "moisture",(err,data)=>{
                if (err)
                    throw err;
                console.log(data);
                console.log(response.data);
                res.json(response.data);
            });
        });
    });*/
});

//water pump controller 
router.get("/something",(req,res)=>{
    let options = {
	    method: 'GET',
	    url: `https://api.aerisapi.com/airquality/vellore,india?&format=json&client_id=${config.access_id}&client_secret=${config.secret_key}` 
    };
     
    dataCollect(options, (observations)=>{
        response.data.airquality = observations.response[0].periods[0];
        response.data.airquality.pollutants = undefined;
        response.data.airquality.dateTimeISO = undefined;
        response.data.airquality.timestamp = undefined;
        
        options.url = `https://api.aerisapi.com/observations/chennai,india?&format=json&filter=allstations&limit=1&client_id=${config.access_id}&client_secret=${config.secret_key}`;
    
        dataCollect(options, (data)=>{
            const newData = data.response.ob;
            response.data.observations.tempC = newData.tempC;
            response.data.observations.humidity = newData.humidity;
            response.data.observations.weather = newData.weather;
            //res.json(response);
            console.log(response.data);
            Water.findOne({}, "moisture",(err,data)=>{
                if (err)
                    throw err;
                console.log(data);
                console.log(response.data);
                res.json(response.data);
            });
        });
    });
});

//soil data submission
router.post('/data/collection/soil', (req,res)=>{
    const data = {value: req.body.soil}
    Soil.create(data, (err, created)=>{
        if (err){
            response.status = "NOT";
            throw err;
        }
        res.json(response);
    });
    resetValue();
});

//water data submission
router.post('/data/collection/water', (req,res)=>{
    console.log(req.body);
    let data =  {value: req.body};
    response.data = data;
    Water.create({moisture: req.body.output}, (err, created)=>{
        if (err){
            response.status = "NOT";
            throw err;
        }
        res.send(response);
    });
    resetValue();
});

//data collection of air 
router.get("/data/view/airquality/", (req,res)=>{
    const options = {
	    method: 'GET',
	    url: `https://api.aerisapi.com/airquality/vellore,india?&format=json&client_id=${config.access_id}&client_secret=${config.secret_key}` 
    };
     
    
    dataCollect(options, (observations)=>{
        response.data = observations.response[0].periods[0];
        response.data.pollutants = undefined; 
        console.log(response.data);
        res.json(response);
    });
   
   resetValue();
});

//data collection & view 
router.get("/data/view/weather", (req,res)=>{
    /*let obserData = {
        tempC: 4.61,
        humidity: 45,
        pressureMB: 1014,
        windKPH: 6,
        weather: "Sunny",
        light: 25
    };*/
    
    let options = {
	    method: 'GET',
	    url: `https://api.aerisapi.com/observations/chennai,india?&format=json&filter=allstations&limit=1&client_id=${config.access_id}&client_secret=${config.secret_key}`
    };
    
    dataCollect(options, (data)=>{
        const newData = data.response.ob;
        response.data.tempC = newData.tempC;
        response.data.humidity = newData.humidity;
        //obserData.pressureMB = newData.pressureMB;041
        //obserData.windKPH = newData.windKPH;
        response.data.weather = newData.weather;
        //obserData.light = newData.light;
        console.log(data);
        res.json(response);
    });
    
    /*let forecast = {
        "maxTempC": 6,
        "maxTempF": 43,
        "minTempC": 0,
        "minTempF": 32,
        "avgTempC": 3,
        "avgTempF": 37,
        "maxHumidity": 100,
        "minHumidity": 75,
        "humidity": 87,
        "windDirDEG": 120,
        "windDir": "ESE",
        "windDirMaxDEG": 140,
        "windDirMax": "SE",
        "windDirMinDEG": 120,
        "windDirMin": "ESE",
        "weather": "Mostly Cloudy with Patchy Freezing Fog"
    };
    
    options = {
	    method: 'GET',
	    url: 'https://api.aerisapi.com/forecasts/:auto?&format=json&filter=day&limit=7&client_id=I8KNmqHaUZfYqdzd4xxiy&client_secret=IlDCpDD3F892wSkBm3kF97kRWiBNrRO7dMm4SKE4'
    };
    
    dataCollect(options, (newdata)=>{
        const data = newdata.response[0].periods[-1];
        forecast.weather = data.weather;
        forecast.windDir = data.windDir;
        forecast.windDirDEG = data.windDirDEG;
        forecast.humidity = data.humidity;
        forecast.maxHumidity = data.maxHumidity;
        forecast.minHumidity = data.minHumidity;
        forecast.maxTempC = data.maxTempC;
        forecast.maxTempF = data.maxTempF;
        forecast.minTempC = data.minTempC;
        forecast.minTempF = data.minTempF;
        forecast. = data.;
        forecast. = data.;
        forecast. = data.;
        forecast. = data.;
        forecast. = data.;
        forecast. = data.;
        forecast. = data.;
    });
    */
    
    resetValue();
});


module.exports = router;