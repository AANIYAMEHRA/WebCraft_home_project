
import express from "express";
import Home from "../models/Home.js";

const router = express.Router();

const defaultHome = {
    heroChip: "AI-Led · Research-Backed · Delivery-Ready",
    headingLine1: "Smarter Decisions.",
    headingLine2: "Stronger Products.",
    description:
        "Webcraft combines AI solutions and deep research with proven engineering to help you decide what to build, then build it right.",

    button1Text: "Explore AI Solutions",
    button1Url: "/ai-solutions",
    button2Text: "See Research Capabilities",
    button2Url: "/research",

    beliefLabel: "Our Belief",
    beliefHeading:
        "We listen before we propose. We prototype before we commit.",
    beliefDescription:
        "We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 — and kept our clients with us long after the first engagement ended.",

    stats: [
        { value: 17, suffix: "+", label: "Years Established" },
        { value: 3000, suffix: "+", label: "Clients Served" },
        { value: 230, suffix: "+", label: "Professionals" },
        { value: 96, suffix: "%", label: "Client Retention" },
    ],

    whatWeDo: {
        label: "WHAT WE DO",
        heading: "Four Capabilities, One Partner",
        description:
            "We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together.",

        services: [
            {
                title: "AI Solutions",
                description:
                    "Machine learning, generative AI, NLP, intelligent automation, and AI strategy — applied to real business problems with measurable outcomes.",
                buttonText: "Explore AI Solutions",
                buttonUrl: "/ai-solutions",
            },
            {
                title: "Research",
                description:
                    "Market research, competitive intelligence, UX research, innovation testing, and strategic advisory — to ensure you're building the right thing.",
                buttonText: "See Research Capabilities",
                buttonUrl: "/research",
            },
            {
                title: "Products",
                description:
                    "Ready-to-deploy platforms — HRMS, TutorWand, and WCSchool ERP — built from domain expertise and client feedback.",
                buttonText: "Explore Products",
                buttonUrl: "/products",
            },
            {
                title: "Services",
                description:
                    "Web, mobile, UI/UX, cloud, system integration, QA, and digital transformation — the engineering depth to ship it right.",
                buttonText: "View All Services",
                buttonUrl: "/services",
            },
        ],
    },
};

// GET: Load Home Page content
router.get("/", async (req, res) => {
    try {
        let home = await Home.findOne();

        if (!home) {
            home = await Home.create(defaultHome);
        }

        res.json(home);
    } catch (error) {
        console.error("Home fetch error:", error);

        res.status(500).json({
            message: "Failed to load Home content",
            error: error.message,
        });
    }
});

// PUT: Save Home Page content from Admin Panel
router.put("/", async (req, res) => {
    try {
        const allowedFields = [
            "heroChip",
            "headingLine1",
            "headingLine2",
            "description",
            "button1Text",
            "button1Url",
            "button2Text",
            "button2Url",
            "beliefLabel",
            "beliefHeading",
            "beliefDescription",
            "stats",
            "whatWeDo",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        let home = await Home.findOne();

        if (!home) {
            home = new Home(defaultHome);
        }

        // Update only the fields sent by the Admin Panel.
        for (const [field, value] of Object.entries(updates)) {
            home.set(field, value);
        }

        // Persist changes to MongoDB.
        await home.save();

        // Return the actual saved document.
        const savedHome = await Home.findById(home._id).lean();

        return res.status(200).json({
            message: "Home content updated successfully",
            home: savedHome,
        });
    } catch (error) {
        console.error("Home update error:", error);

        return res.status(500).json({
            message: "Failed to update Home content",
            error: error.message,
        });
    }
});

export default router;
