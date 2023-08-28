const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// simulated database storage
const otpDatabase = {};

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/RegisterUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  pin: String,
});

const User = mongoose.model("User", userSchema);

// register api
app.post("/api/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// login api
app.post("/api/login", async (req, res) => {
  const { mobileNumber, pin } = req.body;

  try {
    const user = await User.findOne({ mobileNumber, pin });
    if (user) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Endpoint for send otp
app.post("/send-otp", (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const otp = randomstring.generate(6);
  const expiryTime = Date.now() + 300000;

  otpDatabase[mobileNumber] = { otp, expiryTime };

  // code to send otp to the mobile number
  console.log(`Otp send to ${mobileNumber} : ${otp}`);

  res.json({ message: "OTP sent successfully" });
});

// Endpoint to verify otp
app.post("/verify-otp", (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const enteredOTP = req.body.otp;
  if (
    otpDatabase[mobileNumber] &&
    otpDatabase[mobileNumber].otp === enteredOTP
  ) {
    if (otpDatabase[mobileNumber].expiryTime > Date.now()) {
      delete otp[mobileNumber];
      res.json({ message: "OTP verfication successful" });
    } else {
      res.status(400).json({ message: "OTP has expired" });
    }
  } else {
    res.status(400).json({ message: "OTP verification failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
