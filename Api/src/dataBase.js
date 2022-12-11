const mongoose = require('mongoose');

const MONGODB_URI = process.env.URI //|| 'mongodb://localhost/test-app';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));