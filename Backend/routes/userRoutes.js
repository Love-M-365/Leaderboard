const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create New User
router.post("/", async (req, res) => {
  const { name, points, avatarSeed, avatarStyle } = req.body;
  if (!name || !points || !avatarSeed || !avatarStyle) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await User.create({ name, points, avatarSeed, avatarStyle });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Increase User Points
router.put("/:id/increase", async (req, res) => {
  const { pointsToAdd } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.points += pointsToAdd;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating points" });
  }
});

module.exports = router;
