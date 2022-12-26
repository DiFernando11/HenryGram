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


const confirmationEmail = (name, email, token) => {

    transporter.sendMail({
        from: `HenryGram🚀 -  <${process.env.EMAIL}>`,
        to: email,
        subject: 'HenryGram - Validación de usuario',
        text: `
            Hola ${name}, gracias por registrarte en HenryGram. Para validar tu usuario, 
            por favor ingresa al siguiente link: http://localhost:3000/api/validateUser/${token}        
        `,
        html: `
                <h1>Hola ${name}, gracias por registrarte en HenryGram.</h1>
                <p>Para validar tu usuario, por favor ingresa al siguiente link:</p>
                <a href="http://localhost:3000/api/validateUser/${token}">Validar usuario</a>
            `
    }, (err, info) => {
        if (err) {
            return err;
        } else {
            return info;
        }
    });
}


module.exports = {
    confirmationEmail
}