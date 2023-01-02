const UserSchema = require("../models/User");
const GroupSchema = require("../models/Group");
const ChatSchema = require("../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllChat = async (req, res, next) => {
  try {
    const { id, limit } = req.query;

    const offset = 10;

    const chats = await ChatSchema.find({ groupId: id }).sort({
      updatedAt: -1,
    });

    const twentyMessages = chats.slice(offset * (limit - 1), offset * limit);

    res.status(200).json(twentyMessages);
  } catch (ex) {
    next(ex);
  }
};

const addChat = async (req, res, next) => {
  try {
    const { groupId, userId, content, image } = req.body;

    const user = await UserSchema.find(
      { _id: userId }
    )

    const chat = await ChatSchema.create({
      groupId,
      userId,
      content,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      avatar: user[0].avatar ? user[0].avatar : "https://res.cloudinary.com/dgmv4orvc/image/upload/v1671220771/Images/jrk0nxkgvmbb3hfsqwbk.png",
      image
    })

    res.status(200).json({ msg: "Message added successfully." });
  } catch (ex) {
    next(ex);
  }
}

const reqInvite = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;

    const userInGroup = await GroupSchema.findOne({
      $and: [{ _id: groupId }, { users: userId }],
    });

    if (userInGroup)
      return res.status(200).json({ msg: "The user is already in the group." });

    const userpendig = await GroupSchema.findOne({
      $and: [{ _id: groupId }, { pendings: userId }],
    });

    if (userpendig)
      return res
        .status(200)
        .json({ msg: "The invitation has already been sent." });
    else {
      const addUserToGroup = await GroupSchema.findOneAndUpdate(
        { _id: groupId },
        { $addToSet: { pendings: userId } }
      );
    }

    res.status(200).json({ msg: "Invitation sent." });
  } catch (ex) {
    next(ex);
  }
};

const resInvite = async (req, res, next) => {
  try {
    const { groupId, userId, response } = req.body;
    console.log(groupId, userId, response);
    if (response) {
      const popUser = await GroupSchema.updateOne(
        { _id: groupId },
        {
          $pull: {
            pendings: userId,
          },
        }
      );

      const pushUser = await GroupSchema.findOneAndUpdate(
        { _id: groupId },
        {
          $addToSet: { users: userId },
        }
      );

      return res.status(200).json({ msg: "Accepted." });
    } else {
      const popUser = await GroupSchema.updateOne(
        { _id: groupId },
        {
          $pull: {
            pendings: userId,
          },
        }
      );

      return res.status(200).json({ msg: "Not accepted." });
    }
  } catch (ex) {
    next(ex);
  }
};

const getGroups = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const groups = await GroupSchema.find({ users: userId });

    res.status(200).json(groups);
  } catch (ex) {
    next(ex);
  }
};

const getRecommendedGroups = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserSchema.find({ _id: userId });

    const groups = await GroupSchema.find()

    let userGroups = user[0].groups.map(el => el.toString())

    let recommendedGroups = []

    groups.forEach(el => {
      if (!userGroups.includes(el._id.toString())) recommendedGroups.push(el)
    })

    res.status(200).json(recommendedGroups.length > 15 ? recommendedGroups.slice(0, 15) : recommendedGroups);
  } catch (ex) {
    next(ex);
  }
};


module.exports = {
  getAllChat,
  addChat,
  reqInvite,
  resInvite,
  getGroups,
  getRecommendedGroups
};
