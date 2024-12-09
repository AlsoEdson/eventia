const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    //connectionString: 'postgres://postgres:mysql@localhost:5432/DBEventia',
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.connect()
    .then(() => console.log('PostgreSQL connected successfully'))
    .catch(err => console.error('PostgreSQL connection error: ', err));

module.exports = pool;