// routes/claimHistory.js

const express = require("express");
const router = express.Router();
const ClaimHistory = require("../models/ClaimHistory");

// Add entry
router.post("/", async (req, res) => {
  try {
    const newEntry = new ClaimHistory(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all entries (latest first)
router.get("/", async (req, res) => {
  try {
    const history = await ClaimHistory.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
