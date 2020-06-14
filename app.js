const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
require("passport");
require("./auth/auth");

require("dotenv").config();

// ROUTERS
const usersRouter = require("./routes/users");
const CSVRouter = require("./routes/csvUpload")
const classRouter = require("./routes/class");


const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept"
};

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/")));


app.use("/", usersRouter);
app.use("/", CSVRouter);
app.use("/", classRouter);

module.exports = app;
