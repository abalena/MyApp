const fs = require('fs');
const library = require('./library.json');
class Router{
  get(req, res){
      const libraryInString = fs.readFileSync('./library.json', 'utf8');
      res.write(libraryInString);
      res.end();
    };

  post(req, res, getBody){
      getBody(addBook)
      res.end();
    };

  put(req, res, getBody){
      getBody(updateBook);
      res.end();
    };

  del(req, res, getBody){
      getBody(deleteBook)
      res.end();
    };
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
  };

function updateBook(body){
    body = JSON.parse(body);
    const libraryInString = fs.readFileSync('./library.json', 'utf8');
    const libraryInJson = JSON.parse(libraryInString);
    const arr = libraryInJson.books;
    libraryInJson.books.forEach(book =>{
      if(book.id == body.id){
        book.author = body.author
      }
    })
    fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
      if (err) throw err;
      res.write(JSON.stringify(library));
    });
  }

module.exports = Router;
