const express = require('express');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const cors = require('cors');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', userRoutes);
app.use('/api', postRoutes);
// app.use(
// 	cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'] })
// );
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
// Global Variables

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to HenryGram API');
});

module.exports = app;
