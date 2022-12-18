const express = require('express');
const { addFriend, acceptRejectFriend } = require('../controllers/friendController');

const router = express.Router();

router.post('/friends/add', addFriend );
//usera: quien envia , userb: quien la reciba
//usera: el que envia va a tener estado 1 , userb: recibe 2
//estado: 3 aceptado
router.post('/friends/res', acceptRejectFriend );

module.exports = router;