const express = require('express');
const { addChat, getAllChat, reqInvite, resInvite, getGroups } = require('../controllers/groupController')

const router = express.Router();

router.post('/groups', addChat);
router.get('/groups', getAllChat);
router.post('/groups/req', reqInvite);
router.post('/groups/res', resInvite);
router.get('/groups/:userId', getGroups );



module.exports = router;