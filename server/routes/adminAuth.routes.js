const express = require("express");
const router = express.Router();
const {
  adminSignup,
  getAdminCredential,
  adminSignin,
} = require("../controllers/authControllers");
const adminAuth = require("../middlewares/adminAuthMiddleware");

router.post("/signup", adminSignup);

router.get("/me", adminAuth, getAdminCredential);

router.post("/signin", adminSignin);

module.exports = router;
