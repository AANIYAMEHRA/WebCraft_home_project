
import express from "express";
import Footer from "../models/Footer.js";

const router = express.Router();

// Get footer content
router.get("/", async (req, res) => {
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = await Footer.create({
        socials: [
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/webcraft-it/",
          },
          {
            label: "Instagram",
            href: "https://www.instagram.com/webcraftitcompany/",
          },
          {
            label: "Facebook",
            href: "https://www.facebook.com/webcraftit/",
          },
        ],
        columns: [
          {
            title: "Explore",
            items: [
              { label: "AI Solutions", to: "/ai-solutions" },
              { label: "Research", to: "/research" },
              { label: "Services", to: "/services" },
              { label: "Products", to: "/products" },
            ],
          },
          {
            title: "Products",
            items: [
              { label: "Webcraft HRMS", to: "/products" },
              { label: "TutorWand", to: "/products" },
              { label: "WCSchool ERP", to: "/products" },
            ],
          },
          {
            title: "Company",
            items: [
              { label: "About us", to: "/about" },
              { label: "Contact", to: "/contact" },
            ],
          },
        ],
      });
    }

    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: "Failed to load footer" });
  }
});


 // Update footer content
router.put("/", async (req, res) => {
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer(req.body);
    } else {
      const allowedFields = [
        "kicker",
        "heading",
        "headingEmphasis",
        "email",
        "brandTagline",
        "socials",
        "columns",
        "bottomText",
      ];

      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          footer[field] = req.body[field];
        }
      }
    }

    await footer.save();

    res.json({
      message: "Footer updated successfully",
      footer,
    });
  } catch (error) {
    console.error("Footer update error:", error);
    res.status(500).json({
      message: "Failed to update footer",
    });
  }
});

export default router;
