const mysql = require('mysql2/promise');
const express = require('express');
const router = express.Router();

const MYSQL_CONFIG = require('../config');


router.get("/id/:id", async (req, res) => {
    let order_id;
    try {
        order_id = req.params.id;
    }
    catch {
        res.status(400).send("Bad Request");
    }
    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [orders] = await connection.execute(`SELECT * FROM orders LEFT JOIN products ON orders.product_id = products.id WHERE orders.id = ${order_id}`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(orders);
});


router.post("/", async (req, res) => {

    let product_id, customer_name, customer_email, ip_address;
    let response;
    try {
        product_id = req.body.product_id;
        customer_name = req.body.customer_name;
        customer_email = req.body.customer_email;
        ip_address = req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            null;
    }
    catch {
        res.status(400).send("Bad Request");
    }
    let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    ip_address = "::1" ? ip_address = "localhost" : ip_address;

    try {
        const connection = await mysql.createConnection(MYSQL_CONFIG);

        response = await connection.execute(`INSERT INTO orders (product_id, customer_name, customer_email, ip_address, timestamp) VALUES ('${product_id}', '${customer_name}', '${customer_email}', '${ip_address}', '${timestamp}')`);
        await connection.end();

    } catch (e) {
        console.log(e);
    }

    res.status(200).send(response);
});

module.exports = router;
