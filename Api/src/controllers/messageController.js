const { get } = require("mongoose");
const MessageSchema = require("../models/Message");
const UserSchema = require("../models/User");
const { off } = require("../server");

const getAllMessage = async (req, res, next) => {
  try {
    const { from, to, limit } = req.body;

    const offset = 10;

    const messages = await MessageSchema.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: -1 });

    const twentyMessages = messages.slice(offset * (limit - 1), offset * limit);

    const toUser = await UserSchema.find({ _id: to });

    const informationUserTo = {
      firstName: toUser[0].firstName,
      lastName: toUser[0].lastName,
      avatar: toUser[0].avatar,
    };
    const projectedMessages = twentyMessages.map((msg) => {
      if (msg.sender.toString() === from) {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          hour: msg.createdAt,
          image: msg.image,
        };
      } else {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          hour: msg.createdAt,
          image: msg.image,
        };
      }
    });
    res.status(200).json({ informationUserTo, projectedMessages });
  } catch (ex) {
    next(ex);
  }
};

const addMessage = async (req, res, next) => {
  /*
     Controlador de un mensaje nuevo en el chat
    */

  try {
    const { from, to, message, image } = req.body;

    const userA = await UserSchema.findOneAndUpdate(
      { _id: from },
      { $addToSet: { messages: to } }
    );

    const userB = await UserSchema.findOneAndUpdate(
      { _id: to },
      { $addToSet: { messages: from } }
    );

    const data = await MessageSchema.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      image,
    });

    if (data)
      return res.status(200).json({ msg: "Message added successfully." });
    else
      return res
        .status(200)
        .json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

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
        hour: msg.createdAt,
        image: msg.image,
      };
    });
    res.status(200).json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  addMessage,
  getAllMessage,
  getMessageByUser,
};
