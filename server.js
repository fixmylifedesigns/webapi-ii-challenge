const express = require("express");
const postsRouter = require('./data/posts/posts-router')
const server = express();
// const Database = require("./data/db");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<p>here</p>`);
});

server.use('/api/posts', postsRouter)

module.exports = server;
