const express = require('express');
const { postController, postCommentController, getAllUPost } = require('../controllers/postController');

const router = express.Router();


router.post('/posts/comment', postCommentController);
router.get('/posts', getAllUPost)

module.exports = router;