const path = require("path");
const express = require("express");
const app = express();
const socketio = require("socket.io");

//Settings:
app.set("port", process.env.PORT || 3000);
const port = app.get("port");

//Static Files:
app.use(express.static(path.join(__dirname, "public")));

//Starting the server:
const server = app.listen(port, () => {
    console.log("Server on port: " + port);
})

//Dictionary of all connected users:
let userList = {}

//Websockets:
const io = socketio(server);
io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("chat:message", (data) => {
        io.sockets.emit("chat:message", data);
    });
    socket.on("chat:newUser", (data) => {
        userList[data.socketid] = data.username;
        io.sockets.emit("chat:newUser", userList);
    });
    socket.on("disconnect", () => {
        delete userList[socket.id]
        io.sockets.emit("chat:offline", userList);
    });
});