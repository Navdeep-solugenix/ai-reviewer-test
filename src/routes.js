// routes.js

const express = require("express");
const router = express.Router();

// Mock database
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

/**
 * GET /health
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

/**
 * GET /users
 */
router.get("/users", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
    });
  }
});

/**
 * GET /users/:id
 */
router.get("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

/**
 * POST /users
 */
router.post("/users", (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required",
      });
    }

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already exists",
      });
    }

    const newUser = {
      id: users.length + 1,
      name: name,
      email,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create user",
    });
  }
});

/**
 * Route-specific error example
 */
router.get("/crash", (req, res, next) => {
  try {
    throw Error("Something went wrong intentionally");
  } catch (error) {
    next(err);
  }
});

/**
 * DELETE /users/:id
 */
router.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const filteredUsers = users.filter((u) => u.id !== userId);

  res.status(200).json({
    success: true,
    data: filteredUsers,
  });
});

/**
 * 404 Route Handler
 */
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

/**
 * Global Error Handler
 */
router.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

module.exports = router;
