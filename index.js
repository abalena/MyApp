const http = require('http'); //подключаем модуль http
const library = require('./library.json');

const hostname = "127.0.0.1";//localhost - адрес сервера
const port = 8081;//сервер работает на порту 8081

//создаем сервер, у которого в качестве ответа передаются
//заголовки: статус-код - 200 и тип данных
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Conten_Type' : 'application/json'});

//достаем с запроса url и проверяем, не совпадает ли он с нужным
//если совпадает, то выводим library.json
//если не совпадает, то Hello World
  const url = req.url;
  if(url === "/api/v1/books"){
    res.write(JSON.stringify(library));
    res.end()
  }else{
    res.write('<h1>Hello World<h1>')
    res.end()
  }
})

//сервер слушает port
server.listen(port, hostname);
