import express from "express";
import SocketIO from "socket.io";
import http from "http";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket)=> {
    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    }); 
    socket.on("offer", (offer, roomName)=> {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice, roomName)=>{
        socket.to(roomName).emit("ice",ice);
    });
});

function publicRooms(){
    const {sockets: {
        adapter: {sids, rooms},
    },
} = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
    }

    function countRoom(roomName){
        return wsServer.sockets.adapter.rooms.get(roomName)?.size;
    }

wsServer.on("connection", (socket) => {
    //wsServer.socketsJoin("announcement");
    socket["nickname"] = "Anonymous";
    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        //console.log(socket.id);
        //console.log(socket.rooms);
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname, `Current Participants: ${countRoom(roomName)}`); //notify to everyone 
        wsServer.sockets.emit("room_change", publicRooms());
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => 
        socket.to(room).emit("bye", socket.nickname, `Current Participants: ${countRoom(room)-1}`));
    });
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
    });
    


// function handleConnection(socket){ //this socket represents the browser that just connected
//     console.log(socket);
// }


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);