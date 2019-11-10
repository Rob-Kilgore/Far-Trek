const http = require('http');
const fs = require('fs');

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
