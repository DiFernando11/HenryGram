require("dotenv").config();
const app = require("./server");
require("./dataBase");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});
var usuarios = [];
let usuariosID = [];
io.on("connection", function (socket) {
  usuariosID.push(socket.id);
  socket.on("registrarse", (id) => {
    console.log("user connectes: register " + socket.id);
    let indexClientID = usuariosID.indexOf(socket.id);

    let flag = true;

    for (var i = usuarios.length - 1; i >= 0; i--) {
      if (usuarios[i].socketId == socket.id) {
        flag = false;
        break;
      }
    }

    if (flag) {
      const nuevo = {
        socketId: usuariosID[indexClientID - 1],
        userId: id,
      };
      usuarios.push(nuevo);
      console.log("Nuevo usuario registrado: ", usuarios);
    }
  });

  socket.on("message", (from, to, message, hour) => {
    const userRequestMessage = usuarios.find((user) => user.userId === to);
    console.log(userRequestMessage, "userid");
    console.log(socket.id, "socketssss2");
    console.log("Nuevo usuario registrado 2: ", usuarios);

    if (userRequestMessage) {
      io.to(userRequestMessage.socketId).emit("message", {
        from,
        to,
        message,
        hour,
      });
    }
  });

  socket.on("disconnect", () => {
    usuarios = usuarios.filter((item) => {
      if (item.socketId != socket.id) {
        return item;
      } else {
        console.log("Usuario retirado =", socket.id);
      }
    });
  });
});
server.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
