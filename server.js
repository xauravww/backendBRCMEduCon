const app = require("./app");
// const cloudinary = require("cloudinary");
const connectDatabase = require("./config");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config.env" });
}

// Connecting to database
connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const port=process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});


// import express from "express"
// import "./config.js"
// import Student from "./model/student.js"
// import Login from "./model/login.js"
// import bcrypt from "bcrypt"
// const app = express()
// app.use(express.json())

// app.post("/addStudentDetails", async (req, resp) => {
//   try {
//     // Create a new student document and save it
//     const student = new Student(req.body)
//     const savedStudent = await student.save()

//     // Now, create the corresponding login in the User collection
//     bcrypt.hash("passwordaayegayaha", 10, async (err, hashedPassword) => {
//       if (err) {
//         // Handle any errors related to password hashing
//         console.error(err)
//       } else {
//         const login = new Login({
//           email: savedStudent.email,
//           phone: savedStudent.phone,
//           countryCode: savedStudent.countryCode,
//           pass: hashedPassword, // Store the hashed password
//           role: "student" // Set the role
//         })

//         // Save the user document
//         try {
//           const savedLogin = await login.save()
//           console.log("Login created for student:", savedLogin)
//         } catch (err) {
//           // Handle errors related to saving the user document
//           console.error(err)
//         }
//       }
//     })

//     console.log(savedStudent)
//     resp.send({ status: "Done" })
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.get("/fetchLoginData", async (req, resp) => {
//   try {
//     let result = await Login.find()
//     console.log(result)
//     resp.send(result)
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post("/createLogin", async (req, resp) => {
//   try {
//     let data = new Login(req.body)
//     let result = await data.save()
//     console.log(result)
//     console.log("i am called")
//     resp.setHeader("Content-Type", "application/json")
//     resp.send({ status: "done" })
//   } catch (error) {
//     console.error(error)
//     resp.status(500).send("Internal Server Error")
//   }
// })

// app.get("/fetchRegisteredStudents", async (req, resp) => {
//   try {
//     let result = await Student.find()
//     console.log(result)
//     resp.send(result)
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.listen(5000)
