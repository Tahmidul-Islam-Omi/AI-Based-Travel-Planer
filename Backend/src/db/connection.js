const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool configured for Supabase
const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false // Required for Supabase connections
    }
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Supabase database connected successfully');
    } catch (err) {
        console.error('Supabase database connection error', err.stack);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDB, pool };
