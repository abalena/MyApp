const http = require('http');
const fs = require('fs');
const library = require('./library.json');

const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const url = req.url;
  if (url === "/api/v1/books") {
    if (req.method == "GET") {
      const libraryInString = fs.readFileSync('./library.json', 'utf8');
      res.write(libraryInString);
      res.end();
    } else if (req.method == "POST") {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      }).on('end', () => {
        body = JSON.parse(body);
        const libraryInString = fs.readFileSync('./library.json', 'utf8');
        const libraryInJson = JSON.parse(libraryInString);
        libraryInJson.books.push(body)
        fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
          if (err) throw err;
          res.write(JSON.stringify(library));
        });
      });
      res.end();
    } else if (req.method == "DELETE") {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      }).on('end', () => {
        body = JSON.parse(body);
        const libraryInString = fs.readFileSync('./library.json', 'utf8');
        const libraryInJson = JSON.parse(libraryInString);
        const newBooks = libraryInJson.books.filter((book) => book.id != body.id)
        libraryInJson.books = newBooks
        fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
          if (err) throw err;
          res.write(JSON.stringify(library));
        });
      });
      res.end();
    }
  } else {
    res.write("Hello!");
    res.end();
  }
})

server.listen(port, hostname);
