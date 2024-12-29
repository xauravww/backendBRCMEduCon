const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Member = require("../model/login");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const getDataUri = require("../utils/dataUri.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");

exports.sample = catchAsyncErrors(async (req, res, next) => {

  // console.log(req);

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


  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const {
    email, phone, countryCode, pass, role,
    createdAt, rollno, name, semester,
    address, batchYear, branch,
    fathername, registrationNo, dateOfBirth, age } = req.body;
  // creating member 

  console.log( email, phone, countryCode, pass, role,
    createdAt, rollno, name, semester,
    address, batchYear, branch,
    fathername, registrationNo, dateOfBirth, age);

  const member = await Member.create({

    email, phone, countryCode, pass,
    role, rollno, name, semester, imageurl: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
    address, batchYear, branch, fathername,
    registrationNo, dateOfBirth, age, createdAt

  });
  //send responce with token
  sendToken(member, 201, res);
});

// exports.verifyUser = catchAsyncErrors(async (req, res, next) => {
//   // Find the user based on the provided email
//   const user = await Member.findOne({ email: req.body.email });

//   // Check if the user is found
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   // Update the 'verified' field based on the data in the request body
//   user.verified = req.body.verified;
//   // Save the updated user object
//   await user.save();

//   // Send the response with the updated user object
//   sendToken(user, 201, res);
// });

// update and verify user by Admin
exports.verifyMember = catchAsyncErrors(async (req, res, next) => {
  const { id, verified } = req.body;

  if (!id || verified === undefined) {
    return next(new ErrorHander('Missing required fields (id, verified)', 400));
  }
  await Member.findByIdAndUpdate(id, { verified }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
// get Unverified user By admin to check and verify them
exports.getAllUnverifiedMembers = catchAsyncErrors(async (req, res, next) => {
  const unverifiedMembers = await Member.find({ verified: false });

  res.status(200).json({
    success: true,
    data: unverifiedMembers,
  });
});

// Login Member
exports.loginMember = catchAsyncErrors(async (req, res, next) => {
  const { email, pass } = req.body;
  // console.log(req)
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
  const randomPassword = await user.generateRandomPassword();

  const data = await user.save({ validateBeforeSave: false });
console.log("saved data : ",data)
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const message = `Your  reset  password  is :- \n\n ${randomPassword} \n\nIf you have not requested this email then, please ignore it.`;
console.log("message :",message)
  try {
    const result  = await sendEmail({
      email: req.body.email,
      subject: `BRCM Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${req.body.email} successfully`,
      result:result
    });
  } catch (error) {
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;
    user.randomPass = null

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    // Retrieve the reset token from the URL parameter
    const resetPass = req.body.randomPass;
    console.log("Random password token from user :", resetPass);

    // Find the user with the matching reset token
    const user = await Member.findOne({ email:req.body.email });

    // If no user is found or the token is invalid, return an error
    if (!user) {
      return next(new ErrorHander("User not found or invalid token", 400));
    }

    // Check if the password reset token has expired
    if (user.resetPasswordExpire && user.resetPasswordExpire < Date.now()) {
      return next(new ErrorHander("Password reset token has expired", 400));
    }

    // Ensure that the new password matches the confirmed password
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Passwords do not match", 400));
    }

    // Check if the randomPass from database and from body are the same
    if (user.randomPass !== req.body.randomPass) {
      return next(new ErrorHander("Invalid random password", 400));
    }

    // Update user's password field
    user.pass = req.body.password; // this password automatically hashed using pre at login schema before saving

    // Clear the reset token and expiration fields
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;
    user.randomPass = null;
    user.resetPasswordExpire=null
    // Save the updated user data
    await user.save({validateBeforeSave:false});

    // Send a response with a new JWT token
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
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
// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  // Extract updated member data from the request body
  const {
    _id, // Add the _id field from req.body
    email, phone, countryCode, pass, role,
    rollno, name, semester, address,
    batchYear, branch, fathername,
    registrationNo, dateOfBirth, age
  } = req.body;

  const newUserData = {
    email, phone, countryCode, role,
    rollno, name, semester,
    address, batchYear, branch,
    fathername, registrationNo, dateOfBirth, age
  };

  // Check if a new password is provided
  if (pass) {
    // Hash the new password
    const hashedPass = await bcrypt.hash(pass, 10);
    newUserData.pass = hashedPass;
  }

  // Check if there is a file in the request for updating the image
  if (req.file) {
    // Upload the new image to cloudinary
    const fileUri = getDataUri(req.file);
    const newCloudImage = await cloudinary.v2.uploader.upload(fileUri.content);
    newUserData.imageurl = {
      public_id: newCloudImage.public_id,
      url: newCloudImage.secure_url,
    };

    // Delete the old image if it exists
    const member = await Member.findById(_id);
    if (member && member.imageurl && member.imageurl.url) { // Check if member exists and has imageurl
      const publicId = member.imageurl.public_id;
      await cloudinary.v2.uploader.destroy(publicId);
    }
  } else {
    // Keep the old image if no new file is received
    const member = await Member.findById(_id);
    if (member && member.imageurl && member.imageurl.url) { // Check if member exists and has imageurl
      newUserData.imageurl = {
        public_id: member.imageurl.public_id,
        url: member.imageurl.url,
      };
    }
  }

  // Update the member with the new data
  const updatedMember = await Member.findByIdAndUpdate(_id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send success response
  res.status(200).json({
    success: true,
    data: updatedMember,
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

  const imageId = user.imageurl.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
