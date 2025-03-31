// import express
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// create an instance of express called app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// API Routes
app.get("/api/hello", (req, res) => {
    res.status(200).json({ mssg: "hello" });
});

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Get port from environment variable or use default
const port = process.env.PORT || 5000;

// listen to our server on our localhost
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})