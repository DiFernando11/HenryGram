const express = require('express');
const { postUser, getUser, getAllUsers, getUsersByName, LogIn, getFriendship } = require('../controllers/userController');

const router = express.Router();

router.post('/users', postUser);
router.get('/users', getAllUsers);
router.get('/users/name/:name', getUsersByName);
router.get('/users/id/:id', getUser);
router.post("/users/login", LogIn);
router.get('/users/friends/:id', getFriendship);


module.exports = router;