const cron = require("node-cron");
const https = require("https");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(".env") });
const backendUrl = process.env.RENDER_BACKEND_URL;

// Define the cron job
const job = cron.schedule("*/13 * * * *", async () => {
  try {
    // Perform an HTTPS GET request to hit any backend api.
    const response = await new Promise((resolve, reject) => {
      https.get(backendUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, data });
        });
      }).on("error", (err) => {
        reject(err);
      });
    });

    if (response.statusCode === 200) {
      // console.log("Server restarted");
    } else {
      console.error(`Failed to restart server with status code: ${response.statusCode}`);
    }
  } catch (err) {
    console.error("Error during Restart:", err.message);
  }
});

// Export the cron job
module.exports = { job };
