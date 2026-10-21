
import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
    {
        heroChip: {
            type: String,
            default: "AI-Led · Research-Backed · Delivery-Ready",
        },
        headingLine1: {
            type: String,
            default: "Smarter Decisions.",
        },
        headingLine2: {
            type: String,
            default: "Stronger Products.",
        },
        description: {
            type: String,
            default:
                "Webcraft combines AI solutions and deep research with proven engineering to help you decide what to build, then build it right.",
        },
        button1Text: {
            type: String,
            default: "Explore AI Solutions",
        },
        button1Url: {
            type: String,
            default: "/ai-solutions",
        },
        button2Text: {
            type: String,
            default: "See Research Capabilities",
        },
        button2Url: {
            type: String,
            default: "/research",
        },
        beliefLabel: {
            type: String,
            default: "Our Belief",
        },
        beliefHeading: {
            type: String,
            default: "We listen before we propose. We prototype before we commit.",
        },
        beliefDescription: {
            type: String,
            default:
                "We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 — and kept our clients with us long after the first engagement ended.",
        },

        whatWeDo: {
            label: {
                type: String,
                default: "WHAT WE DO",
            },
            heading: {
                type: String,
                default: "Four Capabilities, One Partner",
            },
            description: {
                type: String,
                default:
                    "We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together.",
            },
            services: {
                type: [
                    {
                        title: { type: String, default: "" },
                        description: { type: String, default: "" },
                        buttonText: { type: String, default: "Learn More" },
                        buttonUrl: { type: String, default: "/" },
                    },
                ],
                default: [
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
        },
        stats: {
            type: [
                {
                    value: { type: Number, default: 0 },
                    suffix: { type: String, default: "+" },
                    label: { type: String, default: "" },
                },
            ],
            default: [
                { value: 17, suffix: "+", label: "Years Established" },
                { value: 3000, suffix: "+", label: "Clients Served" },
                { value: 230, suffix: "+", label: "Professionals" },
                { value: 96, suffix: "%", label: "Client Retention" },
            ],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Home", homeSchema);
