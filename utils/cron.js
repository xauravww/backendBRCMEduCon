const cron = require("cron");
const https = require("https");
const path = require("path");
const dotenv = require("dotenv");


// Load environment variables from .env file
dotenv.config({ path: path.resolve(".env") });
const backendUrl = process.env.RENDER_BACKEND_URL;

// Define the cron job
const job = new cron.CronJob("0 */13 * * * *", function () {
  // This function will be executed every 14 minutes.
  // console.log("Restarting server");

  // Perform an HTTPS GET request to hit any backend api.
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        // console.log("Server restarted");
      } else {
        console.error(
          `Failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error("Error during Restart:", err.message);
    });
});

// Export the cron job.
module.exports = { job };
