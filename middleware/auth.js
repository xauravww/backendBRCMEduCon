const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Member = require("../model/login");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    token = req.body.token;
  }

  if (!token) {
    return next(new ErrorHander("Please login to access this resource", 401));
  }

  // Remove 'Bearer ' from token if it exists in the header
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.member = await Member.findById(decodedData.id);

    if (!req.member) {
      return next(new ErrorHander("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHander("Invalid token, please login again", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.member.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.member.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
