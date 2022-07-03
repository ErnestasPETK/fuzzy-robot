const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');

const port = process.env.PORT || 8080;
const petsRoute = require('./src/routes/pets');
const medicationsRoute = require('./src/routes/medications');
const logsRoute = require('./src/routes/logs');
const prescriptionsRoute = require('./src/routes/prescriptions');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/pets', petsRoute);
app.use('/api/v1/medications', medicationsRoute);
app.use('/api/v1/logs', logsRoute);
app.use('/api/v1/prescriptions', prescriptionsRoute);

app.all("*", async (req, res) => {
    res.status(404).send("Oh no you don't");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
