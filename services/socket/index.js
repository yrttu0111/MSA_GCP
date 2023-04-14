import express from "express";
const app = express();

//주식 정보를 가져오는 API
app.get("/socket", (req, res) => {
  res.send("주식 정보를 가져옵니다.");
});
//주식 최대가격 조회
app.get("/socket/max", (req, res) => {
  res.send("주식 최대가격을 조회합니다.");
});
//신구주식 등록
app.post("/socket", (req, res) => {
  res.send("신구주식을 등록합니다.");
});
app.listen(3002);
