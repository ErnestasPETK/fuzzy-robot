const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
const port = process.env.PORT || 8080;

const client = new MongoClient(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get("/api/categories", async (req, res) => {

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("conjugation").collection("categories").find({}).toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
})

app.get("/api/products", async (req, res) => {

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("conjugation").collection("products").find({}).toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
})

app.get("/api/categoryvalue/", async (req, res) => {

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("conjugation").collection("products").aggregate([
            { $match: {} },
            { $group: { _id: "$category", total: { $sum: "$price" } } }

        ]).toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
})


app.get("/api/users", async (req, res) => {

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("users").find({}).toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});

app.get("/api/comments", async (req, res) => {

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("users").aggregate([{
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "user_id",
                as: "comments"
            }
        }
        ]).toArray();
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});

app.delete("/api/comments/:id", async (req, res) => {

    let commentId

    try {
        commentId = req.params.id;

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("comments").deleteOne({ _id: ObjectId(commentId) });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});


app.post("/api/users", async (req, res) => {

    let name, email;

    try {
        ({ name, email } = req.body);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }

    console.log(name, email);

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("users").insertOne({ "name": name, "email": email });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});



app.post("/api/users", async (req, res) => {

    let name, email;

    try {
        ({ name, email } = req.body);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch request body" });
    }

    console.log(name, email);

    try {
        const connection = await client.connect();
        const dbRes = await connection.db("nodeJs").collection("users").insertOne({ "name": name, "email": email });
        await connection.close();
        return res.send(dbRes);
    } catch (err) {
        res.status(500).json({ error: "failed to retrieve from db : " + err });
    }
});



app.listen(port, () => console.log(`Server is running on port ${port}`));
