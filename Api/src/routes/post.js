const express = require('express');
const { postController, 
        postCommentController, 
        getAllUPost, 
        recomendedPostController, 
        getPostsByHashtag, 
        getPostsByUser,
        deletePost,
        likePost,
        updatePost,
        getFriendsMatches,
        getAllMatches,
        getComments,
        getPostsById, 
        getRecomendedMatches, } = require('../controllers/postController');

const router = express.Router();

router.post('/posts', postController);
router.get('/posts', getAllUPost)
router.get('/posts/user', getPostsByUser) //id del usuario
router.get('/posts/id/:id', getPostsById) //id del post
router.delete('/posts/:id', deletePost) //id del post
router.put('/posts/:id', updatePost) //id del post
router.post('/posts/like', likePost); //Por body se envia el id del post y el id del usuario como userId, postId
router.get('/posts/matchess', getAllMatches)
router.get('/posts/matches/:userId', getFriendsMatches) //id del usuario
router.post('/posts/comment', postCommentController);
router.get('/posts/comment', getComments) //id del post
router.get('/posts/recomended/:userId', recomendedPostController)
router.get('/posts/hashtag/:hashtag', getPostsByHashtag)
router.get('/posts/recomendedMatches/:userId', getRecomendedMatches)

module.exports = router;