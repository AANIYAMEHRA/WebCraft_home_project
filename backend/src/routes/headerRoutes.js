import express from "express";
import Header from "../models/Header.js";

const router = express.Router();

const defaultHeader = {
  logoUrl: "/logo.svg",
  links: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/ai-solutions", label: "AI Solutions" },
    { to: "/research", label: "Research" },
    { to: "/products", label: "Products" },
    { to: "/services", label: "Services" },
  ],
  contactText: "Contact Us",
  contactUrl: "/contact",
};

// GET: Retrieve header content
router.get("/", async (req, res) => {
  try {
    let header = await Header.findOne();

    if (!header) {
      header = await Header.create(defaultHeader);
    }

    res.json(header);
  } catch (error) {
    console.error("Header fetch error:", error);
    res.status(500).json({ message: "Failed to fetch header" });
  }
});

// PUT: Update header content
router.put("/", async (req, res) => {
  try {
    const allowedFields = [
      "logoUrl",
      "links",
      "contactText",
      "contactUrl",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    let header = await Header.findOne();

    if (!header) {
      header = new Header({ ...defaultHeader, ...updates });
    } else {
      Object.assign(header, updates);
    }

    await header.save();

    res.json({
      message: "Header updated successfully",
      header,
    });
  } catch (error) {
    console.error("Header update error:", error);
    res.status(500).json({ message: "Failed to update header" });
  }
});

export default router;