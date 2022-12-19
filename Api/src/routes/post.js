const express = require('express');
const { postController, 
        postCommentController, 
        getAllUPost, 
        recomendedPostController, 
        getPostsByHashtag, 
        getPostsByUser,
        deletePost,
        likePost,
        updatePost } = require('../controllers/postController');


const router = express.Router();

router.post('/posts', postController);
router.get('/posts', getAllUPost)
router.get('/posts/:id', getPostsByUser) //id del usuario
router.delete('/posts/:id', deletePost) //id del post
router.put('/posts/:id', updatePost) //id del post
router.post('/posts/like', likePost); //Por body se envia el id del post y el id del usuario como userId, postId
router.post('/posts/comment', postCommentController);
router.get('/posts/recomended/:userId', recomendedPostController)
router.get('/posts/hashtag/:hashtag', getPostsByHashtag)

module.exports = router;