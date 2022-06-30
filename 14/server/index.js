const mysql = require('mysql2/promise');
const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');


const port = process.env.PORT || 8080;


const app = express();
app.use(cors());
app.use(express.json());


const mysqlConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
}

app.get("/", async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        console.log("Success: " + con);
        await con.end();

    } catch (e) {
        console.log(e);
    }
    res.status(200).send("Hello World");
})


app.get("/shirts/:size", async (req, res) => {

    let rows, size;

    try {
        size = req.params.size;
    }
    catch {
        res.status(400).send("Bad Request");
    }

    try {
        const connection = await mysql.createConnection(mysqlConfig);

        [rows] = await connection.execute(`SELECT * FROM shirts WHERE size = '${size}' ORDER BY ${'price'}  LIMIT ${10}`);
        console.log(rows)
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(rows);
});

app.get("/shirts", async (req, res) => {

    let limit;
    if (req.query.limit) {
        limit = req.query.limit;
    }

    try {
        const connection = await mysql.createConnection(mysqlConfig);

        [rows] = await connection.execute(`SELECT * FROM shirts ORDER BY ${'price'} LIMIT ${limit}`);
        console.log(rows)
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(rows);
})




app.post("/shirts", async (req, res) => {

    let brand = req.body.brand;
    let model = req.body.model;
    let size = req.body.size;
    let price = req.body.price;

    try {
        const connection = await mysql.createConnection(mysqlConfig);

        const response = await connection.execute(`INSERT INTO shirts (brand, model, size, price) VALUES ('${brand}', '${model}', '${size}', ${price})`);
        console.log(response);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send('yees');
})




app.get("*", async (req, res) => {
    res.status(404).send("Oh no you don't");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
