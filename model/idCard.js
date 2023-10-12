const mongoose = require("mongoose");

const idCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollno: {
    type: String,
    required: true,
    unique: true
  },
  member: {
    type: String,
    enum: ["student", "faculty","admin"],
    default: "student",
  },
  mobileNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  age: Number,
  batchYear: Number,
  dob: Date,
  registrationNo: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("IDCard", idCardSchema);


/*
create idcard
    post req method
        http://localhost:4000/api/v1/admin/id-card
            {
              "name": "ankit",
              "rollno": "5656",
              "mobileNo": "1234567890",
              "email": "ankitdd@example.com",
              "address": "123 Main Street, behal",
              "age": 22,
              "batchYear": 2020,
              "dob": "2003-10-11T00:00:00.000Z",
              "registrationNo": "678454456"
            }


For Delete idcard
    delete req
        http://localhost:4000/api/v1/admin/id-card/id
  
for Update idcard
    put req method
        http://localhost:4000/api/v1/admin/id-card/id
           json body

           
for get all idcard
    get req method
        http://localhost:4000/api/v1/admin/id-card

for get idcard through rollno
    get req method
        http://localhost:4000/api/v1/admin/id-card/rollNo
*/