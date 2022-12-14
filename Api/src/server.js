const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
var morgan = require('morgan');
const cors = require('cors');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use('/api', userRoutes);
app.use('/api', postRoutes);
// app.use(
// 	cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'] })
// );
// app.use(
// 	cors({
// 		origin: ['https://127.0.0.1:5173/', 'https://gamer-commerce.vercel.app/'],
// 		methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
// 	})
// );
// Global Variables

// Routes
app.get('/', (req, res) => {
	try {
		res.send('Welcome to HenryGram API');
	} catch (error) {
		console.log(error);
	}
});
app.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = app;
