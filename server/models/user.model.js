const { Schema, model } = require("mongoose");

const UserSchemaModel = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name is required"],
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
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
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
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchemaModel);

module.exports = User;
