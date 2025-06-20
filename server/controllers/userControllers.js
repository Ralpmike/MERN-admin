const User = require("../models/user.model");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* Update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    age,
    course,
    location,
    nationality,
    city,
    phoneNumber, // Optional field
    state,
  } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        age,
        course,
        location,
        nationality,
        city,
        phoneNumber,
        state,
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the email is updated, check if it already exists
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//? Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser, { message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//? Create a new user
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      age,
      course,
      location,
      nationality,
      city,
      phoneNumber, // Optional field
      state,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !age ||
      !location ||
      !nationality ||
      !city ||
      !state ||
      !course ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", ok: false });
    }

    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists", ok: false });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      age,
      course,
      location,
      nationality,
      city,
      state,
      phoneNumber, // Optional field
    });

    await newUser.save();
    res
      .status(201)
      .json({ newUser, message: "User created successfully", ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
