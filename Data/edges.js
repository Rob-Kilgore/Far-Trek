const fs = require('fs');
var util = require('util');
let parseString = require('xml2js').parseString;

//.osm files are xml files containing open street map data
//To play around with this, place your osm file in the same directory
//As this source file
let xml = fs.readFileSync('NorthAmherst.osm');

//Uses a npm module and parses the xml file to JSON object and
//stores the local variable into the variable "parsedFile"
let parsedFile;
parseString(xml, function (err, result) {
    parsedFile = result.osm;
});

//Will be an array that contains all the ways, ways are represented as arrays
let wayList = new Array(parsedFile.way.length);


for(let i = 0; i < parsedFile.way.length; i++){
    //Creates a list of edges for each way in the parsedFile variable
    let edgeList = createEdgeList(parsedFile.way[i]);

    // WayList are arrays of arrays
    // Each element/array in the wayList array represents 1 way
    // And each array/way contains all the edges for that 1 way
    wayList[i] = edgeList;
}


function createEdgeList(way){
    let nodeList = way.nd;

    let edgeList = new Array(nodeList.length-1)

    for (let i = 0; i < nodeList.length-1; i++){
        let id1 = nodeList[i].$.ref;
        let id2 = nodeList[i+1].$.ref;

        let edge = {"edge Order": i, "edge ID": id1+id2, "id1": id1, "id2":id2, }

        edgeList[i] = edge;
    }
    return edgeList
}

//Stores the wayList which contains objects and thus cannot be stored in its original format as a JSON file
fs.writeFileSync('./data.json', util.inspect(wayList), 'utf-8');




