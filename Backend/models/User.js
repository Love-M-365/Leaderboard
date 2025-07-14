const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  avatarSeed: { type: String, required: true },
  avatarStyle: { type: String, required: true }, 
});

module.exports = mongoose.model("User", userSchema);
