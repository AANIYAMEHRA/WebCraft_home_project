
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
        whyWebcraft: {
            label: {
                type: String,
                default: "The Difference",
            },
            heading: {
                type: String,
                default: "Why serious businesses choose Webcraft",
            },
            description: {
                type: String,
                default:
                    "Most technology partners start with a scope document. We start with the right questions. Webcraft combines research rigour with engineering depth so that what gets built actually solves the problem it was designed for.",
            },
            image: {
                type: String,
                default: "/images/why.webp",
            },
            cards: {
                type: [
                    {
                        title: { type: String, default: "" },
                        description: { type: String, default: "" },
                    },
                ],
                default: [
                    {
                        title: "Research-backed decisions",
                        description:
                            "We validate assumptions with data before committing resources to build.",
                    },
                    {
                        title: "AI with delivery realism",
                        description:
                            "Practical AI implementations grounded in real business constraints and ROI.",
                    },
                    {
                        title: "Product thinking",
                        description:
                            "We approach projects as products — with user value, scalability, and lifecycle in mind.",
                    },
                    {
                        title: "Long-term partnership",
                        description:
                            "96% client retention built on reliable delivery, transparent communication, and ongoing support.",
                    },
                ],
            },
        },
        approach: {
            label: {
                type: String,
                default: "Our Approach",
            },
            heading: {
                type: String,
                default: "We don't start with code.",
            },
            introDescription: {
                type: String,
                default:
                    "Every engagement begins with understanding. Through structured research, market analysis, and technology assessment, we help you define the right problem — then design and build the right solution.",
            },
            steps: {
                type: [
                    {
                        num: { type: String, default: "" },
                        title: { type: String, default: "" },
                        card: { type: String, default: "" },
                        sub: { type: String, default: "" },
                        desc: { type: String, default: "" },
                    },
                ],
                default: [
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
        },
        products: {
            label: {
                type: String,
                default: "Our Products",
            },
            headingLine1: {
                type: String,
                default: "Platforms Built From",
            },
            headingLine2: {
                type: String,
                default: "Real Experience.",
            },
            items: {
                type: [
                    {
                        num: { type: String, default: "" },
                        nameLine1: { type: String, default: "" },
                        nameLine2: { type: String, default: "" },
                        summary: { type: String, default: "" },
                        meta: {
                            type: [
                                {
                                    label: { type: String, default: "" },
                                    value: { type: String, default: "" },
                                },
                            ],
                            default: [],
                        },
                        buttonText: {
                            type: String,
                            default: "Learn more →",
                        },
                        buttonUrl: {
                            type: String,
                            default: "/products",
                        },
                    },
                ],
                default: [
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
        },
        aiStack: {
            label: {
                type: String,
                default: "AI Solutions",
            },
            headingLine1: {
                type: String,
                default: "The future belongs to businesses",
            },
            headingLine2: {
                type: String,
                default: "that know before they act",
            },
            description: {
                type: String,
                default:
                    "AI without research is noise. Research without AI is slow. Webcraft combines both — giving you the speed of intelligent automation and the confidence of informed strategy.",
            },
            cards: {
                type: [
                    {
                        num: { type: String, default: "" },
                        title: { type: String, default: "" },
                        description: { type: String, default: "" },
                    },
                ],
                default: [
                    {
                        num: "01",
                        title: "Predictive Analytics",
                        description: "Surface patterns in your data before they become problems — or opportunities — for your competitors. We build models that turn raw signals into actionable forecasts.",
                    },
                    {
                        num: "02",
                        title: "Primary Research",
                        description: "Face-to-face interviews, focus groups, and quantitative studies. We collect the data your strategy deserves — then structure it for AI-ready decision-making.",
                    },
                    {
                        num: "03",
                        title: "Automation at Scale",
                        description: "No-code RPA and conversational AI deployed across real workflows — cutting cost and accelerating timelines without replacing the teams who know the work best.",
                    },
                    {
                        num: "04",
                        title: "LLM & Gen AI",
                        description: "Generative AI integrated into your products and processes — with proprietary data reliability, guardrails, and enterprise-grade security baked in from day one.",
                    },
                    {
                        num: "05",
                        title: "Market Intelligence",
                        description: "Competitive landscapes and market analysis that back acquisition decisions before senior sign-off. Real intelligence, not recycled desk research.",
                    },
                    {
                        num: "06",
                        title: "AI Security & MLOps",
                        description: "Fraud detection, predictive maintenance, and supply-chain optimisation — AI that processes and performs at scale with full auditability and compliance.",
                    },
                ],
            },
            buttonText: {
                type: String,
                default: "See All AI Solutions",
            },
            buttonUrl: {
                type: String,
                default: "/ai-solutions",
            },
        },
        ctaSection: {
            label: {
                type: String,
                default: "Start A Conversation",
            },
            headingLine1: {
                type: String,
                default: "Ready to make",
            },
            headingLine2: {
                type: String,
                default: "smarter decisions?",
            },
            description: {
                type: String,
                default:
                    "Whether you need AI strategy, market research, product development, or digital engineering — start with a conversation.",
            },
            buttonText: {
                type: String,
                default: "Book a Consultation →",
            },
            buttonUrl: {
                type: String,
                default: "/contact",
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
