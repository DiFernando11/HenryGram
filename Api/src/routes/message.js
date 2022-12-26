const express = require('express');
const { addMessage, getAllMessage, getMessageByUser } = require('../controllers/messageController');

const router = express.Router();

router.post('/messages', addMessage);
router.post('/messages/all', getAllMessage);
router.get('/messages/:userId', getMessageByUser);

module.exports = router;