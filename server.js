const http = require('http');
const fs = require('fs');
const library = require('./library.json');
const Router = require('./index.js');
const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});

  const router = new Router();
  function getBody(callback){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      }).on('end', () => {
        callback(body)
      });
    }

  if (req.url === "/api/v1/books") {
    switch(req.method){
      case "GET":
        router.get(req, res);
        break;
      case "POST":
        router.post(req, res, getBody);
        break;
      case "PUT":
        router.put(req, res, getBody);
        break;
      case "DELETE":
        router.del(req, res, getBody);
        break;
    }
  } else {
    res.write("ERROR: unknown url");
    res.end();
  }
})

server.listen(port, hostname);
