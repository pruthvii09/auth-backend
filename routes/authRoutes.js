const express = require("express");
const {
  signup,
  login,
  getAllUsers,
  registerDeveloper,
} = require("../controllers/authColtroller.js");

const router = express.Router();

router.post("/developer/register", registerDeveloper); // Developer registration
router.post("/signup", signup); // User signup
router.post("/login", login); // User login
router.get("/users", getAllUsers); // Get users

module.exports = router;
