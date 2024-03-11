const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {genPassword, validPassword} = require("../../Utils/authUtils");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    hash: {
      type: String,
    },
    salt: {
      type: String,
    },
    token: {
      type: mongoose.Types.ObjectId,
      ref: 'Token'
    },
  },
  {
    timestamps: true,
  }
);


// compare password
adminSchema.methods.comparePassword = function (enteredPassword) {
  return validPassword(enteredPassword, this.hash, this.salt);
};

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
