const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const member = require("./routes/memberRoute");
const attendance = require("./routes/attendanceRoute");
const status = require("./routes/collegeStatusRoute");
const gallery = require("./routes/galleryRoute");
const event = require("./routes/eventRoute");
const idCrad = require("./routes/idCardRoute");
const assignment = require("./routes/assignmentRoute");


app.use(require("cors")());
app.use("/api/v1", member);
app.use("/api/v1", attendance);
app.use("/api/v1", status);
app.use("/api/v1", assignment);
app.use("/api/v1", idCrad);
// app.use("/api/v1", event);

// app.use("/api/v1", gallery);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
