// import express from "express";
// import {Server} from "socket.io";
// //import WebSocket from "ws";
// import { instrument } from "@socket.io/admin-ui";
// import http from "http";


// const app = express();

// app.set('view engine', "pug");
// app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/", (req, res) => res.render("home"));
// app.get("/*", (req, res) => res.redirect("/"));
// const handleListen = () => console.log(`Listening on http://localhost:3000`);

// const httpServer = http.createServer(app);
// const wsServer = new Server(httpServer,{
//     cors: {
//         origin: ["https://admin.socket.io"],
//         credentials: true,
//     },
// });
// //const wss = new WebSocket.Server({server});
// instrument(wsServer, {
//     auth: false
// });

// function publicRooms(){
//     const {sockets: {
//         adapter: {sids, rooms},
//     },
// } = wsServer;
//     const publicRooms = [];
//     rooms.forEach((_, key) => {
//         if (sids.get(key) === undefined) {
//             publicRooms.push(key);
//         }
//     });
//     return publicRooms;
//     }

//     function countRoom(roomName){
//         return wsServer.sockets.adapter.rooms.get(roomName)?.size;
//     }

// wsServer.on("connection", (socket) => {
//     //wsServer.socketsJoin("announcement");
//     socket["nickname"] = "Anonymous";
//     socket.onAny((event) => {
//         console.log(wsServer.sockets.adapter);
//         console.log(`Socket Event: ${event}`);
//     });
//     socket.on("enter_room", (roomName, done) => {
//         //console.log(socket.id);
//         //console.log(socket.rooms);
//         socket.join(roomName);
//         done();
//         socket.to(roomName).emit("welcome", socket.nickname, `Current Participants: ${countRoom(roomName)}`); //notify to everyone 
//         wsServer.sockets.emit("room_change", publicRooms());
//     });
//     socket.on("disconnecting", () => {
//         socket.rooms.forEach((room) => 
//         socket.to(room).emit("bye", socket.nickname, `Current Participants: ${countRoom(room)-1}`));
//     });
//     socket.on("disconnect", () => {
//         wsServer.sockets.emit("room_change", publicRooms());
//     });
//     socket.on("new_message", (msg, room, done) => {
//         socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//         done();
//     });
//     socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
//     });
    


// // function handleConnection(socket){ //this socket represents the browser that just connected
// //     console.log(socket);
// // }

// //using websocket
// // const sockets = [];

// // wss.on("connection", (socket) => {
// //     sockets.push(socket);
// //     socket["nickname"] = "Anonymous";
// //     console.log("Connected to Browser");
// //     socket.on("close", () => console.log("Disconnected from Browser"));
// //     socket.on("message", (msg) => {
// //         const message = JSON.parse(msg);
// //         switch (message.type) {
// //             case "new_message":
// //                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
// //             case "nickname":
// //                 socket["nickname"] = message.payload;
// //             break
// //         }
// //         // console.log(parsed, message.toString());
// //         // socket.send(message.toString());
// //     });
// // });

// httpServer.listen(3000, handleListen);