import express from "express";
import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import path from 'path';
const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("public", express.static(__dirname + "/src/public"));
app.get("/socket", (_,res)=> res.render("home"))
app.get("/socket/*", (_,res)=> res.render("/"))
//http ws 서버 둘다 사용
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const handleListening = () => console.log(`Listening on ws://localhost:3002`);

server.listen(3002, handleListening);
// app.listen(3002, handleListening);

wss.on("connection", (socket) => {
    console.log(socket);
});