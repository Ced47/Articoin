const express = require("express");
const connectDB = require("./src/config/dbConfig");
require("dotenv").config();
const app = require("./app");

// Connect to MongoDB
connectDB();


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));