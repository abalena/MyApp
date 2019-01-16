const http = require('http');
const fs = require('fs');
const library = require('./library.json');
const bodyParser = require('body-parser');

const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Conten_Type' : 'application/json'});

  const url = req.url;
      if(url === "/api/v1/books"){
        if(req.method == "GET"){
          res.write(JSON.stringify(library));
          res.end()
        }else if(req.method == "POST"){
          let body = '';
          req.on('data', (chunk) => {
            body += chunk
            body = JSON.parse(body);
            let libraryInString = fs.readFileSync('./library.json', 'utf8');
            let libraryInJson = JSON.parse(libraryInString);
            libraryInJson.books.push(body)
            fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) =>{
              if(err) throw err;
             res.write(JSON.stringify(library));
             });
          })
          req.on('end', () => console.log(body));
          res.end();// строка 30 и 31 - в чем разница?
        }else if(req.method == "DELETE"){
          let body = '';
          req.on('data', (chunk) => {
            body += chunk
            body = JSON.parse(body);
            let libraryInString = fs.readFileSync('./library.json', 'utf8');
            let libraryInJson = JSON.parse(libraryInString);
            let newBooks =  libraryInJson.books.filter((book) => book.id != body.id)
            libraryInJson.books = newBooks
            fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) =>{
              if(err) throw err;
             res.write(JSON.stringify(library));
             });
          })
          req.on('end', () => console.log((body.id)));
          res.end();
      }
    }else{
      res.write("Hello!");
      res.end();
    }
})

server.listen(port, hostname);
