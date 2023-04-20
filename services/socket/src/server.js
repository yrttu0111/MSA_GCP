import http from "http";
import express from "express";
import path from 'path';
import { Server } from "socket.io";
import {instrument} from "@socket.io/admin-ui";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const __dirname = path.resolve();
const app = express();
const pubClient = createClient({ url: "redis://redis:6379" });
const subClient = pubClient.duplicate();


app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/socket", (_, res) => res.render("home"));
app.get("/socket/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
// const wss = new WebSocketServer({ server });
const wsServer = new Server(httpServer, {
  // path: "/socket/",
  cors: {
    // origin: "*",
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

// wsServer.adapter(createAdapter(pubClient, subClient));


instrument(wsServer, {
  auth: false,
});

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
  if(sids.get(key)=== undefined){
    publicRooms.push(key);
  }
});
return publicRooms;
}
function countRoom(roomName){
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}


wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => console.log(`Socket Event: ${event}`));

  socket.on("enter_room", (roomName, nickname, done) => {
    socket["nickname"] = nickname;
    socket.join(roomName);
    socket.to(roomName).emit("welcome", socket.nickname,countRoom(roomName) );
    done(countRoom(roomName),socket.nickname);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
    );
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = "Anon";
//     console.log("Connected to Browser ✅");
//     socket.on("message", (message) => {
//       const parsed = JSON.parse(message.toString('utf8'))

//       switch(parsed.type){
//         case 'new_message':
//           sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${parsed.payload}`));
//           break;
//         case 'nickname':
//           socket['nickname'] = parsed.payload;
//           break;
//       }
//       // if(parsed.type === 'new_message') {
//       //   sockets.forEach((aSocket) => aSocket.send(parsed.payload));
//       // }else if(parsed.type === "nickname"){
//       //   sockets.forEach((aSocket) => aSocket.send(`${parsed.payload} joined!`));
//       // }
//     });
//     socket.send("hello!!!");
//   });
const handleListen = () => console.log(`Listening on http://localhost:3002 `);
httpServer.listen(3002, handleListen);