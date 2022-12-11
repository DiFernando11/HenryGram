const express = require('express');
const { postUser, getUser, getAllUsers, getUsersByName } = require('../controllers/userController');

const router = express.Router();

router.post('/users', postUser);
router.get('/users', getAllUsers);
router.get('/users/name/:name', getUsersByName);
router.get('/users/id/:id', getUser);


module.exports = router;