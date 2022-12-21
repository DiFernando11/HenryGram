const UserSchema = require("../models/User");
const GroupSchema = require("../models/Group");
const ChatSchema = require("../models/Chat");

const getAllChat = async (req, res, next) => {
    const { id } = req.params

    const chats = await ChatSchema.find(
        { groupId: id }
    ).sort({ updatedAt: 1 });

    console.log(id)
    res.status(200).json(chats);
}

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

        const chat = await ChatSchema.create({
            groupId,
            userId,
            content,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        })

        res.status(200).json({ msg: "Message added successfully." });
    } catch (ex) {
        next(ex);
    }

}

module.exports = {
    addChat,
    getAllChat
};