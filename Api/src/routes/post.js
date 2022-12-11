const express = require('express');
const { postController, postCommentController } = require('../controllers/postController');


const router = express.Router();

router.post('/posts', postController);
router.post('/posts/comment', postCommentController);

module.exports = router;