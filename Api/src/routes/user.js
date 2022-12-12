const express = require('express');
const { postUser, getUser, getAllUsers, getUsersByName } = require('../controllers/userController');

const router = express.Router();

router.post('/users', postUser); //Ruta de registro
router.get('/users', getAllUsers); //Ruta que trae todos los usuarios (Deberia ser solo para admins)
router.get('/users/id/:id', getUser); //Ruta que trae un usuario por id (Deberia ser solo para admins)
router.get('/users/name/:name', getUsersByName); //Ruta que trae todos los usuarios por nombre (P)


module.exports = router;