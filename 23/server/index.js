const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');

const port = process.env.PORT || 8080;
const loginRoute = require('./src/routes/login');
const registerRoute = require('./src/routes/register');
const contentRoute = require('./src/routes/content');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/content', contentRoute);

app.all("*", async (req, res) => {
    res.status(404).send("Oh no you don't");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
