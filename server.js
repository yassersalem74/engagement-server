require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./api/index");

const server = express();
server.use(cors());
server.use(express.json());

// Connect to MongoDB

server.use("/", api);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
