const http = require('http');
const fs = require('fs');
const library = require('./library.json');

const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});

  const url = req.url;

  class Router{
    constructor(path){
      this.path = path;
    }
    get(){
      const libraryInString = fs.readFileSync('./library.json', 'utf8');
      res.write(libraryInString);
      res.end();
    };

    post(){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      }).on('end', () => {
        addBook(body);
      });
      res.end();
    };

    del(){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      }).on('end', () => {
        deleteBook(body)
      });
      res.end();
    }
  }

function addBook(body){
  body = JSON.parse(body);
  const libraryInString = fs.readFileSync('./library.json', 'utf8');
  const libraryInJson = JSON.parse(libraryInString);
  libraryInJson.books.push(body)
  fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
    if (err) throw err;
    res.write(JSON.stringify(library));
  });
}

function deleteBook(body){
  body = JSON.parse(body);
  const libraryInString = fs.readFileSync('./library.json', 'utf8');
  const libraryInJson = JSON.parse(libraryInString);
  const newBooks = libraryInJson.books.filter((book) => book.id != body.id)
  libraryInJson.books = newBooks
  fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
    if (err) throw err;
    res.write(JSON.stringify(library));
  });
}

  const router = new Router();
  if (url === "/api/v1/books") {
    switch(req.method){
      case "GET":
        router.get();
        break;
      case "POST":
        router.post();
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
