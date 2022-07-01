const mysql = require('mysql2/promise');
const express = require('express');

const MYSQL_CONFIG = require('../config');

const router = express.Router();


router.get("/", async (req, res) => {
    let products;
    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [products] = await connection.execute(`SELECT * FROM products`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(products);
});


router.get("/id/:id", async (req, res) => {

    let product_id;

    try {
        product_id = req.params.id;
    }
    catch {
        res.status(400).send("Bad Request");
    }

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [products] = await connection.execute(`SELECT * FROM products WHERE id = ${product_id}`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(products);
});


router.post("/", async (req, res) => {

    let response;

    let title = req.body.title;
    let image = req.body.image;
    let price = req.body.price;

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`INSERT INTO products (title, image, price) VALUES ('${title}', '${image}', ${price})`);
        await connection.end();

    } catch (e) {
        res.status(404).send(e);
    }

    res.status(200).send("OK");
});

module.exports = router;
