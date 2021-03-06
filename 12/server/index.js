const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');

const port = process.env.PORT || 8080;

const membershipsRoute = require('./src/routes/memberships');
const usersRoute = require('./src/routes/users');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/memberships', membershipsRoute);
app.use('/api/users', usersRoute);



app.listen(port, () => console.log(`Server is running on port ${port}`));
