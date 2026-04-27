const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'reseller'
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;