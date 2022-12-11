const express = require('express');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", userRoutes);
app.use("/api", postRoutes);

// Global Variables

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to HenryGram API');
});

module.exports = app;