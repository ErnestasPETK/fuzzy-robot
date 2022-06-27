const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors("http://127.0.0.1:5500/"));
app.use(express.json());

const names = [];

app.get('/names', (req, res) => {

    res.status(200).json({ "body": names });

});


app.post('/names', (req, res) => {

    const requestBody = req.body;
    res.status(202).json({ "ok": true });
    names.push(requestBody.name);

});

app.listen(3000, () => console.log("Listening on port 3000"));