const MessageSchema = require('../models/Message');

const getAllMessage = async (req, res) => {
    try {
        const { from, to } = req.query;

        const messages = await MessageSchema.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                hour: msg.createdAt
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
}

const addMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const data = await MessageSchema.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
}

module.exports = {
    addMessage,
    getAllMessage
}