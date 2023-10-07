import express from "express"
import "./config.js"
import Student from "./model/student.js"
import Login from "./model/login.js"
import bcrypt from "bcrypt"
const app = express()
app.use(express.json())

app.post("/addStudentDetails", async (req, resp) => {
  try {
    // Create a new student document and save it
    const student = new Student(req.body)
    const savedStudent = await student.save()

    // Now, create the corresponding login in the User collection
    bcrypt.hash("passwordaayegayaha", 10, async (err, hashedPassword) => {
      if (err) {
        // Handle any errors related to password hashing
        console.error(err)
      } else {
        const login = new Login({
          email: savedStudent.email,
          phone: savedStudent.phone,
          countryCode: savedStudent.countryCode,
          pass: hashedPassword, // Store the hashed password
          role: "student" // Set the role
        })

        // Save the user document
        try {
          const savedLogin = await login.save()
          console.log("Login created for student:", savedLogin)
        } catch (err) {
          // Handle errors related to saving the user document
          console.error(err)
        }
      }
    })

    console.log(savedStudent)
    resp.send({ status: "Done" })
  } catch (error) {
    console.log(error)
  }
})

app.get("/fetchLoginData", async (req, resp) => {
  try {
    let result = await Login.find()
    console.log(result)
    resp.send(result)
  } catch (error) {
    console.log(error)
  }
})

app.post("/createLogin", async (req, resp) => {
  try {
    let data = new Login(req.body)
    let result = await data.save()
    console.log(result)
    console.log("i am called")
    resp.setHeader("Content-Type", "application/json")
    resp.send({ status: "done" })
  } catch (error) {
    console.error(error)
    resp.status(500).send("Internal Server Error")
  }
})

app.get("/fetchRegisteredStudents", async (req, resp) => {
  try {
    let result = await Student.find()
    console.log(result)
    resp.send(result)
  } catch (error) {
    console.log(error)
  }
})

app.listen(5000)
