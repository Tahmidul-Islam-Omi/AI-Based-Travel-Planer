const express = require('express');
const { connectDB } = require('./db/connection'); // Import the connectDB function
const app = express();

const startServer = async () => {
    await connectDB(); // Ensure database is connected before starting the server

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer(); // Start the server