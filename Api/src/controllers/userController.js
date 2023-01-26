const UserSchema = require("../models/User");
const FriendSchema = require("../models/Friend");
const MessageSchema = require("../models/Message");
const GroupSchema = require("../models/Group");
const ChatSchema = require("../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;
const bycrypt = require("bcryptjs");
const { confirmationEmail } = require("../config/nodemailer");
const { mapReduce } = require("../models/User");
const { getToken, getTokenData } = require("../config/jwt");
const encryptPassword = require("../utils/encryptPassword");

// const transporter = require('../config/nodemailer');

const postUser = async (req, res) => {
  /*
       Controlador de la Ruta de registro de usuario

       Se le podría agregar:
        -validación con envío email
        -Validar que no exista un usuario con el mismo email (Aunque debería validarlo el front tambien)
        -Validar que no exista un usuario con el mismo nombre (Aunque debería validarlo el front tambien)
    */

  let { firstName, lastName, email, password, gender } = req.body;

  const alreadyExist = await UserSchema.findOne({ email: email });

  if (alreadyExist) {
    /*
            Si el usuario ya existe, debería devolver un error
        */
    return res.status(400).json({ msg: "User already exists" });
  }

  password = encryptPassword(password);
  console.log(password);

  const token = getToken({ email: email, password: password });

  confirmationEmail(firstName, email, token);

  const newUser = new UserSchema({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    gender: gender,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const sendConfirnmationEmail = async (email, password, firstName) => {
  try {
    const token = getToken({ email: email, password: password });
    console.log(token);

    confirmationEmail(firstName, email, token);
  } catch (err) {
    console.log(err);
  }
};

const validateUser = async (req, res) => {
  /*
        Controlador de la ruta que valida los email de los usuarios

    */

  const { token } = req.params;

  try {
    const { email, password } = getTokenData(token).data;
  } catch (error) {
    return res.status(400).json({ msg: "Invalid token" });
  }

  if (!email || !password) {
    return res.status(400).json({ msg: "Invalid token" });
  }

  const user = await UserSchema.findOne({ email: email });

  if (!user) {
    res.status(400).json({ msg: "Invalid token" });
  }

  user.active = true;

  try {
    await user.save();
    res.redirect("http://127.0.0.1:5173/validate");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  /*
        Controlador de la Ruta para obtener un usuario
    */

  const { id } = req.params;

  const user = await UserSchema.findOne({ _id: id });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const getUserByToken = async (req, res) => {
  /*
        Controlador de la Ruta para obtener un usuario por token
    */

  const { token } = req.query;
  let email = "";
  try {
    email = getTokenData(token).data.email;
    const user = await UserSchema.findOne({ email: email });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: "Invalid token" });
  }
};

const getAllUsers = async (req, res) => {
  /*
        Controlador de la Ruta para obtener todos los usuarios
    */
  let users = [];

  try {
    users = await UserSchema.find();
  } catch (err) {
    res.status(500).json(err);
  }

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Users not found" });
  }
};

const getUsersByName = async (req, res) => {
  /*
        Controlador de la Ruta para obtener todos los usuarios por nombre
    */

  const { name } = req.params;

  //Se usa una regex para que no sea case sensitive
  let usersFirstName = [];
  let usersLastName = [];
  try {
    usersFirstName = await UserSchema.find({
      firstName: { $regex: new RegExp("^" + name + "$", "i") },
    });
    usersLastName = await UserSchema.find({
      lastName: { $regex: new RegExp("^" + name + "$", "i") },
    });
  } catch (err) {
    res.status(500).json(err);
  }

  const users = usersFirstName.concat(usersLastName);

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Users not found" });
  }
};

const LogIn = async (req, res) => {
  /*
        Controlador de la Ruta para loguear un usuario
    */

  const { email, password } = req.body;
  let user = null;

  try {
    user = await UserSchema.findOne(
      { email },
      { password: 1, firstName: 1, active: 1 }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }

  if (!user) {
    return res.status(400).json({ message: "Wrong email" });
  }

  if (!user.active) {
    sendConfirnmationEmail(email, password, user.firstName);
    return res.status(401).json({ message: "Email need confirmation" });
  }

  token = getToken({ email: email, password: password });
  try {
    if (user) {
      bycrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).json({ token, firstName: user.firstName });
        } else {
          res.status(404).json({ message: "Wrong Password" });
        }
      });
    } else {
      res.status(404).json({ message: "wrong email" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error");
  }
};

const getFriendship = async (req, res) => {
  /*
        Controlador de la Ruta para obtener las amistades (amigos, pendientes, esperando)
  */

  const { id } = req.params;

  if (id.length !== 24)
    return res.status(404).json({ message: "FriendShip not found" });

  const f = await UserSchema.findOne({ _id: id }, { friends: 1 });
  if (!f) return res.status(404).json({ message: "FriendShip not found" });

  Promise.resolve(f.friends)
    .then((value) => {
      let response = Promise.all(
        value.map(async (el) => {
          return await FriendSchema.findOne({ _id: ObjectId(el.valueOf()) });
        })
      );
      return response;
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).json({ message: "Friendship not found" });
    });
};

const getMessages = async (req, res) => {
  /*
       Controlador de la Ruta para obtener los mensajes con otros usuarios
  */

  const { id } = req.params;

  if (id.length !== 24)
    return res.status(404).json({ message: "Messages not found" });

  const m = await UserSchema.findOne({ _id: ObjectId(id) }, { messages: 1 });

  if (!m) return res.status(404).json({ message: "Messages not found" });

  Promise.resolve(m.messages)
    .then((value) => {
      let response = Promise.all(
        value.map(async (el) => {
          let msg = await MessageSchema.findOne({
            $or: [{ users: [id, el.valueOf()] }, { users: [el.valueOf(), id] }],
          }).sort({ createdAt: -1 });

          let usr = await UserSchema.findOne(
            { _id: ObjectId(el.valueOf()) },
            { firstName: 1, lastName: 1, avatar: 1 }
          );

          return { msg, usr };
        })
      );
      return response;
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).json({ message: "Messages not found" });
    });
};

const getGroups = async (req, res) => {
  /*
       Controlador de la Ruta para obtener los grupos de chat
  */

  const { id } = req.params;

  if (id.length !== 24)
    return res.status(404).json({ message: "Groups not found" });

  //const g = await UserSchema.findOne({ _id: ObjectId(id) }, { groups: 1 });
  const g = await GroupSchema.find({ users: id });
  if (!g) return res.status(404).json({ message: "Groups not found" });

  Promise.resolve(g)
    .then((value) => {
      let response = Promise.all(
        value.map(async (el) => {
          let gr = await GroupSchema.findOne({ _id: el }).sort({
            updatedAt: -1,
          });

          let ch = await ChatSchema.findOne({ groupId: gr._id }).sort({
            createdAt: -1,
          });

          return { gr, ch };
        })
      );
      return response;
    })
    .then((result) => {
      if (result.length) {
        return res.status(200).json(result);
      } else {
        return res.status(200).json([]);
      }
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).json({ message: "Groups not found" });
    });
};

const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, gender, avatar, banner, description, technologies, preferences } = req.body;

  console.log(req.body);

  let user = null;

  try {
    user = await UserSchema.findOne({ _id: id });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    firstName ? user.firstName = firstName : user.firstName;
    lastName ? user.lastName = lastName : user.lastName;
    avatar ? user.avatar = avatar : user.avatar;
    gender ? user.gender = gender : user.gender;
    banner ? user.banner = banner : user.banner;
    description ? user.description = description : user.description;
    technologies ? user.technologies = technologies : user.technologies;
    preferences ? user.preferences = preferences : user.preferences;
    try {
      await user.save();
      return res.status(200).json({ message: "User updated" });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

const getNameAndAvatar = async (req, res) => {
  const { userId } = req.params;
  const friends = [];
  try {
    let friendships = await FriendSchema.find({ $or: [{ requester: userId }, { recipient: userId }], $and: [{ status: 3 }] });
    if (friendships.length > 0) {
      friendships.forEach((friendship) => {
        if (String(friendship.requester) === String(userId)) {
          friends.push(friendship.recipient)
        } else {
          friends.push(friendship.requester);
        }
      });
    } else {
      return res.status(200).json([]);
    }
    let users = await UserSchema.find(
      { _id: { $in: friends } },
      { _id: 1, firstName: 1, lastName: 1, avatar: 1 }
    );
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getBasicInfoUsers = async (req, res) => {
  /*
       Controlador de la Ruta para obtener info básica de los users (id, firstName, lastName, avatar)
  */

  const { users } = req.body; // users (array)

  Promise.resolve(users)
    .then((users) => {
      let response = Promise.all(
        users.map(async (el) => {
          return await UserSchema.findOne(
            { _id: el },
            { _id: 1, firstName: 1, lastName: 1, avatar: 1 }
          );
        })
      );
      return response;
    })
    .then((result) => {
      if (result.length) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ message: "Users not found" });
      }
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).json({ message: "Users not found" });
    });
};

module.exports = {
  postUser,
  getUser,
  getAllUsers,
  getUsersByName,
  LogIn,
  getFriendship,
  validateUser,
  getUserByToken,
  getMessages,
  getGroups,
  updateUserInfo,
  getNameAndAvatar,
  getBasicInfoUsers,
};
