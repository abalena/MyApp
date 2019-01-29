
1. Install Node.js from <https://nodejs.org/en/>
2. To start local server clone the repository from <https://github.com/abalena/MyApp> and install dependencies.
Open console and run next commands:
```
git clone https://github.com/abalena/MyApp.git
cd MyApp
npm install
npm start
```
4. Server is located at <http://localhost:8081>
***

- URL: */api/v1/books*

- METHODS:
```
 GET | POST | DELETE
 ```
- SUCCESS RESPONSE:
>  code: 200

-CONTENT EXAMPLE:
> {
   "books": [{
     "id": "id",
     "title": "title",
     "author": "author"
   }]
 }
