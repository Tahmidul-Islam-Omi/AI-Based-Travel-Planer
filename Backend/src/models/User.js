const { pool } = require('../db/connection');

class User {
    // Create a new user
    static async create(name, email, passwordHash) {
        try {
            // If passwordHash is null (Google auth), set a placeholder
            const query = 'INSERT INTO users (name, email, password_hash, is_google_user) VALUES ($1, $2, $3, $4) RETURNING id, name, email, created_at';
            const isGoogleUser = passwordHash === null;
            const values = [name, email, passwordHash || '', isGoogleUser];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = await pool.query(query, [email]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(id) {
        try {
            const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;