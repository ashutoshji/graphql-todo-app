require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({});

const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};
console.log('config', config)
const db = pgp(`'${process.env.POSTGRES_DB_CONFIG}'`);
console.log('config', db.connect())
exports.db = db;