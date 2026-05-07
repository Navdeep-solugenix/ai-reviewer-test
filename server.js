const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const users = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Express server is running" });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
app.get("/users", (req, res) => {
  res.json(users); // Return all users
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (
    !name ||
    !email ||
    typeof name !== "string" ||
    typeof email !== "string"
  ) {
    return res.status(400).json({ error: "name and email are required" });
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
