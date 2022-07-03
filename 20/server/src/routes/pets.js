const mysql = require('mysql2/promise');
const express = require('express');

const MYSQL_CONFIG = require('../config');

const router = express.Router();


router.get("/", async (req, res) => {

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [pets] = await connection.execute(`SELECT * FROM pets WHERE archived = 0`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(products);
});


router.post("/", async (req, res) => {

    let response;

    let name = req.body.name;
    let dateOfBirth = req.body.dateOfBirth;
    let clientEmail = req.body.clientEmail;

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`INSERT INTO pets (name, date_of_birth, client_email) VALUES ('${name}', '${dateOfBirth}', ${clientEmail})`);
        await connection.end();

    } catch (e) {
        res.status(404).send(e);
    }

    res.status(200).send("OK");
});


router.delete("/", async (req, res) => {

    let response;

    try {
        let pet_id = req.body.pet_id;
    }
    catch {
        res.status(400).send("Bad Request");
    }

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`UPDATE pets SET archived = 1 WHERE id = '${pet_id}'`);
        await connection.end();

    } catch (e) {
        res.status(404).send(e);
    }

    res.status(200).send("OK");
});

module.exports = router;
