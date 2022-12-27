const express = require('express');
const { addChat, getAllChat, reqInvite, resInvite, getInvite } = require('../controllers/groupController')

const router = express.Router();

router.post('/groups', addChat);
router.get('/groups', getAllChat);
router.post('/groups/req', reqInvite);
router.post('/groups/res', resInvite);
router.get('/groups/invite', getInvite);



module.exports = router;