const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const claimHistoryRoutes = require("./routes/claimHistory");
require("dotenv").config();


const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/claim-history", claimHistoryRoutes);

// DB + Server Init
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
