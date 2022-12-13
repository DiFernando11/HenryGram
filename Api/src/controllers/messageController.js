const MessageSchema = require('../models/Message');

const getAllMessage = async (req, res, next) => {
    console.log('hola')
    try {
        const { from, to } = req.body;

        console.log(from, to)

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
        res.status(200).json(projectedMessages);

    } catch (ex) {
        next(ex);
    }
}

const addMessage = async (req, res, next) => {

    try {
        const { from, to, message } = req.body;

        const data = await MessageSchema.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) return res.status(200).json({ msg: "Message added successfully." });
        else return res.status(200).json({ msg: "Failed to add message to the database" });

    } catch (ex) {
        next(ex);
    }
}

module.exports = {
    addMessage,
    getAllMessage
}