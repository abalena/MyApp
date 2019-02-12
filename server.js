const http = require('http');
const fs = require('fs');
const library = require('./library.json');
const Router = require('./index.js');
const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});

  const router = new Router();
  
  if (req.url === "/api/v1/books") {
    switch(req.method){
      case "GET":
        router.get();
        break;
      case "POST":
        router.post();
        break;
      case "PUT":
        router.put();
        break;
      case "DELETE":
        router.del();
        break;
    }
  } else {
    res.write("ERROR: unknown url");
    res.end();
  }
})

server.listen(port, hostname);
