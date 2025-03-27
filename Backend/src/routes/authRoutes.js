const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const passport = require('../config/passport');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    authController.googleAuthCallback
);

// Get current user profile (protected route)
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;