const express = require('express');
const { postController, postCommentController, getAllUPost, recomendedPostController, getPostsByHashtag, getPostsByUser } = require('../controllers/postController');


const router = express.Router();

router.post('/posts', postController);
router.post('/posts/comment', postCommentController);
router.get('/posts', getAllUPost)
router.get('/posts/:id', getPostsByUser)
router.get('/posts/recomended/:userId', recomendedPostController)
router.get('/posts/hashtag/:hashtag', getPostsByHashtag)

module.exports = router;