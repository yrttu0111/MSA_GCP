const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}/socket`);
// const socket = new WebSocket(`ws://localhost:3002/socket`);

function makeMessage(type, payload){
  const msg = {type, payload};
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li)
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

setTimeout(() => {
  // socket.send("hello from the browser!");
}, 10000);

function handleSubmit(event){
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage('new_message', input.value));
  input.value = "";
}
function handleNickSubmit(event){
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage('nickname', input.value));
  
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);