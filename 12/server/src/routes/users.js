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


router.get('/:order', async (req, res) => {

    let order = req.params.order;

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("users").find({}).toArray();
        if (order === "asc") {
            dbRes.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (order === "desc") {
            dbRes.sort((a, b) => b.name.localeCompare(a.name));
        }
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});



router.post('/', async (req, res) => {

    let name, surname, email, serviceId;

    try {
        ({ name, surname, email, serviceId } = req.body);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("users").insertOne({ "name": name, "surname": surname, "email": email, "service_id": ObjectId(serviceId) });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});


module.exports = router;
