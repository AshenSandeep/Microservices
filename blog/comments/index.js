const express = require("express");
const bodyPaser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
const cors = require("cors");

app.use(bodyPaser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
