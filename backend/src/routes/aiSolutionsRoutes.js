
import express from "express";
import AiSolutions from "../models/AiSolutions.js";

const router = express.Router();

// GET: Load AI Solutions content
router.get("/", async (req, res) => {
  try {
    let content = await AiSolutions.findOne();

    if (!content) {
      content = await AiSolutions.create({});
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("AI Solutions fetch error:", error);

    return res.status(500).json({
      message: "Failed to load AI Solutions content",
      error: error.message,
    });
  }
});

// PUT: Save AI Solutions content
router.put("/", async (req, res) => {
  try {
    const allowedFields = [
      "hero",
      "manifesto",
      "panels",
      "techStack",
      "philosophy",
      "cta",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    let content = await AiSolutions.findOne();

    if (!content) {
      content = new AiSolutions();
    }

    for (const [field, value] of Object.entries(updates)) {
      content.set(field, value);
    }

    await content.save();

    const savedContent = await AiSolutions.findById(content._id).lean();

    return res.status(200).json({
      message: "AI Solutions content updated successfully",
      content: savedContent,
    });
  } catch (error) {
    console.error("AI Solutions update error:", error);

    return res.status(500).json({
      message: "Failed to update AI Solutions content",
      error: error.message,
    });
  }
});

export default router;
