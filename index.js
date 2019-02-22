const fs = require('fs');
const library = require('./library.json');
module.exports = {
reabBook: function(req, res){
  const libraryInString = fs.readFileSync('./library.json', 'utf8');
  res.write(libraryInString);
},
addBook: function (req, res){
  const libraryInString = fs.readFileSync('./library.json', 'utf8');
  const libraryInJson = JSON.parse(libraryInString);
  const body = req.body
  libraryInJson.books.push(body)
  fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
     if (err) throw err;
     res.write(JSON.stringify(library));
   });
 },
deleteBook: function (req, res){
   const libraryInString = fs.readFileSync('./library.json', 'utf8');
   const libraryInJson = JSON.parse(libraryInString);
   const newBooks = libraryInJson.books.filter((book) => book.id != req.body.id)
   libraryInJson.books = newBooks
   fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
      if (err) throw err;
      res.write(JSON.stringify(library));
    });
 },

 updateBook: function (req, res){
    const libraryInString = fs.readFileSync('./library.json', 'utf8');
    const libraryInJson = JSON.parse(libraryInString);
    const arr = libraryInJson.books;
    libraryInJson.books.forEach(book =>{
      if(book.id == req.body.id){
        book.author = req.body.author
      }
    })
    fs.writeFileSync('./library.json', JSON.stringify(libraryInJson), (err) => {
      if (err) throw err;
      res.write(JSON.stringify(library));
    });
  }
}
