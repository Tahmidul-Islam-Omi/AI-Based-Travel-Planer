const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default welcome route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the AI Based Travel Planner App' });
});

// Routes
app.use('/api/v1/auth', authRoutes);

const startServer = async () => {
    await connectDB(); // Ensure database is connected before starting the server

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer(); // Start the server