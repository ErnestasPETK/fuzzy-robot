const mysql = require('mysql2/promise');
const express = require('express');

const MYSQL_CONFIG = require('../config');

const router = express.Router();


router.get("/", async (req, res) => {

    let pet_id;

    req.query.pet_id ? pet_id = req.query.pet_id : res.status(400).send("Bad request");

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [logs] = await connection.execute(`SELECT * FROM logs LEFT JOIN pets ON logs.pet_id = pets.id WHERE logs.pet_id = ${pet_id}`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(logs);
});


router.post("/", async (req, res) => {

    let response;

    let petId = req.body.petId;
    let description = req.body.description;
    let status = req.body.status;

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`INSERT INTO logs (pet_id, description, status) VALUES ('${petId}', '${description}', ${status})`);
        await connection.end();
        res.status(200).send("OK");


    } catch (e) {
        res.status(404).send(e);
    }

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
