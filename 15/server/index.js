const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');

const port = process.env.PORT || 8080;
const productsRoute = require('./src/routes/products');
const ordersRoute = require('./src/routes/orders');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

app.all("*", async (req, res) => {
    res.status(404).send("Oh no you don't");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
