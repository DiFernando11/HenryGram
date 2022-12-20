const PostSchema = require('../models/Post');
const UserSchema = require('../models/User');
const FriendSchema = require('../models/Friend');
const shuffle = require('../utils/shuffle');
const { all } = require('axios');

const postController = async (req, res) => {
	/*
        Controlador de la Ruta para realizar un posteo
    */

	const { userId, description } = req.body;

	let image;
	let hidden;
	let isMatch;
	let hashtags;

	req.body.image ? (image = req.body.image) : (image = null);
	req.body.hidden ? (hidden = req.body.hidden) : (hidden = false);
	req.body.isMatch ? (isMatch = req.body.isMatch) : (isMatch = false);
	req.body.hashtags ? (hashtags = req.body.hashtags) : (hashtags = null);

	const post = PostSchema({
		userId,
		description,
		image,
		hidden,
		isMatch,
		hashtags,
	});

	try {
		const newPost = await post.save();
		res.status(200).json(newPost);
	} catch (error) {
		console.log(error)
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
		res.status(404).json({ message: 'Post not found' });
	}
};

const recomendedPostController = async (req, res) => {
	/*
        Controlador de la Ruta para obtener publicaciones recomendadas
    */

	const { userId } = req.params;

	let user = null;

	try {
		user = await UserSchema.findOne({ _id: userId });
	} catch (err) {
		return res.status(500).json(err);
	}

	let userFriendsPosts = [];
	let friendships = [];
	const maxPosts = 10;

	if (user.friends.length > 0) {
		friendships = user.friends.map(async (friend) => {
			return await FriendSchema.findOne({ _id: friend });
		});
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
						posts = posts.filter((o) =>{

							if(o){
								return hash[o._id] ? false : (hash[o._id] = true)
							}else{
								return false
							}
						});
						const postsWithUser = []
						posts.forEach((p) => {
							const user = UserSchema.findOne({ _id: p.userId })
							user.then((u) => {
								const userDestructured = {
									_id: u._id,
									firstName: u.firstName,
									lastName: u.lastName,
									avatar: u.avatar,
								};

								postsWithUser.push({
									post: p,
									user: userDestructured,
								});
								if (postsWithUser.length === posts.length) {
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

	const posts = []
	try {
		const post = await PostSchema.find();

		post.forEach((p) => {

			const user = UserSchema.findOne({ _id: p.userId })

			user.then((u) => {
				const userDestructured = {
					_id: u._id,
					firstName: u.firstName,
					lastName: u.lastName,
					avatar: u.avatar,
				}
				posts.push({

					post: p,
					user: userDestructured
				})
				if (posts.length === post.length) {
					res.status(200).json(posts);
				}
			})
		})
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
		res.status(404).json({ message: 'Posts not found' });
	}
};

const getPostsByUser = async (req, res) => {

	/*
		Controlador de la Ruta para obtener publicaciones de un usuario
	*/

	const { id } = req.params;

	try {
		const posts = await PostSchema.find({ userId: id });
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json(error);
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
			console.log('Post deleted');
			res.status(200).json({ message: 'Post deleted' });
		} else {
			console.log('Post not found');
			res.status(404).json({ message: 'Post not found' });
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
				post.likes = post.likes.filter((like) => String(like._id) !== String(userId));
			} else {
				post.likes.push(userId);
			}
			await post.save();
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Post not found' });
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

	const { description,
			hashtags,
			images} = req.body;

	try {
		const post = await PostSchema.findOne({ _id: id });

		if (post) {
			description && (post.description = description);
			hashtags && (post.hashtags = hashtags);
			images && (post.images = images);
			await post.save();
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Post not found' });
		}
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
	const maxAmount = 20

	try {
		const user = await UserSchema.findOne({ _id: userId });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
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
		const userFriendsPosts = await PostSchema.find({ userId: { $in: userFriendsIds } });
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
					}
					return {
						match: match,
						user: userDestructured
					}
				})
			);
			res.status(200).json(matchesWithUsers);
		} else {
			res.status(404).json({ message: 'No matches found' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

const getAllMatches = async (req, res) => {

	/*
		Controlador de la Ruta para obtener todos los matches
	*/
	console.log('getAllMatches');

	const { max } = req.query;
	const maxAmount = max ? max : 20;
	
	try {
		const matches = await PostSchema.find({ isMatch: true }).limit(maxAmount);
		
		if (matches.length > 0) {
			matches = shuffle(matches);
			res.status(200).json(matches);
		} else {
			res.status(404).json({ message: 'No matches found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
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
	getAllMatches
};
