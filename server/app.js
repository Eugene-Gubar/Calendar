import express from "express";
import compression from "compression";
import logger from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";

import router from "./router";
import config from "./config";
import "./passport";

mongoose.connect("mongodb://admin:vy7Cwe3@ds119268.mlab.com:19268/calendar");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function() {
  console.log("Connected to database");
});

const app = express();

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(passport.initialize());

app.use(express.static(__dirname + "/../public/build"));
app.set("port", config.port);

router(app);

const server = app.listen(app.get("port"), () => {
  console.log("Server is working on port " + app.get("port"));
});
