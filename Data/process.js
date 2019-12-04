//thought about using https://github.com/kelektiv/node-uuid for uuid's but might not be necessary. Saving code here 
//const uuidv1 = require('uuid/v1');
//	uuid = uuidv1();


const fs = require('fs');
const file = fs.readFileSync('test.json');
const parsed = JSON.parse(file);

function createNode(long, lat, lastID){
	var id = lastID+1;
	var request = new XMLHttpRequest();

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.open-elevation.com/api/v1/lookup\?locations\='+long+","+lat, true);

	request.onload = function(){
	  // Begin accessing JSON data here
		var data = JSON.parse(this.response)
		if (request.status >= 200 && request.status < 400) {
 			var elevation = data.altitude;
 		 	}
		else {
  			console.log('error');
			}
	// Send request
	request.send()
	var node = {"uuid": id,
	  			"lon":long, 
	  			"lat":lat, 
	  			"ele":elevation};


	return (node);
}


var node = 'createNode error';
node = createNode(-72.5188946, 42.4286238, 0);
console.log(node);





