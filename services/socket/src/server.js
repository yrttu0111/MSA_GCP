import http from "http";
import express from "express";
import path from 'path';
import { Server } from "socket.io";
const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/socket", (_, res) => res.render("home"));
app.get("/socket/*", (_, res) => res.redirect("/socket/"));

const httpServer = http.createServer(app);
// const wss = new WebSocketServer({ server });
const wsServer = new Server(httpServer);


wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => console.log(`Socket Event: ${event}`));

  socket.on("enter_room", (roomName, nickname, done) => {
    socket["nickname"] = nickname;
    socket.join(roomName);
    socket.to(roomName).emit("welcome", socket.nickname);
    done();
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
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