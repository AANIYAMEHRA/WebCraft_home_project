
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

    approach: {
        label: "Our Approach",
        heading: "We don't start with code.",
        introDescription:
            "Every engagement begins with understanding. Through structured research, market analysis, and technology assessment, we help you define the right problem — then design and build the right solution.",
        steps: [
            {
                num: "01",
                title: "Understand",
                card: "Research, validate and define the opportunity before a line of code is written.",
                sub: "We start with clarity.",
                desc: "Research, validate, and define the opportunity. We listen carefully before we recommend — then we pressure-test the recommendation before we build.",
            },
            {
                num: "02",
                title: "Design",
                card: "Architect the solution around product thinking, user value and scalability.",
                sub: "We design for leverage.",
                desc: "Architect the solution around product thinking, user value, and scalability. Every decision gets a written rationale — so it holds up six months later.",
            },
            {
                num: "03",
                title: "Deliver",
                card: "Build, iterate and support at scale with full accountability from one team.",
                sub: "We deliver, and we stay.",
                desc: "Build, iterate, and support at scale. One team from first brief to last line of code — with full accountability, not handoffs.",
            },
        ],
    },
    products: {
        label: "Our Products",
        headingLine1: "Platforms Built From",
        headingLine2: "Real Experience.",
        items: [
            {
                num: "Product 001",
                nameLine1: "Webcraft",
                nameLine2: "HRMS.",
                summary:
                    "Complete HR management — attendance, leave, payroll, self-service portal, and role-based security. Flat ₹2,999/mo server cost, no per-user fees. Built for mid-size teams who need enterprise features without enterprise budgets.",
                meta: [
                    { label: "Category", value: "Enterprise HR" },
                    { label: "Users", value: "500+ companies" },
                    { label: "Pricing", value: "₹2,999/mo flat" },
                ],
                buttonText: "Learn more →",
                buttonUrl: "/products",
            },
            {
                num: "Product 002",
                nameLine1: "Tutor",
                nameLine2: "Wand.",
                summary:
                    "AI-powered adaptive test prep for SAT, GRE, and more. 40K+ students, 2.7K+ teachers, 5000+ questions, and white-label options for institutes. The AI adjusts difficulty in real-time to each learner's pace.",
                meta: [
                    { label: "Category", value: "Ed-Tech · AI" },
                    { label: "Reach", value: "40K+ students" },
                    { label: "Questions", value: "5,000+ bank" },
                ],
                buttonText: "Learn more →",
                buttonUrl: "/products",
            },
            {
                num: "Product 003",
                nameLine1: "WCSchool",
                nameLine2: "ERP.",
                summary:
                    "School management platform — fees, schedules, exams, parent monitoring, and seamless communication between schools, parents, and students. One dashboard for the entire institution.",
                meta: [
                    { label: "Category", value: "School Mgmt" },
                    { label: "Modules", value: "12+ integrated" },
                    { label: "Users", value: "Schools · Parents" },
                ],
                buttonText: "Learn more →",
                buttonUrl: "/products",
            },
        ],
    },
    aiStack: {
        label: "AI Solutions",
        headingLine1: "The future belongs to businesses",
        headingLine2: "that know before they act",
        description:
            "AI without research is noise. Research without AI is slow. Webcraft combines both — giving you the speed of intelligent automation and the confidence of informed strategy.",
        cards: [
            {
                num: "01",
                title: "Predictive Analytics",
                description:
                    "Surface patterns in your data before they become problems — or opportunities — for your competitors. We build models that turn raw signals into actionable forecasts.",
            },
            {
                num: "02",
                title: "Primary Research",
                description:
                    "Face-to-face interviews, focus groups, and quantitative studies. We collect the data your strategy deserves — then structure it for AI-ready decision-making.",
            },
            {
                num: "03",
                title: "Automation at Scale",
                description:
                    "No-code RPA and conversational AI deployed across real workflows — cutting cost and accelerating timelines without replacing the teams who know the work best.",
            },
            {
                num: "04",
                title: "LLM & Gen AI",
                description:
                    "Generative AI integrated into your products and processes — with proprietary data reliability, guardrails, and enterprise-grade security baked in from day one.",
            },
            {
                num: "05",
                title: "Market Intelligence",
                description:
                    "Competitive landscapes and market analysis that back acquisition decisions before senior sign-off. Real intelligence, not recycled desk research.",
            },
            {
                num: "06",
                title: "AI Security & MLOps",
                description:
                    "Fraud detection, predictive maintenance, and supply-chain optimisation — AI that processes and performs at scale with full auditability and compliance.",
            },
        ],
        buttonText: "See All AI Solutions",
        buttonUrl: "/ai-solutions",
    },
    ctaSection: {
        label: "Start A Conversation",
        headingLine1: "Ready to make",
        headingLine2: "smarter decisions?",
        description:
            "Whether you need AI strategy, market research, product development, or digital engineering — start with a conversation.",
        buttonText: "Book a Consultation →",
        buttonUrl: "/contact",
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
            "whyWebcraft",
            "approach",
            "products",
            "aiStack",
            "ctaSection",
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
