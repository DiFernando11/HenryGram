const PostSchema = require("../models/Post");
const UserSchema = require("../models/User");
const FriendSchema = require("../models/Friend");
const GroupSchema = require("../models/Group");
const shuffle = require("../utils/shuffle");
const { all } = require("axios");

const postController = async (req, res) => {
  /*
    Controlador de la Ruta para realizar un posteo
  */

  const { userId, description } = req.body;

  let group = null;
  let image;
  let hidden;
  let isMatch;
  let hashtags;
  let title;
  let avatar;

  req.body.image ? (image = req.body.image) : (image = null);
  req.body.hidden ? (hidden = req.body.hidden) : (hidden = false);
  req.body.isMatch ? (isMatch = req.body.isMatch) : (isMatch = false);
  req.body.hashtags ? (hashtags = req.body.hashtags) : (hashtags = null);
  req.body.title ? (title = req.body.title) : (title = null);
  req.body.avatar ? (avatar = req.body.avatar) : (avatar = null);

  if (isMatch) {
    group = await GroupSchema.create({
      title,
      avatar: avatar
        ? avatar
        : "https://res.cloudinary.com/dgmv4orvc/image/upload/v1671629546/Images/g8ivckqtlen69rgcyzop.png",
      creator: userId,
      users: [userId],
    });

    const user = await UserSchema.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { groups: group._id } }
    );
  }

  const post = PostSchema({
    userId,
    description,
    image,
    hidden,
    isMatch,
    hashtags,
    group: isMatch ? group._id : null,
  });

  try {
    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const postCommentController = async (req, res) => {
  /*
    Controlador de la Ruta pora realizar un comentario
  */

  const { postId, userId, description } = req.body;

  const post = await PostSchema.findOne({
    _id: postId,
  });

  if (post) {
    post.comments.push({
      description: description,
      userId: userId,
      date: Date.now(),
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
};

const recomendedPostController = async (req, res) => {
  /*
    Controlador de la Ruta para obtener publicaciones recomendadas
  */

  let { userId } = req.params;

  const limit = req.query.limit ? parseInt(req.query.limit) : 1;

  const maxAmount = 20;

  const range = [limit * maxAmount - maxAmount, limit * maxAmount];

  let user = null;
  if (String(userId) === "undefined") {
    userId = null;
  }

  if (userId !== null) {
    try {
      user = await UserSchema.findOne({ _id: userId });
    } catch (error) {
      res.status(500).json(error);
    }
  }


  let userFriendsPosts = [];
  let friendships = [];
  const maxPosts = 100;

  if (user) {
    if (user.friends.length > 0) {
      friendships = user.friends.map(async (friend) => {
        return await FriendSchema.findOne({ _id: friend });
      });
    }
  }

  Promise.all(friendships).then((friendships) => {
    userFriendsPosts = friendships.map(async (friendShip) => {
      if (friendShip.status === 3) {
        if (String(friendShip.requester._id) === String(userId)) {
          return await PostSchema.find({ userId: friendShip.recipient._id });
        } else {
          return await PostSchema.find({ userId: friendShip.requester._id });
        }
      }
    });
    Promise.all(userFriendsPosts).then((userFriendsPosts) => {
      userFriendsPosts = shuffle(userFriendsPosts.flat());
      let allPosts = [];
      if (userFriendsPosts.length < maxPosts) {
        allPosts = PostSchema.find({ userId: { $ne: userId } })
          .then((posts) => {
            posts = posts.slice(0, maxPosts - userFriendsPosts.length);
            posts = posts.filter(
              (post) => String(post.userId) !== String(userId)
            );
            posts = userFriendsPosts.concat(posts);
            let hash = {};
            posts = posts.filter((o) => {
              if (o) {
                return hash[o._id] ? false : (hash[o._id] = true);
              } else {
                return false;
              }
            });
            //ordenar por fecha
            posts = posts.sort((a, b) => {
              return a.created - b.created;
            });

            posts = posts.slice(range[0], range[1]);
            if (posts.length === 0) {
              return res.status(200).json([]);
            }
            const postsWithUser = [];
            posts.forEach((p) => {
              const user = UserSchema.findOne({ _id: p.userId });
              user.then((u) => {
                const userDestructured = {
                  _id: u._id,
                  firstName: u.firstName,
                  lastName: u.lastName,
                  avatar: u.avatar,
                };
                const postDestructured = {
                  _id: p._id,
                  userId: p.userId,
                  description: p.description,
                  image: p.image,
                  hidden: p.hidden,
                  isMatch: p.isMatch,
                  hashtags: p.hashtags,
                  created: p.created,
                  comments: p.comments.length,
                  likes: p.likes,
                  group: p.group,
                  lastComment: p.comments[p.comments.length - 1],
                };

                postsWithUser.push({
                  post: postDestructured,
                  user: userDestructured,
                });
                if (postsWithUser.length === posts.length) {
                  postsWithUser.sort((a, b) => {
                    return a.post.created - b.post.created;
                  });
                  return res.status(200).json(postsWithUser);
                }
              });
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      }
    });
  });
};

const getAllUPost = async (req, res) => {
  /*
    Controlador de la Ruta para obtener todos las publicaciones
  */

  const posts = [];

  const limit = req.query.limit ? parseInt(req.query.limit) : 1;

  const maxAmount = 20;

  const range = [limit * maxAmount - maxAmount, limit * maxAmount];

  try {
    let post = await PostSchema.find();

    post = post.slice(range[0], range[1]);

    post.forEach((p) => {
      const user = UserSchema.findOne({ _id: p.userId });

      user.then((u) => {
        const userDestructured = {
          _id: u._id,
          firstName: u.firstName,
          lastName: u.lastName,
          avatar: u.avatar,
        };
        posts.push({
          post: p,
          user: userDestructured,
        });
        if (posts.length === post.length) {
          res.status(200).json(posts);
        }
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

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
};

const getPostsByUser = async (req, res) => {
  /*
    Controlador de la Ruta para obtener publicaciones de un usuario
  */

  const { id, limit } = req.query;

  if (!id || id === "undefined") {
    return res.status(404).json({ message: "Posts not found" });
  }

  try {
    const offset = 20;

    const posts = await PostSchema.find({ userId: id }).sort({ created: -1 });

    const modifiedPosts = posts.map((post) => {
      return {
        _id: post._id,
        userId: post.userId,
        description: post.description,
        image: post.image,
        hidden: post.hidden,
        isMatch: post.isMatch,
        hashtags: post.hashtags,
        created: post.created,
        comments: post.comments.length,
        likes: post.likes,
        group: post.group,
        lastComment: post.comments[post.comments.length - 1],
      };
    });

    const twentyPosts = modifiedPosts.slice(offset * (limit - 1), offset * limit)

    return res.status(200).json(twentyPosts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  /*
    Controlador de la Ruta para eliminar una publicacion
  */

  const { id } = req.params;

  try {
    const post = await PostSchema.findOne({ _id: id });
    console.log(post);
    if (post) {
      await post.delete();
      console.log("Post deleted");
      res.status(200).json({ message: "Post deleted" });
    } else {
      console.log("Post not found");
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const likePost = async (req, res) => {
  /*
    Controlador de la Ruta para dar like a una publicacion
  */

  const { postId, userId } = req.query;

  try {
    const post = await PostSchema.findOne({ _id: postId });
    if (post) {
      if (post.likes.some((like) => String(like._id) === String(userId))) {
        post.likes = post.likes.filter(
          (like) => String(like._id) !== String(userId)
        );
      } else {
        post.likes.push(userId);
      }
      await post.save();
      res.status(200).json({ message: "I like o dislike it sent with success" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  /*
    Controlador de la Ruta para actualizar una publicacion
  */

  const { id } = req.params;
console.log(req.body)
  const { description, hashtags, image } = req.body;

  try {
    // actualizar la publicacion
    const post = await PostSchema.updateOne( { _id: id }, { $set: { description, hashtags, image } } );
    console.log(post);
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFriendsMatches = async (req, res) => {
  /*
    Controlador de la Ruta para obtener los matches recomendados
  */

  const { userId } = req.params;
  let matches = [];
  const maxAmount = 20;

  try {
    const user = await UserSchema.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userFriends = await FriendSchema.find({
      $or: [{ requester: userId }, { recipient: userId }],
    });
    const userFriendsIds = userFriends.map((friend) => {
      if (friend.requester === userId) {
        return friend.recipient;
      } else {
        return friend.requester;
      }
    });
    const userFriendsPosts = await PostSchema.find({
      userId: { $in: userFriendsIds },
    });
    userFriendsPosts.forEach((post) => {
      if (post.isMatch) {
        matches.push(post);
      }
    });
    if (matches.length > 0) {
      matches = matches.slice(0, maxAmount);
      matches = shuffle(matches);
      const matchesWithUsers = await Promise.all(
        matches.map(async (match) => {
          const user = await UserSchema.findOne({ _id: match.userId });
          const userDestructured = {
            _id: user._id,
            firtsName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          };
          return {
            match: match,
            user: userDestructured,
          };
        })
      );
      res.status(200).json(matchesWithUsers);
    } else {
      res.status(404).json({ message: "No matches found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllMatches = async (req, res) => {
  /*
    Controlador de la Ruta para obtener todos los matches
  */

  console.log("getAllMatches");

  const { max } = req.query;
  const maxAmount = max ? max : 20;

  try {
    const matches = await PostSchema.find({ isMatch: true }).limit(maxAmount);

    if (matches.length > 0) {
      matches = shuffle(matches);
      res.status(200).json(matches);
    } else {
      res.status(404).json({ message: "No matches found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  // console.log('getAllMatches');

  // const { max } = req.query;
  // const maxAmount = max ? max : 20;
  // let matches = [];
  // try {
  // 	matches = await PostSchema.find({ isMatch: true }).limit(maxAmount);
  // 	console.log(matches);

  // 	if (matches.length > 0) {
  // 		matches = shuffle(matches);
  // 		res.status(200).json(matches);
  // 	} else {
  // 		res.status(404).json({ message: 'No matches found' });
  // 	}
  // } catch (error) {
  // 	console.log(error);
  // 	res.status(500).json({
  // 		error,
  // 		message: 'Error getting matches'
  // 	});
  // }
  res.status(200).json({ message: "getAllMatches" });
};

const getComments = async (req, res) => {
  /*
    Controlador de la Ruta para obtener los comentarios de una publicacion
  */

  const { id, limit } = req.query;

  const offset = 10;

  try {
    const post = await PostSchema.findOne({ _id: id });
    if (post) {
      let commentsWithUsers = await Promise.all(post.comments.map(async (comment) => {
        const user = await UserSchema.findOne({ _id: comment.userId }, { firstName: 1, lastName: 1, avatar: 1 });
        const userDestructured = { comment: comment, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar };
        return userDestructured;
      }));

      let tenComments = commentsWithUsers.sort((a, b) => b.comment.date - a.comment.date).slice(offset * (limit - 1), offset * limit);

      res.status(200).json(tenComments);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPostsById = async (req, res) => {
  /*
    Controlador de la Ruta para obtener un post por su id
  */

  const { id } = req.params;

  try {
    const post = await PostSchema.findOne({ _id: id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRecomendedMatches = async (req, res) => {

  const { userId } = req.params;

  const limit = req.query.limit ? parseInt(req.query.limit) : 1;

  const maxAmount = 10;

  const range = [limit * maxAmount - maxAmount, limit * maxAmount];


  try {
    const user = await UserSchema.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userFriends = await FriendSchema.find({ $or: [{ requester: userId }, { recipient: userId }], status: 3 });
    let userFriendsIds = []
    userFriendsIds = userFriends.map((friend) => {
      if (friend.requester === userId) {
        return friend.recipient;
      } else {
        return friend.requester;
      }
    });
    let userFriendsPosts = []
    userFriendsIds.length && (userFriendsPosts = await PostSchema.find({ userId: { $in: userFriendsIds }, isMatch: true }))

    // Trae mas posts que no sean del usuario ni  de sus amigos
    let posts = await PostSchema.find({ userId: { $nin: [...userFriendsIds, userId] }, isMatch: true })
    // concatena los posts de los amigos con los posts que no son de los amigos
    posts = [...userFriendsPosts, ...posts];
    //ordenar los posts por fecha
    posts.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
    //solo toma los posts que estan en el rango
    posts = posts.slice(range[0], range[1]);
    const postsWithUsers = await Promise.all(posts.map(async (post) => {
      const user = await UserSchema.findOne({ _id: post.userId });
      const userDestructured = {
        _id: user._id,
        firtsName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      }
      return {
        match: post,
        user: userDestructured
      }
    }));

    // ORDENA LOS POSTS POR FECHA
    postsWithUsers.sort((a, b) => {
      return new Date(b.match.created) - new Date(a.match.created);
    });
    return res.status(200).json(postsWithUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

};

module.exports = {
  postController,
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
  getRecomendedMatches,
};
