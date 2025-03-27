const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const { connectDB } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

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