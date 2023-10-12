const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member", // Reference to the Member model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "absent",
  },
  remarks: {
    type: String,
    default: "",
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