const fs = require('fs');
var parseString = require('xml2js').parseString;
var util = require('util');
//put your OSM file here!
//
var xml = fs.readFileSync('campus.osm');
//
var parsedFile;
parseString(xml, function (err, result) {
  parsedFile = result.osm;
});

 var edges = fs.readFileSync('./Output.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    edges = jsonString;
    console.log("File read");  
})

var nodes = fs.readFileSync('./nodes_output.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    nodes = jsonString;
    console.log("File read");
})
nodes = JSON.parse(nodes);
edges = JSON.parse(edges);

function build_nodes(file, nodes, edges, callback){
	var graph = [];
	
	for(i = 0 ; i < nodes.length; i++){
		
		for(j = 0 ; j < file.node.length; j++){
			//console.log('node i lat:' nodes[i].location.lat);

   			if(nodes[i].location.lat == file.node[j].$.lat && nodes[i].location.lng == file.node[j].$.lon){
   				var obj = 	{
   							uuid: file.node[j].$.id,
      						lat: file.node[j].$.lat,
      						lng: file.node[j].$.lon,
      						ele: nodes[i].elevation
							}
				//console.log(obj);
				graph.push(obj);
   			}
    	}
   	}
   	parsed_edges = []
   	for(i = 0 ; i<edges.length; i++){
   		var obj={
   				a: edges[i].id1,
   				b: edges[i].id2
   				}
   			//console.log(obj);
   			parsed_edges.push(obj);
   	}
  output = {"nodes":graph, "edges":parsed_edges}
  callback(output);
}

build_nodes(parsedFile, nodes, edges, (response)=>{
	fs.writeFile("graph.json", JSON.stringify(response), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
    }else{
      console.log('file saved!')
    }
  });
});




/* desired output: 

    `{
         "nodes":[
             {"uuid":1,"lat":0,"lon":0,"ele":0},
             {"uuid":2,"lat":1,"lon":1,"ele":5},
             {"uuid":3,"lat":0,"lon":2,"ele":10},
             {"uuid":4,"lat":0,"lon":3,"ele":13},
             {"uuid":5,"lat":1,"lon":3,"ele":0},
             {"uuid":6,"lat":2,"lon":4,"ele":-3},
             {"uuid":7,"lat":2,"lon":2,"ele":-5},
             {"uuid":8,"lat":4,"lon":1,"ele":6},
             {"uuid":9,"lat":5,"lon":2,"ele":8},
             {"uuid":10,"lat":5,"lon":5,"ele":15}
         ],
         "edges":[
             {"a":1,"b":2},
             {"a":1,"b":3},
             {"a":2,"b":3},
             {"a":2,"b":7},
             {"a":2,"b":8},
             {"a":3,"b":4},
             {"a":4,"b":5},
             {"a":5,"b":6},
             {"a":5,"b":7},
             {"a":6,"b":7},
             {"a":7,"b":10},
             {"a":8,"b":9},
             {"a":9,"b":10}
         ]
     }`
 );






*/