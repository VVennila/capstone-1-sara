const express = require('express');
require('dotenv').config();  // To load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Define a basic route for the homepage
app.get('/', (req, res) => {
    res.send(`Welcome to the CICD Express App - Environment: ${process.env.ENVIRONMENT}`);
});

// Additional route for health checks
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'App is healthy!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
