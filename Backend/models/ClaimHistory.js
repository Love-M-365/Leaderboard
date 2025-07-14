// models/ClaimHistory.js

const mongoose = require("mongoose");

const claimHistorySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  points: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClaimHistory", claimHistorySchema);
