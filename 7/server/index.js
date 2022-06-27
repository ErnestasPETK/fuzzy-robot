const { MongoClient, ServerApiVersion } = require('mongodb');
const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

const client = new MongoClient(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// app.get('/', async (req, res) => {

//     try {
//         const connection = await client.connect();
//         // const data = await connection.db("nodeJs").collection("cars").find().toArray();
//         const data = await connection.db("nodeJs").collection("cars").find().toArray();
//         client.close();
//         return res.status(200).json({ data: data })
//     } catch (err) {
//         res.status(500).json({ error: "failed to fetch from db : " + err });

//     }

// })
// app.post("/", async (req, res) => {
//     try {
//         ({ brand, model, year } = req.body);

//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch request body" });
//     }
//     try {
//         const connection = await client.connect();
//         const dbRes = await connection.db("nodeJs")
//             .collection("cars")
//             .insertOne({ brand, model, year });
//         await connection.close();
//         return res.send(dbRes);
//     } catch (err) {
//         res.status(500).json({ error: "failed to insert to db : " + err });
//     }
// })

app.get("/api/people", async (req, res) => {
    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs")
            .collection("people")
            .find()
            .toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to insert to db : " + err });
    }
})
app.post("/api/people/create_one", async (req, res) => {
    try {
        ({ name, surname, age } = req.body);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }
    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs")
            .collection("people")
            .insertOne({ name, surname, age });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to insert to db : " + err });
    }
})




app.listen(port, () => console.log(`Server is running on port ${port}`));
