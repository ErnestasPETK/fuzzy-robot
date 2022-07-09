const mysql = require('mysql2/promise');
const express = require('express');

const { MYSQL_CONFIG, userSchema } = require('../config');

const router = express.Router();

const bcrypt = require('bcryptjs');


router.post("/", async (req, res) => {

    let userData = req.body;
    let response;
    try {

        userData = await userSchema.validateAsync(userData);
    }
    catch (err) {
        res.status(400).send({ err: `Incorrect email or password  ${err}` });
    }

    try {

        const connection = await mysql.createConnection(MYSQL_CONFIG);

        [response] = await connection.execute(`SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`);
        await connection.end();
        if (response.length === 0) {
            return res.status(404).send({ err: `Incorrect email or password  ${err}` });
        }

        const isAuthed = bcrypt.compareSync(userData.password, response[0].password);
        return isAuthed ? res.status(200).send("OK") : res.status(404).send({ err: `Incorrect email or password  ${err}` });


    } catch (err) {
        return res.status(404).send({ err: `Bad request  ${err}` });
    }

});


module.exports = router;
