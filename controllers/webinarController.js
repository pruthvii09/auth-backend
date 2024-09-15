const Webinar = require("../models/Webinar.js");

exports.addWebinar = async (req, res) => {
  try {
    const webinar = new Webinar(req.body);
    await webinar.save();
    res.status(201).json({ message: "Webinar added successfully", webinar });
  } catch (error) {
    res.status(400).json({ message: "Failed to add webinar", error });
  }
};

exports.getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.status(200).json({ message: "Webinar added successfully", webinars });
  } catch (err) {}
};

exports.updateWebinar = async (req, res) => {
  const { id } = req.params;
  try {
    const webinar = await Webinar.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    res.status(200).json({ message: "Webinar updated successfully", webinar });
  } catch (error) {
    res.status(400).json({ message: "Failed to update webinar", error });
  }
};

exports.deleteWebinar = async (req, res) => {
  const { id } = req.params;
  try {
    const webinar = await Webinar.findByIdAndDelete(id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    res.status(200).json({ message: "Webinar deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete webinar", error });
  }
};
