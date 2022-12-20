const UserSchema = require("../models/User");
const GroupSchema = require("../models/Group");
const ChatSchema = require("../models/Chat");

const addChat = async (req, res, next) => {
    try {
        const { groupId, userId, content } = req.body;

        const user = await UserSchema.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { groups: groupId } }
        )

        const group = await GroupSchema.findOneAndUpdate(
            { _id: groupId },
            { $addToSet: { users: userId } }
        )

        const userInfo = await UserSchema.find(
            { _id: userId }
        )

        const chat = await ChatSchema.create({
            groupId,
            userId,
            content
        })

        res.status(200).json({ msg: "Message added successfully." });
    } catch (ex) {
        next(ex);
    }

}

module.exports = {
    addChat
};