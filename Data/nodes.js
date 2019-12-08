// resources to learn about stuff here: 
/*
https://github.com/googlemaps/google-maps-services-js
https://googlemaps.github.io/google-maps-services-js/docs/
https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html
https://googlemaps.github.io/google-maps-services-js/docs/ResponseCallback.html
https://developers.google.com/maps/documentation/elevation/intro
*/ 
// google api key found on slack #data

const fetch = require("node-fetch");
const fs = require('fs');
var parseString = require('xml2js').parseString;
var util = require('util');

//put your OSM file here!
//currently using the small test file for speed 
var xml = fs.readFileSync('test.osm');
//
var parsedFile;
parseString(xml, function (err, result) {
  parsedFile = result.osm;
});

//requires api key to continue 
var APIKey = extractArgument("api", process.argv);

var nodeList = []
var idList = []


//took out promise - if you use the .asPromise() method in getElevation you need to uncomment it but otherwise it's ok 
const googleMapsClient = require('@google/maps').createClient({
  key: APIKey,
  //Promise: Promise
});

//checks to see if you gave the api key on script call i.e. "node node.js api:(apikey)"
function extractArgument(arg, argv) {
     var value = null;
     argv.forEach(function(str)
     {
          if(str.substring(0, arg.length + 1) === arg + ":")
          {
               value = str.substring(arg.length + 1);
          }
     });
     if(value == null)
     {
          throw (arg + " argument not specified. Specify "+ arg + " using " + arg + ":[VALUE]");
     }
     return value;
}


// creates a list of coordinates and an id list, then passes the coordinates to the google api to get elevation data. 
async function create_nodes(file){
	coordinates = []
  idList = []
	for(i = 0 ; i < file.node.length; i++){
		var id = {
			id: file.node[i].$.id
		}
		var obj = {
			lat: file.node[i].$.lat,
			lng: file.node[i].$.lon
		}
		coordinates.push(obj);
		idList.push(id);
	}

  // test coordinates to reduce number of calls. Use when testing findElevation
  coordinates = [{ lat: '42.4288550', lng: '-72.5301110' }]
  //

  // once this is working on a single coordinate, the below needs to be put in a loop that goes over all of coordinates instead of the above test coordinates 

  node = [];

  try{ findElevation(coordinates).then(function(response){
    console.log('then print: ' + response);
    node =  response;
  });
  } catch (e){
    console.log('e: ' + e);
  }

  console.log("node print  " + node);

  //format results here in the correct way to pass to the algorithm({uuid, lat, lon, ele} for each node) add the ID's back into each node here from idList 

  finalData =[]
  finalData = node

  return(finalData)
}


//this should take one set of coordinates "{ lat: 'x', lng: 'y' }" and return response.json.results which will look like 
/*
[ { elevation: 93.7344970703125,
    location: { lat: 42.428855, lng: -72.530111 },
    resolution: 4.771975994110107 } ]
*/ 
// we only need the elevation data from here - it should be processed above in create_nodes 
async function findElevation(coordinates){
const data = {locations: coordinates};
results = 'invalid';
await googleMapsClient.elevation(data, function(err, response) {
    if (!err) {
      console.log(response.json.results);
     return response.json.results;
    } else if (err === 'timeout') {
      // Handle timeout.
      console.log('timeout');
    } else if (err.json) {
      // Inspect err.status for more info.
      console.log('error: '+ err.json);
    } else {
      // Handle network error.
      console.log('unexpected error (network)');
    }
  })/*.asPromise()
  .then((response) => {
    
  })
  .catch((err) => {
    console.log(err);
  });
resolve(result){
  return result;
}*/

//promise implementation ^ replaced with 
}

//this should return the final nodes list in the format [{uuid, lat, lon, ele}, {uuid, lat, lon, ele}, {uuid, lat, lon, ele}....]
create_nodes(parsedFile)