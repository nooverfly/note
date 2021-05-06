import express from "express";

const app: express.Application = express();

app.get("/", (req, res) => {
  res.send({
    name: "express",
    age: 20,
  });
});

app.listen(9000, () => {
  console.log("app listeninging on port 9000");
});
