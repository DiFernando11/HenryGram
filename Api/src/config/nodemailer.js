const nodemailer = require('nodemailer');

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
console.log(email, password);
console.log(typeof email, typeof password)

const transporter = nodemailer.createTransport({

    service: 'gmail',
    port: 465,
    secure: false,
    auth: {
        user: email,
        pass: password
    },
    logger: false,
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is ready to take messages');
    }
})

module.exports = transporter;