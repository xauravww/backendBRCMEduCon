const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Member = require("../model/login");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const getDataUri = require("../utils/dataUri.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const fs = require('fs');


exports.sample = catchAsyncErrors(async (req, res, next) => {

  console.log(req);

  // if (!req.files.photo) {
  //   return res.status(400).json({ error: 'No file uploaded' });
  // }

  // const imageFile = req.files.photo;
  // // const fileNmae = Date.now - req.files.photo.name;
  // // const newPath = require("path").join(process.cwd(), "test", fileNmae)
  // // req.files.photo.mv(newPath)
  // try {
  //   fs.writeFileSync('tempfile.png', imageFile.data);
  // } catch (error) {
  //   console.error('Error writing file:', error);
  //   return res.status(500).json({ error: 'Error writing file' });
  // }

  // await cloudinary.v2.uploader.upload("tempfile.png", {
  //   resource_type: 'auto',
  //   folder: "BRCNImg",
  //   width: 150,
  //   crop: "scale",
  // }, (error, result) => {
  //   if (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Error uploading image' + error });
  //   } else {
  //     console.log(result);
  //     res.json({ url: result.url });
  //   }
  // });
  // console.log(imageBuffer)
  res.json({ "success": "ok" });
});

// Register a User

exports.registerMember = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;
  console.log(file)
  const fileUri = getDataUri(file);

   
  if (!fileUri) {
    return next(new ErrorHander("please send a image also" + error, 400));
  }
  // const fileNmae = Date.now - req.files.photo.name;
  // const newPath = require("path").join(process.cwd(), "test", fileNmae)
  // req.files.photo.mv(newPath)
 
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

   const {
    email, phone, countryCode, pass, role,
    createdAt, rollno, name, semester,
    address, batchYear,
    fathername, registrationNo, dateOfBirth, age } = req.body;
  // creating member 
  console.log(req.body.email);

  const member = await Member.create({

    email, phone, countryCode, pass,
    role, rollno, name, semester, imageurl: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
    address, batchYear, fathername,
    registrationNo, dateOfBirth, age, createdAt

  });
  //send responce with token
  sendToken(member, 201, res);
});

exports.verifyUser = catchAsyncErrors(async (req, res, next) => {
  // Find the user based on the provided email
  const user = await Member.findOne({ email: req.body.email });

  // Check if the user is found
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update the 'verified' field based on the data in the request body
  user.verified = req.body.verified;
  // Save the updated user object
  await user.save();

  // Send the response with the updated user object
  sendToken(user, 201, res);
});



// Login Member
exports.loginMember = catchAsyncErrors(async (req, res, next) => {
  const { email, pass } = req.body;
  console.log(req)
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
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await Member.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `BRCM Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Member.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const member = await Member.findById(req.member.id).select("+pass");

  res.status(200).json({
    success: true,
    member,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const member = await Member.findById(req.member.id).select("+pass");

  const isPasswordMatched = await member.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  member.pass = req.body.newPassword;

  await member.save();

  sendToken(member, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    phone: req.body.phone,
    countryCode: req.body.countryCode,
    pass: req.body.pass,
    role: req.body.role,
    rollno: req.body.rollno,
    name: req.body.name,
    semester: req.body.semester,
    imageurl: req.body.imageurl,
    address: req.body.address,
    batchYear: req.body.batchYear,
    fathername: req.body.fathername,
    registrationNo: req.body.registrationNo,
    dateOfBirth: req.body.dateOfBirth,
    age: req.body.age,
  };

  // if (req.body.avatar !== "") {
  //   const user = await Member.findById(req.user.id);

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  const member = await Member.findByIdAndUpdate("652637158cc7e023bc6baff3", newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await Member.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await Member.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await Member.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await Member.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
