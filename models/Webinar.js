const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    instructorName: {
      type: String,
      required: true,
    },
    instructorRole: {
      type: String,
      required: true,
    },
    instructorImage: {
      type: String,
      required: true,
    },
    instructorCompany: {
      type: String,
      required: true,
    },
    topics: {
      type: String,
      required: true,
    },
    webinarTitle: {
      type: String,
      required: true,
    },
    webinarStartDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Webinar = mongoose.model("Webinar", webinarSchema);

module.exports = Webinar;
