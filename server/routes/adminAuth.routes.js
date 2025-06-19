const express = require("express");
const router = express.Router();
const {
  adminSignup,
  getAdminCredentials,
  adminSignin,
} = require("../controllers/authControllers");

router.post("/signup", adminSignup);

router.get("/credentials", getAdminCredentials);

router.post("/signin", adminSignin);

module.exports = router;
