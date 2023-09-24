import mongoose from "mongoose"

const studentsSchema = new mongoose.Schema({
  name: String,
  rollNo: Number,
  branch: String,
  sem: Number,
  batch: Number,
  photo: String,
  regNo: Number,
  email: String,
  phone: Number,
  countryCode: Number,
  addr: String
})

export default mongoose.model("studentsMain", studentsSchema)

/* sample data

/addStudentDetails

{
  "name": "John Doe",
  "rollNo": 12345,
  "branch": "Computer Science",
  "sem": 3,
  "batch": 2022,
  "photo": "https://example.com/john_doe.jpg",
  "regNo": 54321,
  "email": "johndoe@example.com",
  "phone": 5555555555,
  "countryCode": 1,
  "addr": "123 Main Street, Cityville"
}

*/
