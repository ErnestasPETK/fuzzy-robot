const express = require('express');
const { isLoggedIn } = require('..//middleware/middleware');

const router = express.Router();


router.get("/", isLoggedIn, async (req, res) => {
    res.status(200).send("Hello World");
});


module.exports = router;