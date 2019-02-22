const http = require('http');
const fs = require('fs');
const library = require('./library.json');
const bookMethods = require('./index.js')
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json())

app.get('/api/v1/books', (req, res) => {
  bookMethods.reabBook(req, res);
  res.end();
});
app.post('/api/v1/books', (req, res) => {
  bookMethods.addBook(req, res);
  res.end();
});
app.put('/api/v1/books', (req, res) => {
  bookMethods.updateBook(req, res);
  res.end();
});
app.delete('/api/v1/books', (req, res) => {
  bookMethods.deleteBook(req, res);
  res.end();
});

const port = process.env.PORT || 8081
app.listen(port, () =>{
  console.log('Express server listening on port ' + port)
})
