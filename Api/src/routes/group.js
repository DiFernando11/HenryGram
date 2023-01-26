const express = require('express');
const { addChat, getAllChat, reqInvite, resInvite, getGroups, getRecommendedGroups } = require('../controllers/groupController')

const router = express.Router();

router.post('/groups', addChat);
router.get('/groups', getAllChat);
router.post('/groups/req', reqInvite);
router.post('/groups/res', resInvite);
router.get('/groups/:userId', getGroups);
router.get('/groups/recommended/:userId', getRecommendedGroups);



module.exports = router;