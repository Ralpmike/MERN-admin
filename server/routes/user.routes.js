const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userControllers");
const adminAuth = require("../middlewares/adminAuthMiddleware");

// Route to get all users
router.get("/", adminAuth, getAllUsers);

//? Route to create a new user
router.post("/", createUser);

// Route to get a user by ID
router.get("/:id", getUserById);
// Route to update a user by ID
router.put("/:id", updateUser);
// Route to delete a user by ID
router.delete("/:id", deleteUser);

module.exports = router;
