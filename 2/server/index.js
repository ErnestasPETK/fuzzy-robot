const http = require('http');
const express = require('express');
const cors = require('cors');
// http module

// console.log(" Server started ");

// const server = http.createServer((request, response) => {

//     if (request.url === "/") {

//         response.write("Home page");
//         console.log(` ${request.method} request received \n `);
//         response.end();
//     }

//     if (request.url === "/about") {

//         response.write("About page");
//         console.log(` ${request.method} request received \n `);
//         response.end();
//     }



// });

// server.listen(3000);
// console.log(" Server shutting down ");

// express module

const app = express();

app.use(cors("http://127.0.0.1:5500/"))

app.get('/', (request, response) => {

    response.write(' Home page ');
    response.end();

});
app.get('/cars', (request, response) => {

    response.status(202).json({
        body: ["BMW", "AUDI", "PORSHE"]
    })

});

app.listen(3000, () => { console.log(" Server is listening") });