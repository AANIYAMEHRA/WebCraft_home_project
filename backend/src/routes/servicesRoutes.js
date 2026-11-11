import express from "express";
import Services from "../models/Services.js";

const router = express.Router();

// Only these sections can be written through the API.
const allowedFields = [
  "hero",
  "capabilitiesIntro",
  "capabilities",
  "techStack",
  "engagementModels",
  "cases",
  "faq",
  "servicesCta",
];

// GET the Services content. Creates an empty document on first use.
router.get("/", async (req, res) => {
  try {
    let content = await Services.findOne();
    if (!content) content = await Services.create({});
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (save) the Services content.
router.put("/", async (req, res) => {
  try {
    let content = await Services.findOne();
    if (!content) content = new Services();

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        content.set(field, req.body[field]);
      }
    }

    await content.save();

    res.json({
      message: "Services content updated successfully",
      content: content.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;