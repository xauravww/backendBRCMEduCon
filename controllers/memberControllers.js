const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Member = require("../model/login");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  exports.registerMember = catchAsyncErrors(async (req, res, next) => {

    const {
      email,phone,countryCode,pass,role,
      createdAt,rollno,name,semester,
      imageurl,address,batchYear,
      fathername,registrationNo,dateOfBirth,age}= req.body;
      // creating member 
    const member = await Member.create({

      email,phone,countryCode,pass,
      role,rollno,name,semester,imageurl,
      address,batchYear,fathername,
      registrationNo,dateOfBirth,age,createdAt
   
    });
  //send responce with token
    sendToken(member, 201, res);
  });
  
  

// Login Member
exports.loginMember = catchAsyncErrors(async (req, res, next) => {
  const { email, pass } = req.body;

  // checking if member has given password and email both

  if (!email || !pass) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const member = await Member.findOne({ email }).select("+pass");

  if (!member) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await member.comparePassword(pass);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(member, 200, res);
});

// Logout User

// Forgot Password
