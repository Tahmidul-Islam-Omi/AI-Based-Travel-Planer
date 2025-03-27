const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Make sure you're loading environment variables at the top of the file
require('dotenv').config();

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Then verify that you're using the environment variables correctly
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.NODE_ENV === 'production' 
                ? 'https://voyagebot.vercel.app/api/v1/auth/google/callback'
                : '/api/v1/auth/google/callback',
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findByEmail(profile.emails[0].value);
                
                if (user) {
                    // User exists, return the user
                    return done(null, user);
                }
                
                // Create new user if doesn't exist
                const newUser = await User.create(
                    profile.displayName,
                    profile.emails[0].value,
                    null // No password for Google auth
                );
                
                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;