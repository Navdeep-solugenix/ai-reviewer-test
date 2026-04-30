const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const users = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Express server is running" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(401).json({ error: "name and email are required" });
  }

  const User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(User);
  return res.status(201).json(User);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
