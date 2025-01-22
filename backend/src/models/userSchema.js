import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return password.length >= 5;
      },
      message: "Password must be at least 5 characters long",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email format",
    },
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
