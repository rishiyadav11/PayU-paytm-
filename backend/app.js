const express = require('express');
const app = express();
const mongooseconnect =  require('./config/db')
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require("cors")
const authRouter = require("./routes/authroutes")
const cookieParser =  require('cookie-parser');
const AccountRouter = require("./routes/accountroutes")
const port = process.env.PORT || 5000
mongooseconnect()
app.use(cookieParser()); // To parse cookies
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(bodyParser.json())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/account", AccountRouter)

app.get("/",(req, res) =>{
    res.send("Hello World!")  // This is a simple route to check the server is running or not.
})

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})