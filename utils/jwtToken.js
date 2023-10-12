// Create Token and saving in cookie

const sendToken = (members, statusCode, res) => {
  // const token = "user.getJWTToken()";
  const token = members.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE)* 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    members,
    token,
  });
};

module.exports = sendToken;
