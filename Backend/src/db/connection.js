const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error', err.stack);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDB, pool };
