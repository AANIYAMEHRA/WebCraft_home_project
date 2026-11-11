import express from "express";
import Research from "../models/Research.js";

const router = express.Router();

// GET: Load Research content
router.get("/", async (req, res) => {
  try {
    let content = await Research.findOne();

    if (!content) {
      content = await Research.create({});
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Research fetch error:", error);

    return res.status(500).json({
      message: "Failed to load Research content",
      error: error.message,
    });
  }
});

// PUT: Save Research content
router.put("/", async (req, res) => {
  try {
    const allowedFields = [
      "hero",
      "manifesto",
      "practicesIntro",
      "practices",
      "method",
      "deliverablesIntro",
      "deliverables",
      "chart",
      "engage",
      "cta",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    let content = await Research.findOne();

    if (!content) {
      content = new Research();
    }

    for (const [field, value] of Object.entries(updates)) {
      content.set(field, value);
    }

    await content.save();

    const savedContent = await Research.findById(content._id).lean();

    return res.status(200).json({
      message: "Research content updated successfully",
      content: savedContent,
    });
  } catch (error) {
    console.error("Research update error:", error);

    return res.status(500).json({
      message: "Failed to update Research content",
      error: error.message,
    });
  }
});

export default router;