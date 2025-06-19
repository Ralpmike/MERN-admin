const Admin = require("../models/admin.model"); // Assuming you have an Admin model
const bcrypt = require("bcryptjs"); // For password hashing, if needed
const jwt = require("jsonwebtoken"); // For token generation, if needed

const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    const existingAdmin = await Admin.exists({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword, // In a real application, you should hash the password before saving it
    });
    await newAdmin.save();
    res.status(200).json({
      newAdmin,
      message: "Admin login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: existingAdmin._id, email: existingAdmin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // *Token expiration time
      }
    );

    res.status(200).json({
      token,
      admin: {
        id: existingAdmin._id,
        firstName: existingAdmin.firstName,
        lastName: existingAdmin.lastName,
        email: existingAdmin.email,
      },
      message: "Admin login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAdminCredentials = async (req, res) => {
  try {
    const AdminCredentials = await Admin.find({});
    res.status(200).json({
      AdminCredentials,
      message: "Admin credentials retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  adminSignup,
  getAdminCredentials,
  adminSignin, // Export the adminSignin function
  // Add more admin-related controllers here as needed
};
