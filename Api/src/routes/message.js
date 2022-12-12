const express = require('express');
const { addMessage, getAllMessage  } = require('../controllers/messageController');

const router = express.Router();

router.post('/messages', addMessage);
router.get('/messages', getAllMessage);

module.exports = router;