import express from "express";
import bodyParser from "body-parser";
import MyLogger from "./middleWare/myLogger";
import Routes from "./components";
import mongoose from "mongoose";
import PropertiesReader from "properties-reader";

var properties = PropertiesReader('./conf.properties');

var login = properties.get('login');
var password = properties.get('password');

mongoose.connect(
    "mongodb://" + login + ":" + password + "@ds161092.mlab.com:61092/instazz",
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(MyLogger);

  app.use("/", Routes);

  const PORT = 5000;

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
})