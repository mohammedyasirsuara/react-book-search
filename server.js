const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bookRoutes = require("./routes/api/books");
const server = require("http").createServer(app);
const cors = require("cors");
require("dotenv").config();

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// socket
const io = require("socket.io")(server);

io.on("connection", (client) => {
  client.on("event", (data) => {});
  client.on("disconnect", () => {});
});

app.use("/api/books", bookRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");
console.log(process.env.MONGODB_URI);

// Define API routes here
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
