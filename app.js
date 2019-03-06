import express from "express";
import bodyParser from "body-parser";
import MyLogger from "./middleWare/myLogger";
import Routes from "./components";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

var login = process.env.LOGIN;
var password = process.env.PASSWORD

mongoose.connect(
    'mongodb://' + login + ':' + password + '@ds161092.mlab.com:61092/instazz',
    { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(MyLogger);

    app.use("/", Routes);


    // Get the port defined by Heroku or if localhost set to 5000
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
})