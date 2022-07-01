const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotEnv);


const MYSQL_CONFIG = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
}

module.exports = MYSQL_CONFIG;
