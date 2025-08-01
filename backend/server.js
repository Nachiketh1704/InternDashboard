const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "intern_dashboard";

// Connect to MongoDB with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUrl}/${dbName}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log(
      "⚠️  MongoDB is not running. The server will start without database functionality."
    );
    console.log("💡 To fix this:");
    console.log(
      "   1. Install MongoDB: https://docs.mongodb.com/manual/installation/"
    );
    console.log(
      "   2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas"
    );
    console.log(
      "   3. Or set MONGO_URL in your .env file to a valid MongoDB connection string"
    );
  }
};

connectDB();

// MongoDB Schema
const statusCheckSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
  },
  client_name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const StatusCheck = mongoose.model("StatusCheck", statusCheckSchema);

// Dummy data for the intern portal
const dummyUserData = {
  name: "Nachiketh",
  referral: "nachiketh2025",
  donations: 15420,
};

const dummyLeaderboardData = [
  { name: "Alice", donations: 20000 },
  { name: "Bob", donations: 18000 },
  { name: "Nachiketh", donations: 15420 },
  { name: "Charlie", donations: 12500 },
  { name: "Diana", donations: 11800 },
  { name: "Emma", donations: 9600 },
  { name: "Frank", donations: 8200 },
];

// Routes
app.get("/api", (req, res) => {
  console.log("API root endpoint hit");
  res.json({ message: "Hello World" });
});

app.get("/api/user", (req, res) => {
  console.log("User endpoint hit, returning:", dummyUserData);
  res.json(dummyUserData);
});

app.get("/api/leaderboard", (req, res) => {
  console.log("Leaderboard endpoint hit, returning:", dummyLeaderboardData);
  res.json(dummyLeaderboardData);
});

app.post("/api/status", async (req, res) => {
  try {
    const { client_name } = req.body;

    if (!client_name) {
      return res.status(400).json({ error: "client_name is required" });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: "Database not available",
        message:
          "MongoDB is not connected. Please check your database connection.",
      });
    }

    const statusCheck = new StatusCheck({
      client_name,
      id: uuidv4(),
      timestamp: new Date(),
    });

    await statusCheck.save();
    res.status(201).json(statusCheck);
  } catch (error) {
    console.error("Error creating status check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/status", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: "Database not available",
        message:
          "MongoDB is not connected. Please check your database connection.",
      });
    }

    const statusChecks = await StatusCheck.find().limit(1000);
    res.json(statusChecks);
  } catch (error) {
    console.error("Error fetching status checks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Test endpoints:`);
  console.log(`  - http://localhost:${PORT}/api (Hello World)`);
  console.log(`  - http://localhost:${PORT}/api/user (User data)`);
  console.log(
    `  - http://localhost:${PORT}/api/leaderboard (Leaderboard data)`
  );
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});
