
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

# URL: */api/v1/books*

# METHODS:

 ## GET
- SUCCESS RESPONSE:
>  - code: 200
   - content example:
```json
{
   "books": [{
     "id": 1,
     "title": "The Great Gatsby" ,
     "author": "F. Scott Fitzgerald"
   }]
 }
```

## POST


- DATA PARAMS:
> - content-type: application/json
  - body example:
```json
{
    "id": "35",
    "title": "Viatge D'anada I Tornada",
    "author": "Gerard Pique"
    }
```
- SUCCESS RESPONSE:
>  code: 200

## PUT


- DATA PARAMS:
>  - content-type: application/json
   - body example:
```json
{
  "id": "35",
  "author": "Gerard"
}
```

- SUCCESS RESPONSE:
>  code: 200


## DELETE


- DATA PARAMS:
> -  content-type: application/json
  - body example:
```json
{
	"id": "35",
}
```


- SUCCESS RESPONSE:
>  code: 200
