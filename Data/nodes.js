// resources to learn about stuff here:
/*
https://github.com/googlemaps/google-maps-services-js
https://googlemaps.github.io/google-maps-services-js/docs/
https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html
https://googlemaps.github.io/google-maps-services-js/docs/ResponseCallback.html
https://developers.google.com/maps/documentation/elevation/intro
*/

// google api key found on slack #data
const fetch = require('node-fetch');
const fs = require('fs');
var parseString = require('xml2js').parseString;
var util = require('util');

//put your OSM file here!
//
var xml = fs.readFileSync('campus.osm');
//

var parsedFile;
parseString(xml, function(err, result) {
	parsedFile = result.osm;
});
//requires api key to continue
var APIKey = extractArgument('api', process.argv);
var nodeList = [];
var idList = [];
//took out promise - if you use the .asPromise() method in getElevation you need to uncomment it but otherwise it's ok
const googleMapsClient = require('@google/maps').createClient({
	key: APIKey
	//Promise: Promise
});
//checks to see if you gave the api key on script call i.e. "node node.js api:(apikey)"
function extractArgument(arg, argv) {
	var value = null;
	argv.forEach(function(str) {
		if (str.substring(0, arg.length + 1) === arg + ':') {
			value = str.substring(arg.length + 1);
		}
	});
	if (value == null) {
		throw arg + ' argument not specified. Specify ' + arg + ' using ' + arg + ':[VALUE]';
	}
	return value;
}
// creates a list of coordinates and an id list, then passes the coordinates to the google api to get elevation data.
function create_nodes(file, callback) {
	//build coordiantes
	coordinates = [];
	for (i = 0; i < file.node.length; i++) {
		var obj = {
			lat: file.node[i].$.lat,
			lng: file.node[i].$.lon
		};
		//console.log(obj);
		coordinates.push(obj);
	}

	// go through the coordinates in large sets to reduce the number of api calls. Set to 500 for now
	totalNodes = coordinates.length;
	setLength = 500;
	nodesRemaining = totalNodes;
	// x = next node to be processed
	x = 0;
	// x = last node to be processed in a set
	if (setLength > nodesRemaining) {
		y = nodesRemaining;
	} else {
		y = setLength;
	}

	while (nodesRemaining / setLength >= 1 && y < nodesRemaining) {
		input = coordinates.slice(x, y);
		//console.log(input);
		//console.log('1st: ' + x + ' = x,    y = ' + y);
		x = y;
		nodesRemaining = nodesRemaining - setLength;

		if (setLength > nodesRemaining) {
			y = x + nodesRemaining;
		} else {
			y = x + setLength;
		}
		//console.log('2nd: ' + x + ' = x,    y = ' + y);
		try {
			findElevation(input, (response) => {
				//process that set (on call of create nodes)
				callback(response);
			});
		} catch (e) {
			console.log('e: ' + e);
		}
	}
	if (setLength > nodesRemaining) {
		input = coordinates.slice(x, y);
		//console.log(input);
		//console.log('3rd: ' + x + ' = x,    y = ' + y);
		try {
			findElevation(input, (response) => {
				//process that set (on call of create nodes)
				//console.log('made it this far 2');
				callback(response);
			});
		} catch (e) {
			console.log('e: ' + e);
		}
	}
}

//this should take one set of coordinates "{ lat: 'x', lng: 'y' }" and return response.json.results which will look like
/*
[ { elevation: 93.7344970703125,
    location: { lat: 42.428855, lng: -72.530111 },
    resolution: 4.771975994110107 } ]
*/

//we will write these results to a file in the callback of create_nodes
function findElevation(coordinates, callback) {
	const data = { locations: coordinates };
	results = 'invalid';
	googleMapsClient.elevation(data, function(err, response) {
		if (!err) {
			callback(response.json.results);
			return response.json.results;
		} else if (err === 'timeout') {
			// Handle timeout.
			console.log('timeout');
			callback(-1);
		} else if (err.json) {
			// Inspect err.status for more info.
			console.log('error: ' + err.json);
			callback(-1);
		} else {
			// Handle network error.
			console.log('unexpected error (network)');
			callback(-1);
		}
	});
}

//this should write the results to a file

finalArray = [];
create_nodes(parsedFile, (response) => {
	//console.log('callback begun');
	for (i = 0; i < response.length; i++) {
		finalArray.push(response[i]);
	}
	//console.log(finalArray);
	fs.writeFile('nodes_output.json', JSON.stringify(finalArray), 'utf8', function(err) {
		if (err) {
			console.log('An error occured while writing JSON Object to File.');
		}
	});
});
