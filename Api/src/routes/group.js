const express = require('express');
const { addChat } = require('../controllers/groupController')

const router = express.Router();

router.post('/group', addChat);

module.exports = router;