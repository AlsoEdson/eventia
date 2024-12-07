const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DBEventia',
    password: 'mysql',
    port: 5432,
});

module.exports = pool;