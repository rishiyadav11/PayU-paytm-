const express = require('express');
const app = express();
const mongooseconnect = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");
const authRouter = require("./routes/authroutes");
const cookieParser = require('cookie-parser');
const AccountRouter = require("./routes/accountroutes");

const port = process.env.PORT || 5000;

// Connect to the database
mongooseconnect();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Use an environment variable for the frontend URL
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/account", AccountRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");  // Simple route to check the server is running
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
