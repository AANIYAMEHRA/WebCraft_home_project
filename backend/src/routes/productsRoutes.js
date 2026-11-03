
import express from "express";
import Products from "../models/Products.js";

const router = express.Router();

// GET: Load Products content
router.get("/", async (req, res) => {
  try {
    let content = await Products.findOne();

    if (!content) {
      content = await Products.create({});
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Products fetch error:", error);

    return res.status(500).json({
      message: "Failed to load Products content",
      error: error.message,
    });
  }
});

// PUT: Save Products content
router.put("/", async (req, res) => {
  try {
    console.log(
      "PRODUCTS UPDATE RECEIVED:",
      JSON.stringify(req.body, null, 2)
    );

    const allowedFields = ["hero", "products", "cta"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid Products content provided.",
      });
    }

    const savedContent = await Products.findOneAndUpdate(
      {},
      { $set: updates },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    ).lean();

    console.log(
      "PRODUCTS SAVED IN DATABASE:",
      JSON.stringify(savedContent, null, 2)
    );

    return res.status(200).json({
      message: "Products content updated successfully",
      content: savedContent,
    });
  } catch (error) {
    console.error("Products update error:", error);

    return res.status(500).json({
      message: "Failed to update Products content",
      error: error.message,
    });
  }
});

export default router;
