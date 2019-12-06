const pathAlgorithm = require('./js/PathAlgorithm');
const graphJSON = require('./js/BasicGraph');
const convertGraph = require('./js/ConvertGraph');

const express = require('express');

const app = express();
app.use(express.static("webdir"));
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});
// Testing
//console.log(graph);
var graph = convertGraph.convertGraph(graphJSON);
var node = pathAlgorithm.getPath(graph, 1, 5, 0);
console.log("path is " + node.path + " with distance " + node.h);
