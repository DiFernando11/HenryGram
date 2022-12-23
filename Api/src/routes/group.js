const express = require('express');
const { addChat, getAllChat } = require('../controllers/groupController')

const router = express.Router();

router.post('/groups', addChat);
router.get('/groups', getAllChat);

module.exports = router;