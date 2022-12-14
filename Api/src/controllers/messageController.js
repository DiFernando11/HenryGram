const { get } = require('mongoose');
const MessageSchema = require('../models/Message');
const { off } = require('../server');

const getAllMessage = async (req, res, next) => {
    try {
        const { from, to, limit } = req.body;
        const offset = 0;

        const messages = await MessageSchema.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const twentyMessages = messages.slice(offset, offset + limit);
        

        const projectedMessages = twentyMessages.map((msg) => {
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

        console.log(req.body)

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

const getMessageByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const messages = await MessageSchema.find({
            users: {
                $all: [userId],
            },
        });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === userId,
                message: msg.message.text,
                hour: msg.createdAt
            };
        });
        res.status(200).json(projectedMessages);

    } catch (ex) {
        next(ex);
    }
}
module.exports = {
    addMessage,
    getAllMessage,
    getMessageByUser,
}