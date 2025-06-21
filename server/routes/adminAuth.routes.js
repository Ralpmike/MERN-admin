const express = require("express");
const router = express.Router();
const {
  adminSignup,
  getAdminCredential,
  adminSignin,
} = require("../controllers/authControllers");

router.post("/signup", adminSignup);

router.get("/me", getAdminCredential);

router.post("/signin", adminSignin);

module.exports = router;
