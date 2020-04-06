const express = require("express");

const server = express();
const port = 8482;

// Server state
let users = [];
let nextId = 0;

const addUser = (newUser) => {
  let id = nextId;
  nextId += 1;
  users.push({ ...newUser, id });
};

addUser({ name: "John Doe", bio: "Goes by another name usually" });

// Server Routes
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// Start listening!
server.listen(port, () => {
  console.log(` == Server listening on port ${port} ==`);
});
