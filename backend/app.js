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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // If you need to send cookies or other credentials
}));
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendStatus(200);
  });
  
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
