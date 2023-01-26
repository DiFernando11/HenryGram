const FriendSchema = require("../models/Friend");
const UserSchema = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

const addFriend = async (req, res, next) => {
  /*
        Controlador que manda una solicitud de amistad
    */

  console.log("addFriend", req.body)
  try {
      const { UserA, UserB } = req.body;
      console.log(UserA, UserB , "dada");

    const docA = await FriendSchema.findOneAndUpdate(
      { requester: ObjectId(UserA), recipient: ObjectId(UserB) },
      { $set: { status: 1 } },
      { upsert: true, new: true }
    );

    const docB = await FriendSchema.findOneAndUpdate(
      { recipient: ObjectId(UserA), requester: ObjectId(UserB) },
      { $set: { status: 2 } },
      { upsert: true, new: true }
    );

    const request = await UserSchema.find({ friends: docA._id });

    if (request.length === 0) {
      const updateUserA = await UserSchema.findOneAndUpdate(
        { _id: UserA },
        { $push: { friends: docA._id } }
      );

      const updateUserB = await UserSchema.findOneAndUpdate(
        { _id: UserB },
        { $push: { friends: docB._id } }
      );

      res.status(200).json("Invitation sent.");
    } else {
      res.status(200).json("Invitation already sent.");
    }
  } catch (ex) {
    next(ex);
  }
};
const acceptRejectFriend = async (req, res, next) => {
  /*
        Controlador que acepta o rechaza una solicitud de amistad
    */

  try {
    const { UserA, UserB, resp } = req.body;

    if (resp) {
      const f1 = await FriendSchema.findOneAndUpdate(
        { requester: ObjectId(UserA), recipient: ObjectId(UserB) },
        { $set: { status: 3 } }
      );

      const f2 = await FriendSchema.findOneAndUpdate(
        { recipient: ObjectId(UserA), requester: ObjectId(UserB) },
        { $set: { status: 3 } }
      );

      res.status(200).json("Accept.");
    } else {
      const docA = await FriendSchema.findOneAndRemove({
        requester: UserA,
        recipient: UserB,
      });
      const docB = await FriendSchema.findOneAndRemove({
        recipient: UserA,
        requester: UserB,
      });
      const updateUserA = await UserSchema.findOneAndUpdate(
        { _id: UserA },
        { $pull: { friends: docA._id } }
      );
      const updateUserB = await UserSchema.findOneAndUpdate(
        { _id: UserB },
        { $pull: { friends: docB._id } }
      );
      res.status(200).json("Reject.");
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  addFriend,
  acceptRejectFriend,
};
