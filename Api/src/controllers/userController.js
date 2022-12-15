const UserSchema = require('../models/User');
const FriendSchema = require('../models/Friend');
const ObjectId = require('mongoose').Types.ObjectId;
const bycrypt = require('bcryptjs');
const { confirmationEmail } = require('../config/nodemailer');
const { mapReduce } = require('../models/User');
const { getToken, getTokenData } = require('../config/jwt');
const encryptPassword = require('../utils/encryptPassword');

// const transporter = require('../config/nodemailer');


const postUser = async (req, res) => {

    /*
       Controlador de la Ruta de registro de usuario

       Se le podría agregar:
        -validación con envío email
        -Validar que no exista un usuario con el mismo email (Aunque debería validarlo el front tambien)
        -Validar que no exista un usuario con el mismo nombre (Aunque debería validarlo el front tambien)
    */

    let {
        firstName,
        lastName,
        email,
        password,
        gender,
    } = req.body;

    const alreadyExist = await UserSchema.findOne({ email: email })

    if (alreadyExist) {
        /*
            Si el usuario ya existe, debería devolver un error
        */
        res.status(400).json({ msg: 'User already exists' });
    }

    password = encryptPassword(password);
    console.log(password);


    const token = getToken({ email: email, password: password });
    
    confirmationEmail(firstName, email, token);

    const newUser = new UserSchema({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }

}

const validateUser = async (req, res) => {

    /*
        Controlador de la ruta que valida los email de los usuarios

    */

    const { token } = req.params;

    const { email, password } = getTokenData(token).data

    if (!email || !password) {
        res.status(400).json({ msg: 'Invalid token' });
    }

    const user = await UserSchema.findOne({ email: email});

    if (!user) {
        res.status(400).json({ msg: 'Invalid token' });
    }

    user.active = true;

    try {
        await user.save();
        res.redirect('http://127.0.0.1:5173/validate')
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getUser = async (req, res) => {

    /*
        Controlador de la Ruta para obtener un usuario
    */

    const { id } = req.params

    const user = await UserSchema.findOne({ _id: id })
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

const getAllUsers = async (req, res) => {

    /*
        Controlador de la Ruta para obtener todos los usuarios
    */
    let users = [];

    try {
        users = await UserSchema.find();

    } catch (err) {
        res.status(500).json(err);
    }


    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: 'Users not found' });
    }
}

const getUsersByName = async (req, res) => {

    /*
        Controlador de la Ruta para obtener todos los usuarios por nombre
    */

    const { name } = req.params


    //Se usa una regex para que no sea case sensitive
    let usersFirstName = [];
    let usersLastName = [];
    try {
        usersFirstName = await UserSchema.find({ firstName: { $regex: new RegExp('^' + name + '$', "i") } });
        usersLastName = await UserSchema.find({ lastName: { $regex: new RegExp('^' + name + '$', "i") } });
    } catch (err) {
        res.status(500).json(err);
    }

    const users = usersFirstName.concat(usersLastName)

    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: 'Users not found' });
    }
}

const LogIn = async (req, res) => {

    /*
        Controlador de la Ruta para loguear un usuario
    */

    const { email, password } = req.body;
    console.log(email, password)
    const user = await UserSchema.findOne({
        email: email
    })
    try {
        if (user) {
            bycrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).json(user);
                    console.log('user logged in')
                } else {
                    res.status(404).json({ message: 'wrong Password or invalid email' });
                    console.log('wrong Password or invalid email')
                }
            });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log('error')
    }
}

const getFriendship = async (req, res) => {

    /*
        Controlador de la Ruta para obtener las amistades (amigos, pendientes, esperando)
    */

    const { id } = req.params

    const f = await UserSchema.findOne({ _id: id }, { friends: 1 })

    Promise.resolve(f.friends)
        .then(value => {
            let response = Promise.all(value.map(async (el) => {
                return await FriendSchema.findOne({ _id: ObjectId(el.valueOf()) })
            }))
            return response
        }).then((result) => {
            if (result.length) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: 'Friendship not found' });
            }
        }).catch((e) => {
            console.log(e)
        })
}

module.exports = {
    postUser,
    getUser,
    getAllUsers,
    getUsersByName,
    LogIn,
    getFriendship,
    validateUser,
}