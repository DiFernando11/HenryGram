const express = require('express');
const { addFriend, acceptRejectFriend } = require('../controllers/friendController');

const router = express.Router();

router.post('/friends/add', addFriend );
router.post('/friends/res', acceptRejectFriend );

module.exports = router;