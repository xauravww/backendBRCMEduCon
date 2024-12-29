const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");

const app = express();
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config.env" });
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const member = require("./routes/memberRoute");
const attendance = require("./routes/attendanceRoute");
const status = require("./routes/collegeStatusRoute");
const gallery = require("./routes/galleryRoute");

const idCard = require("./routes/idCardRoute");
const assignment = require("./routes/assignmentRoute");
const timeTable = require("./routes/timeTableRoute");
const events = require("./routes/eventsRoute")


app.use(require("cors")());
app.use("/api/v1", member);
app.use("/api/v1", attendance);
app.use("/api/v1", status);
app.use("/api/v1", assignment);
app.use("/api/v1", idCard);

app.use("/api/v1", gallery);
app.use("/api/v1", timeTable);
app.use("/api/v1", events);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
