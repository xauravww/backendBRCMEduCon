const mongoose = require("mongoose");

const collegeStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  semester: String,
  title: String,
  totalFees: Number,
  pendingFees: Number,
  lateFee: Number,
  fine: Number, 
  bookBank: Number,
  attendancePercentage: Number,
  
});

module.exports = mongoose.model("CollegeStatus", collegeStatusSchema);
/*
create status
    post reg method
        http://localhost:4000/api/v1/admin/status

        {
          "name": "John Doe",
          "rollNo": "2023001",
          "semester": "Spring 2023",
          "totalFees": 15000,
          "pendingFees": 5000,
          "lateFee": 200,
          "fine": 100,
          "bookBank": 300,
          "title": "Submit Your Due before 31 july",
          "attendancePercentage": 85
        }


For Delete status
    delete req method
        http://localhost:4000/api/v1/admin/status/id
  
for Update status
    put req method
        http://localhost:4000/api/v1/admin/status/id

for get all status
    get req method
        http://localhost:4000/api/v1/admin/status/

*/
