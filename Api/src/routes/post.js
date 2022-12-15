const express = require('express');
const { postController, postCommentController, getAllUPost, getPosts, getPostsByHashtag } = require('../controllers/postController');


const router = express.Router();

router.post('/posts', postController);
router.post('/posts/comment', postCommentController);
router.get('/posts', getAllUPost)
router.get('/posts/recomended/:userId', getPosts)
router.get('/posts/hashtag/:hashtag', getPostsByHashtag)

module.exports = router;