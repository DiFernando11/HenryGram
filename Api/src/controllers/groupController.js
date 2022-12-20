const UserSchema = require("../models/User");
const GroupSchema = require("../models/Group");
const ChatSchema = require("../models/Chat");

const addChat = async (req, res) => {

    const { groupId, userId, content } = req.body;

    const user = await UserSchema.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { groups: groupId } }
    )

    const userInfo = await UserSchema.find(
        { _id: userId }
    )

    const chat = await ChatSchema.create({

    })
}

module.exports = {
    addChat
};