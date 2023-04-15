import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import path from 'path';
const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/socket", (_, res) => res.render("home"));
app.get("/socket/*", (_, res) => res.redirect("/socket/"));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
}

function onSocketMessage(message) {
  console.log(message.toString('utf8'));
}
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket['nickname'] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
      const parsed = JSON.parse(message.toString('utf8'))

      switch(parsed.type){
        case 'new_message':
          sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${parsed.payload}`));
          break;
        case 'nickname':
          socket['nickname'] = parsed.payload;
          break;
      }
      // if(parsed.type === 'new_message') {
      //   sockets.forEach((aSocket) => aSocket.send(parsed.payload));
      // }else if(parsed.type === "nickname"){
      //   sockets.forEach((aSocket) => aSocket.send(`${parsed.payload} joined!`));
      // }
    });
    socket.send("hello!!!");
  });
const handleListen = () => console.log(`Listening on http://localhost:3002 `);
server.listen(3002, handleListen);