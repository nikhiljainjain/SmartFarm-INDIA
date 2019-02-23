

observations/summary


const request = require('request');

const options = {
	method: 'GET',
	url: 'https://api.aerisapi.com/observations/:auto?&format=json&filter=allstations&limit=1&client_id=I8KNmqHaUZfYqdzd4xxiy&client_secret=IlDCpDD3F892wSkBm3kF97kRWiBNrRO7dMm4SKE4'
};
		
request(options, function (error, response, body) {
	const json = JSON.parse(body);
		
	if (!json.success) {
		console.error('Oh no!')
	} else {
		console.log(body)
	}
});
air quality


const request = require('request');

const options = {
	method: 'GET',
	url: 'https://api.aerisapi.com/airquality/:auto?&format=json&client_id=I8KNmqHaUZfYqdzd4xxiy&client_secret=IlDCpDD3F892wSkBm3kF97kRWiBNrRO7dMm4SKE4'
};
		
request(options, function (error, response, body) {
	const json = JSON.parse(body);
		
	if (!json.success) {
		console.error('Oh no!')
	} else {
		console.log(body)
	}
});

forecasts


const request = require('request');

const options = {
	method: 'GET',
	url: 'https://api.aerisapi.com/forecasts/:auto?&format=json&filter=day&limit=7&client_id=I8KNmqHaUZfYqdzd4xxiy&client_secret=IlDCpDD3F892wSkBm3kF97kRWiBNrRO7dMm4SKE4'
};
		
request(options, function (error, response, body) {
	const json = JSON.parse(body);
		
	if (!json.success) {
		console.error('Oh no!')
	} else {
		console.log(body)
	}
});

'use strict';
const express = require('express');
const locateUser = require('locate-user');
 
const app = express();
 
app.get('/', (req, res, next) => {
    const userLocation = locateUser(req);
    userLocation
        .then(data => res.json(data))
        .catch(next);
});
 
app.listen(3000)
 