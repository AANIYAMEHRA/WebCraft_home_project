
import express from "express";
import About from "../models/About.js";

const router = express.Router();

const DEFAULT_ABOUT = {
    heroChips: [],
    milestones: [],
    ways: [],
    values: [],
    philSteps: [],
    stats: [],
    sectionContent: {},
};

// GET: Fetch About page content
router.get("/", async (req, res) => {
    try {
        let about = await About.findOne();

        if (!about) {
            about = await About.create(DEFAULT_ABOUT);
        }

        res.json({ success: true, about });
    } catch (error) {
        console.error("Error fetching About content:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch About content",
        });
    }
});

// PUT: Save About page content
router.put("/", async (req, res) => {
    try {
        const allowedFields = [
            "heroChips",
            "milestones",
            "ways",
            "values",
            "philSteps",
            "stats",
            "sectionContent",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        let about = await About.findOne();

        if (!about) {
            about = await About.create({
                ...DEFAULT_ABOUT,
                ...updates,
            });
        } else {
            Object.assign(about, updates);
            await about.save();
        }

        res.json({ success: true, about });
    } catch (error) {
        console.error("Error saving About content:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save About content",
        });
    }
});

export default router;
