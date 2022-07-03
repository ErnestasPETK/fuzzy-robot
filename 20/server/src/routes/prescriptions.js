const mysql = require('mysql2/promise');
const express = require('express');

const MYSQL_CONFIG = require('../config');

const router = express.Router();


router.get("/", async (req, res) => {

    let petId;
    let medicationsId
    try {
        if (!req.query.petId) throw new Error("Pet ID is required"); else petId = req.query.petId;
        if (!req.query.medicationsId) throw new Error("Medications ID is required"); else medicationsId = req.query.medicationsId;
    }
    catch (err) {
        return res.status(400).send("Error : " + err);
    }
    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [prescriptions] = await connection.execute(`SELECT * FROM prescriptions 
        LEFT JOIN pets ON prescriptions.pet_id = pets.id 
        LEFT JOIN medications ON prescriptions.medications_id = medications.id
         WHERE prescriptions.pet_id = ${petId}`);
        await connection.end();
        return res.status(200).send(prescriptions);

    } catch (e) {
        return res.status(404).send(e);
    }

});


router.post("/", async (req, res) => {

    let response;

    let medicationsId = req.body.medicationsId;
    let petId = req.body.petId;
    let comment = req.body.comment;

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`INSERT INTO prescriptions (medications_id, pet_id, comment) VALUES ('${medicationsId}', '${petId}', '${comment}')`);
        await connection.end();
        res.status(200).send("OK");


    } catch (e) {
        res.status(404).send(e);
    }

});

module.exports = router;
