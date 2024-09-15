const express = require("express");
const {
  addWebinar,
  updateWebinar,
  deleteWebinar,
  getWebinars,
} = require("../controllers/webinarController");

const router = express.Router();

router.get("/", getWebinars);
router.post("/", addWebinar);
router.patch("/:id", updateWebinar);
router.delete("/:id", deleteWebinar);

module.exports = router;
