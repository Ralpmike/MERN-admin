const { Schema, model } = require("mongoose");

const UserSchemaModel = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Name is required"],
    },
    last_name: {
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
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    course: {
      type: String,
      enum: [
        "web developement",
        "mobile development",
        "backend development",
        "game development",
        "design",
        "other",
      ],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchemaModel);

module.exports = User;
