const express = require("express");
const cors = require("cors");
// Server
const app = express();
app.use(express.json());



app.use(cors());



const dbConnection = require("./database/config");
require("dotenv").config();
console.log(app)
const path = require("path");

// Database
dbConnection();

// Public path
app.use(express.static("public"));



// Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events.js"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
  res.setHeader('Access-Control-Allow-Origin', 'https://jolly-clafoutis-a965bf.netlify.app/auth/login');
});

// Listening PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`SERVER LISTENING ON PORT ${port}`);
});