const FriendSchema = require('../models/Friend');
const UserSchema = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

const addFriend = async (req, res, next) => {
    try {
        const { UserA, UserB } = req.body;

        const request = await UserSchema.find(
            { friends: ObjectId(UserB) }
        )

        console.log(request.length)

        if (request.length === 0) {
            const docA = await FriendSchema.findOneAndUpdate(
                { requester: UserA, recipient: UserB },
                { $set: { status: 1 } },
                { upsert: true, new: true }
            )

            const docB = await FriendSchema.findOneAndUpdate(
                { recipient: UserA, requester: UserB },
                { $set: { status: 2 } },
                { upsert: true, new: true }
            )

            const updateUserA = await UserSchema.findOneAndUpdate(
                { _id: UserA },
                { $push: { friends: docA._id } }
            )

            const updateUserB = await UserSchema.findOneAndUpdate(
                { _id: UserB },
                { $push: { friends: docB._id } }
            )

            res.status(200).json("Invitation sent.");
        } else {
            res.status(200).json("Invitation already sent.");
        }


    } catch (ex) {
        next(ex);
    }
}

const acceptRejectFriend = async (req, res, next) => {
    try {
        const { UserA, UserB, resp } = req.body;

        if (resp) {
            FriendSchema.findOneAndUpdate(
                { requester: UserA, recipient: UserB },
                { $set: { status: 3 } }
            )

            FriendSchema.findOneAndUpdate(
                { recipient: UserA, requester: UserB },
                { $set: { status: 3 } }
            )

            res.status(200).json("Accept.");
        } else {
            const docA = await FriendSchema.findOneAndRemove(
                { requester: UserA, recipient: UserB }
            )
            const docB = await FriendSchema.findOneAndRemove(
                { recipient: UserA, requester: UserB }
            )
            const updateUserA = await UserSchema.findOneAndUpdate(
                { _id: UserA },
                { $pull: { friends: docA._id } }
            )
            const updateUserB = await UserSchema.findOneAndUpdate(
                { _id: UserB },
                { $pull: { friends: docB._id } }
            )
            res.status(200).json("Reject.");
        }
    } catch (ex) {
        next(ex);
    }
}

module.exports = {
    addFriend,
    acceptRejectFriend
}