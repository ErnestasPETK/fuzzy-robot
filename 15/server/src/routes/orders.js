const mysql = require('mysql2/promise');
const express = require('express');

const router = express.Router();


router.get("/", async (req, res) => {
    let products;
    try {
        const connection = await mysql.createConnection(mysqlConfig);

        [products] = await connection.execute(`SELECT * FROM products`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(products);
});


router.post("/", async (req, res) => {

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
});

module.exports = router;
