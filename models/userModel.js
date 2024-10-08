const mongoose = require("mongoose");

const loginUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL"
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LoginUser = mongoose.model("login_user", loginUserSchema);
module.exports = { LoginUser };
