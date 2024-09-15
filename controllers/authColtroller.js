const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Developer = require("../models/Developer");
const crypto = require("crypto");

const registerDeveloper = async (req, res) => {
  const { name, email } = req.body;

  try {
    const existingDeveloper = await Developer.findOne({ email });
    if (existingDeveloper) {
      return res.status(400).json({ message: "Developer already exists" });
    }

    const apiKey = crypto.randomBytes(32).toString("hex"); // Generate a unique API key

    const newDeveloper = new Developer({ name, email, apiKey });
    await newDeveloper.save();

    res
      .status(201)
      .json({ message: "Developer registered successfully", apiKey });
  } catch (error) {
    res.status(500).json({ message: "Error registering developer", error });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  const apiKey = req.headers["x-api-key"]; // Expect API key in the headers

  try {
    const developer = await Developer.findOne({ apiKey });
    if (!developer) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const existingUser = await User.findOne({
      email,
      developerId: developer._id,
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      developerId: developer._id,
    });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "100h" }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const apiKey = req.headers["x-api-key"]; // Expect API key in the headers

  try {
    const developer = await Developer.findOne({ apiKey });
    if (!developer) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const user = await User.findOne({ email, developerId: developer._id });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

const getAllUsers = async (req, res) => {
  const apiKey = req.headers["x-api-key"]; // Expect API key in the headers

  try {
    const developer = await Developer.findOne({ apiKey });
    if (!developer) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    // Fetch users associated with this developer
    const users = await User.find({ developerId: developer._id }, "email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

module.exports = { signup, login, getAllUsers, registerDeveloper };
