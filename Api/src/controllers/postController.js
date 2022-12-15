const PostSchema = require('../models/Post');
const UserSchema = require("../models/User");
const FriendSchema = require("../models/Friend");
const shuffle = require('../utils/shuffle');

const postController = async (req, res) => {

    /*
        Controlador de la Ruta para realizar un posteo
    */

    const {
        userId,
        description,
    } = req.body;

    let image
    let hidden
    let isMatch
    let hashtags

    req.body.image ? image = req.body.image : image = null;
    req.body.hidden ? hidden = req.body.hidden : hidden = false;
    req.body.isMatch ? isMatch = req.body.isMatch : isMatch = false;
    req.body.hashtags ? hashtags = req.body.hashtags : hashtags = null;

    const post = PostSchema({
        userId,
        description,
        image,
        hidden,
        isMatch,
        hashtags
    });

    try {
        const newPost = await post.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
}

const postCommentController = async (req, res) => {

    /*
        Controlador de la Ruta pora realizar un comentario
    */

    const {
        postId,
        userId,
        description,
    } = req.body;

    const post = await PostSchema.findOne({
        _id: postId
    })

    if (post) {
        post.comments.push({
            description: description,
            userId: userId,
            date: Date.now()
        });
        try {
            const newPost = await post.save();
            res.status(200).json(newPost);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

const getAllUPost = async (req, res) => {

    /*
        Controlador de la Ruta para obtener todos las publicaciones
    */
    try {
        const posts = await PostSchema.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getPosts = async (req, res) => {

    /*
        Controlador de la Ruta para obtener publicaciones recomendadas
    */

    const { userId } = req.params;

    const user = await UserSchema.findOne({ _id: userId });

    console.log(user)

    const posts = []
    

    // if (user.friends.length > 0) {
    //     user.friends.map(async (friend) => {
    //         posts.push(await PostSchema.find({ userId: friend._id }));
    //     })
    // }

    // posts = posts.shuffle();

    // const RequiereAmountOfPosts = 60

    // if (posts.length > RequiereAmountOfPosts) {
    //     res.status(200).slice(0, RequiereAmountOfPosts)
    // } else {
    //     posts.push(await PostSchema.find().slice(0, RequiereAmountOfPosts - posts.length));
    // }

    // if (posts.length > 0) {
    //     res.status(200).json(posts);
    // } else {
    //     res.status(404).json({ message: "Posts not found" });
    // }

    res.status(200).json("hola");
}

const getPostsByHashtag = async (req, res) => {

    /*
        Controlador de la Ruta para obtener publicaciones por hashtag
    */

    const { hashtag } = req.params;

    const posts = await PostSchema.find({ hashtags: hashtag });

    if (posts.length > 0) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ message: "Posts not found" });
    }
}




module.exports = {
    postController,
    postCommentController,
    getAllUPost,
    getPosts,
    getPostsByHashtag
}