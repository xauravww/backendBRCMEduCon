const mongoose = require("mongoose");




const attendanceData = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late","none"],
    default: "absent",
  },
  remarks: {
    type: String,
    enum: ["on_time", "late", "leave","none"],
    default: "on_time", 
   },
});

const attendanceSchema = new mongoose.Schema({

  attendanceData: { 
    type: [attendanceData] },

  date: {
    type: Date,
    required: true,
  },
  branch: {
    type:String,
    required: true,
  },
  semester: {
    type:String,
    required: true,
  },
  subject: {
    type:String,
    required: true,
  },

});

module.exports = mongoose.model("Attendance", attendanceSchema);



/*
create attendance
    post req method
        http://localhost:4000/api/v1/faculty/attendance

        {
            "memberId": "652637158cc7e023bc6baff3",  
            "date": "2023-10-10T12:00:00.000Z",
            "status": "present",
            "remarks": "sick leave"
        }

For Delete attendance
    delete req
        http://localhost:4000/api/v1/faculty/attendance/_id
  
for Update Attendance
    put req method
        http://localhost:4000/api/v1/faculty/attendance/_id

for get all Attendance
    get req method
        http://localhost:4000/api/v1/faculty/attendance/

*/