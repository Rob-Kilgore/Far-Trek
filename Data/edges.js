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
let listOfHighways;
parseString(xml, function (err, result) {
    parsedFile = result['osm'];
    let wayIndexes = [];

      for (let i = 0; i < parsedFile['way'].length; i++) {
          if (typeof parsedFile['way'][i]['tag'] == 'undefined'){
              continue;
          }
          for (let j = 0; j < parsedFile['way'][i]['tag'].length; j++) {
              if (parsedFile['way'][i]['tag'][j]['$']['k'] == 'highway') {
                  wayIndexes.push(i);
                  break;
              }
          }
     }


      listOfHighways = wayIndexes;


});



let wayList = {}


for (let i = 0; i < listOfHighways.length; i++) {

    //Creates a list of edges for each highway in the parsedFile variable
    let nextHighwayIndex = listOfHighways[i];
    let wayID = parseInt(parsedFile['way'][nextHighwayIndex]['$']['id']);
    let edgeList = createEdgeList(parsedFile['way'][nextHighwayIndex]);



    // WayList are arrays of arrays
    // Each element/array in the wayList array represents 1 way
    // And each array/way contains all the edges for that 1 way
    // wayList[i] = edgeList;



    wayList["way " + wayID] = edgeList
}


function createEdgeList(way) {
    let nodeList = way['nd'];

    // let edgeList = new Array(nodeList.length-1)

    let edgeList = [];

    for (let i = 0; i < nodeList.length - 1; i++) {
        let id1 = nodeList[i]['$']['ref'];
        let id2 = nodeList[i + 1]['$']['ref'];

        let edge = {"edge ID": parseInt(id1 + id2), "id1": parseInt(id1), "id2": parseInt(id2)}

        edgeList[i] = edge

    }
    return edgeList
}





//Stores the wayList which contains objects and thus cannot be stored in its original format as a JSON file
 //fs.writeFileSync('./data.json', JSON.stringify(wayList), 'utf-8');
//
fs.writeFileSync('./data.json', JSON.stringify(wayList,null,2), 'utf-8');








