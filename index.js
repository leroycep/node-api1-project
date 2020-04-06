const express = require("express");

const server = express();
server.use(express.json());
const port = 8482;

// Server state
let users = [];
let nextId = 0;

const addUser = (newUser) => {
  const id = nextId;
  nextId += 1;

  const user = { ...newUser, id };

  users.push(user);
  return user;
};

addUser({ name: "John Doe", bio: "Goes by another name usually" });
addUser({ name: "Data", bio: "An android from the far future" });

// Server Routes
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
  const id_str = req.params.id;
  try {
    const id = parseInt(id_str);
    const user = users.find((u) => u.id === id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  } catch {
    res.status(400).json({ message: "invalid id" });
  }
});

server.post("/api/users", (req, res) => {
  const newPerson = req.body;

  if (newPerson) {
    const properties = Object.keys(newPerson);
    if (
      properties.length === 2 &&
      newPerson.name !== undefined &&
      newPerson.bio !== undefined
    ) {
      const user = addUser(newPerson);
      res.status(200).json(user);
      return;
    }
  }

  res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
});

server.delete("/api/users/:id", (req, res) => {
  const id_str = req.params.id;
  try {
    const id = parseInt(id_str);
    const userIdx = users.findIndex((u) => u.id === id);
    if (userIdx >= -1) {
      const user = users.splice(userIdx, 1)[0];
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  } catch {
    res.status(400).json({ message: "invalid id" });
  }
});

// Start listening!
server.listen(port, () => {
  console.log(` == Server listening on port ${port} ==`);
});
