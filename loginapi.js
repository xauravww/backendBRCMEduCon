const Student = require("./model/student");


// Login API endpoint
app.post("/login", async (req, res) => {
  const { email, phone, pass } = req.body

  try {
    // Find the user based on email or phone
    const user = await Student.findOne({ $or: [{ email }, { phone }] })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // Compare the provided password with the hashed password
    if (passwordMatches(pass, user.pass)) {
      // Generate a JWT token or use your authentication mechanism
      const token = generateAuthToken(user)

      return res.status(200).json({ message: "Login successful", token })
    } else {
      return res.status(401).json({ message: "Invalid password" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
})
