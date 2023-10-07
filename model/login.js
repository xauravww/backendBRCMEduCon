import mongoose from "mongoose"

const loginSchema = new mongoose.Schema({
  email: String,
  phone: Number,
  countryCode: Number,
  pass: String,
  role: String
})

export default mongoose.model("loginMain", loginSchema)

/* sample data

/createLogin

{
  "email": "user@example.com",
  "phone": 5555555555,
  "countryCode": 1,
  "pass": "securepassword",
  "role":"student"
}

*/
