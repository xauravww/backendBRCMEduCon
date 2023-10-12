const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
 
  phone: {
    type: Number,
  },
 
  countryCode: {
    type: Number,
  },
 
  pass: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },

  role: {
    type: String,
    default: "student",
  },
  
  rollno: {
    type: String,
    default: ""
  },         
  
  name: {
    type: String,
    default: ""
  },            
  
  semester: {
    type: String,
    default: ""
  },       
  
  imageurl: {
    type: String,
    default: ""
  },        
  
  address: {
    type: String,
    default: ""
  },         
  
  batchYear: {
    type: Number,
    default: 0
  },      
  
  fathername: {
    type: String,
    default: ""
  },    
  
  registrationNo: {
    type: String,
    default: ""
  },  
  
  dateOfBirth: {
    type: Date,
    default: null
  },      
  
  age: {
    type: Number,
    default: 0
  }, 
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

loginSchema.pre("save", async function (next) {
  if (!this.isModified("pass")) {
    next();
  }

  this.pass = await bcrypt.hash(this.pass, 10);
});

// JWT TOKEN
loginSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Compare Password when user login request

loginSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.pass);
};

// Generating Password Reset Token
loginSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to loginSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Member", loginSchema);
/* sample data

/for register register
http://localhost:4000/api/v1/register 

  {
    "email": "anotheruser@gmail.com",
    "phone": 9876543210,
    "countryCode": 91,
    "pass": "saurav@123",
    "role": "admin",
    "rollno": "5678",
    "name": "saurav",
    "semester": "first Semester",
    "imageurl": "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.webp?s=2048x2048&w=is&k=20&c=X7M3yQkbRq7zIsY16tuaHy8Wu_oo5j-Hp8Uqe7wWxDY=",
    "address": "456 behal, abcd ",
    "batchYear": 2019,
    "fathername": "Father",
    "registrationNo": "65877536893",
    "dateOfBirth": "2001-08-20",
    "age": 22
  }


*/
