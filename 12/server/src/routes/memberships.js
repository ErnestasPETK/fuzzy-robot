const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

const client = new MongoClient(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("services").find({}).toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});


router.post("/", async (req, res) => {

    let name, price, description;

    try {
        ({ name, price, description } = req.body);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("services").insertOne({ "name": name, "price": price, "description": description });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});

router.delete("/:id", async (req, res) => {

    let serviceId;

    try {
        serviceId = req.params.id;

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("services").deleteOne({ _id: ObjectId(serviceId) });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});

module.exports = router;
