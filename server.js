import express from "express"
import "./config.js"
import Student from "./model/student.js"
import Login from "./model/login.js"

const app = express()
app.use(express.json())

app.post("/addStudentDetails", async (req, resp) => {
  try {
    let data = new Student(req.body)
    let result = await data.save()
    console.log(result)
    resp.send("Done")
  } catch (error) {
    console.log(error)
  }
})

app.get("/fetchLoginData", async (req, resp) => {
  try {
    let result = await Student.find()
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
    resp.send("Done")
  } catch (error) {
    console.log(error)
  }
})

app.listen(5000)
