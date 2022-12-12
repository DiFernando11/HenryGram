const PostSchema = require('../models/Post');

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

    req.body.image ? image = req.body.image : image = null;
    req.body.hidden ? hidden = req.body.hidden : hidden = false;
    req.body.isMatch ? isMatch = req.body.isMatch : isMatch = false;

    const post = PostSchema({
        userId,
        description,
        image,
        hidden,
        isMatch
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

module.exports = {
    postController,
    postCommentController,
    getAllUPost
}