const mysql = require('mysql2/promise');
const express = require('express');

const MYSQL_CONFIG = require('../config');

const router = express.Router();


router.get("/", async (req, res) => {

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [medications] = await connection.execute(`SELECT * FROM medications`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(medications);
});


router.post("/", async (req, res) => {

    let response;

    let name = req.body.name;
    let description = req.body.description;

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`INSERT INTO medications (name, description) VALUES ('${name}', '${description}')`);
        await connection.end();

    } catch (e) {
        res.status(404).send(e);
    }

    res.status(200).send("OK");
});


module.exports = router;
