const express = require('express');
const { postController, 
        postCommentController, 
        getAllUPost, 
        recomendedPostController, 
        getPostsByHashtag, 
        getPostsByUser,
        deletePost } = require('../controllers/postController');


const router = express.Router();

router.post('/posts', postController);
router.get('/posts', getAllUPost)
router.get('/posts/:id', getPostsByUser) //id del usuario
router.delete('/posts/:id', deletePost) //id del post
router.post('/posts/comment', postCommentController);
router.get('/posts/recomended/:userId', recomendedPostController)
router.get('/posts/hashtag/:hashtag', getPostsByHashtag)

module.exports = router;