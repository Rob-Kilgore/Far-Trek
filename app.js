  
const http = require('http');
const fs = require('fs');
const pathAlgorithm = require('./js/PathAlgorithm');
const graph = require('./js/BasicGraph');

const hostname = '127.0.0.1';
const port = 8080;

fs.readFile('webdir//index.html', (error, html) => {
     if(error) {
          throw error;
     }
     const server = http.createServer((req, res) => {
          res.statusCode = 200;
          res.setHeader('Content-type', 'text/html');
          res.write(html);
          res.end();
     });
     
     server.listen(port, hostname, () => {
          console.log('server started on port ' + port);
     });
});
// Testing
console.log(graph);
var node = pathAlgorithm.getPath(graph, 1, 9, 0);
console.log("path is " + node.path + " with distance " + node.h);
