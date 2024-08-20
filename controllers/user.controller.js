const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require("dotenv").config();


// User Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hashing the password with bcrypt
      const hashPass = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = new User({ username, email, password: hashPass });
      await user.save();
  
      res.status(201).json({ message: 'User successfully registered' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  };

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password , user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
