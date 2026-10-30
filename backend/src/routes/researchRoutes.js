import express from "express";
import Research from "../models/Research.js";

import * as defaults from "../../../src/pages/researchData.js";

const router = express.Router();

// Keys of the research content. Each one is stored as its own field.
const CONTENT_KEYS = [
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

const DEFAULT_RESEARCH = Object.fromEntries(
    CONTENT_KEYS.map((key) => [key, defaults[key]])
);

// GET: Fetch the Research page content
router.get("/", async (req, res) => {
    try {
        let research = await Research.findOne();

        if (!research) {
            research = await Research.create(DEFAULT_RESEARCH);
        } else {
            // Restore a default only when a field is empty in the database.
            let changed = false;

            for (const key of CONTENT_KEYS) {
                const value = research[key];
                const empty =
                    value === undefined ||
                    value === null ||
                    (Array.isArray(value) && value.length === 0) ||
                    (!Array.isArray(value) && typeof value === "object" && Object.keys(value).length === 0);

                if (empty) {
                    research[key] = DEFAULT_RESEARCH[key];
                    changed = true;
                }
            }

            if (changed) {
                await research.save();
            }
        }

        res.json({ success: true, research });
    } catch (error) {
        console.error("Error fetching Research content:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Research content",
        });
    }
});

// PUT: Save the Research page content
router.put("/", async (req, res) => {
    try {
        const updates = {};

        for (const key of CONTENT_KEYS) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        let research = await Research.findOne();

        if (!research) {
            research = await Research.create({
                ...DEFAULT_RESEARCH,
                ...updates,
            });
        } else {
            Object.assign(research, updates);
            await research.save();
        }

        res.json({ success: true, research });
    } catch (error) {
        console.error("Error saving Research content:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save Research content",
        });
    }
});

export default router;
