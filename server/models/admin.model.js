const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    agreeToTerms: {
      type: Boolean,
      required: [true, "You must agree to the terms and conditions"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", AdminSchema);

module.exports = Admin;
