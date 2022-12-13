const express = require('express');
const { addMessage, getAllMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/messages', addMessage);
router.post('/messages/all', getAllMessage);

module.exports = router;