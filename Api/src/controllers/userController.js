const UserSchema = require('../models/User');
const bycrypt = require('bcryptjs');

const postUser = async (req, res) => {

    /*
       Controlador de la Ruta de registro de usuario

       Se le podría agregar:
        -validación con envío email
        -Validar que no exista un usuario con el mismo email (Aunque debería validarlo el front tambien)
        -Validar que no exista un usuario con el mismo nombre (Aunque debería validarlo el front tambien)

    */

    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const user = UserSchema({
                firstName,
                lastName,
                email,
                password: hash
            });
            user.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        });
    });
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

    const users = await UserSchema.find();

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

    const usersFirstName = await UserSchema.find({ firstName: { $regex : new RegExp('^'+ name + '$', "i") } });
    const usersLastName = await UserSchema.find({ lastName: { $regex : new RegExp('^'+ name + '$', "i") } });
    
    //Se usa una regex para que no sea case sensitive

    const users = usersFirstName.concat(usersLastName)

    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: 'Users not found' });
    }
}






module.exports = {
    postUser,
    getUser,
    getAllUsers,
    getUsersByName
}