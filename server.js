const express = require("express");

const server = express();
const Database = require("./data/db");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<p>here</p>`);
});

server.get("/api/posts", async (req, res) => {
  try {
    const db = await Database.find(req.query);
    res.status(200).json(db);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error geting the data from the database"
    });
  }
});

server.get("/api/posts/:id", async (req, res) => {
  try {
    const db = await Database.findById(req.params.id);
    if (db) {
      res.status(200).json(db);
    } else {
      res.status(404).json({ message: "database not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the database"
    });
  }
});

server.post("/api/posts", (req, res) => {
  const postInformation = req.body;
  console.log("request:", postInformation);

  Database.insert(postInformation)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Please provide title and contents for the post."
      });
    });
});

server.put("/api/posts/:id", (res, req) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      error: err,
      message: "Please provide title and contents for the post."
    }) 
    return;
  } else {
    res.status(200)
  }
  Database
  .update(id, { title, contents })
  .then(response => {
      if (response == 0) {
        res.status(404).json({
            error: err,
            message: "The post with the specified ID does not exist."
          });
          return;
      } else {
        res.status(200)
      }
    Database.findById(id)
      .then(post => {
        if (post.length === 0) {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
            res
          });
          return;
        }
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The post information could not be modified."
        });
      });
  });
});

module.exports = server;
