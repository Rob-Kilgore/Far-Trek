//lines to run before beginning:
//npm i node-fetch --save
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

const googleMapsClient = require('@google/maps').createClient({
  key: APIKey,
  Promise: Promise // 'Promise' is the native constructor.
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
function create_nodes(file){
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
  results = getElevation(coordinates)
  //format results here in the correct way to pass to the algorithm({uuid, lat, lon, ele} for each node) add the ID's back into each node here 



  //
  return(results)
}


//checks the elevation at each coordinate and adds them to an array of nodes 
//currently broken (Promise { [] } is the only result )
async function getElevation(coordinates){
  nodes = [] 
  for(i = 0 ; i < coordinates.length; i++){
    googleMapsClient.elevation({locations: coordinates[i]}).asPromise()
      .then(function(response) {
        nodes.push(response.json.results);
      })
      .catch((err) => {
      console.log(err);
      });
    }
  return(nodes)
  }




// This should log the final data result that is in the format {uuid, lat, lon, ele} for each node 
console.log(create_nodes(parsedFile))