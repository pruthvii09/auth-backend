const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  developerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
