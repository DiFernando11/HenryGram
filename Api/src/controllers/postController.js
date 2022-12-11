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

    post.save()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json(err);
        });
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
        post.save()
            .then(post => {
                res.status(200).json(post);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

const getAllUPost = async (req, res) => {

    /*
        Controlador de la Ruta para obtener todos las publicaciones
    */

    PostSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

module.exports = {
    postController,
    postCommentController,
    getAllUPost
}