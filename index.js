require('dotenv').config
const express = require('express');
const connectDB = require('./services/db');
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const startupRoutes = require("./routes/startupRoute");

const cors = require("cors");
require("dotenv").config();
const { PINATA_API_KEY, PINATA_SECRET } = process.env;
const pinataSDK = require("@pinata/sdk");
console.log(PINATA_API_KEY, PINATA_SECRET);
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET);

const fs = require("fs");
const readableStreamForFile = fs.createReadStream("./image.png");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("internal server error");
});
app.use(cors());

// Configuration de Passport.js
require("./config/passport");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Parse les données POST
app.use(bodyParser.urlencoded({ extended: false }));

connectDB()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Unable to connect to DB", err);
  });

// Routes pour l'authentification
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/startups", startupRoutes);
app.post("/api/upload", (req, res) => {
const name = req.body.name;
const options = {
  pinataMetadata: {
    name: name,
    keyvalues: {
      customKey: "customValue",
      customKey2: "customValue2",
    },
  },
  pinataOptions: {
    cidVersion: 0,
  },
};

pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    res.status(200).json({ result });
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });

});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
