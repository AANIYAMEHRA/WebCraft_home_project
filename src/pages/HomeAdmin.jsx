import { useEffect, useState } from "react";
 
const API = "http://localhost:5000/api/home";
 
// Colors and fonts taken from the live Webcraft-IT site.
const COLORS = {
    navy: "#102b52",      // headings (hero "Smarter Decisions.")
    text: "#253144",      // labels, inputs, body text
    muted: "#5b6878",     // subtitle and helper copy
    green: "#2aa27c",
    teal: "#1f8a86",
    blue: "#1b6f8c",      // gradient start (hero "Stronger Products.")
    border: "#d7ebe4",
    bg: "#f4faf8",
};
 
const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
 
// Heading scale, largest to smallest (priority order).
const SIZE = {
    h1: "65px",       // page title   — "Home Page CMS"
    h2: "35px",       // section title — "Hero Content", "What We Do Section"
    h3: "24px",       // item title   — "Service 1", "Card 1"
    subtitle: "22px", // intro line under the title
    label: "18px",    // field labels
    body: "18px",     // inputs, buttons, messages
};
 
const DEFAULT_SERVICES = [
    {
        title: "AI Solutions",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/ai-solutions",
    },
    {
        title: "Research",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/research",
    },
    {
        title: "Products",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/products",
    },
    {
        title: "Engineering Services",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/services",
    },
];
 
const DEFAULT_WHAT_WE_DO = {
    label: "WHAT WE DO",
    heading: "Four Capabilities, One Partner",
    description:
        "We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together.",
    services: DEFAULT_SERVICES,
};
const DEFAULT_WHY_WEBCRAFT = {
    label: "The Difference",
    heading: "Why serious businesses choose Webcraft",
    description:
        "Most technology partners start with a scope document. We start with the right questions. Webcraft combines research rigour with engineering depth so that what gets built actually solves the problem it was designed for.",
    image: "/images/why.webp",
    cards: [
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
};
const DEFAULT_APPROACH = {
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
};
 
const DEFAULT_PRODUCTS = {
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
};
const DEFAULT_AI_STACK = {
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
};
const DEFAULT_CTA_SECTION = {
    label: "Start A Conversation",
    headingLine1: "Ready to make",
    headingLine2: "smarter decisions?",
    description:
        "Whether you need AI strategy, market research, product development, or digital engineering — start with a conversation.",
    buttonText: "Book a Consultation →",
    buttonUrl: "/contact",
};
 
// Shared styles, used by every section below.
const pageStyle = {
    backgroundColor: COLORS.bg,
    backgroundImage: [
        "radial-gradient(circle at 0% 0%, rgba(42,162,124,0.10), transparent 40%)",
        "linear-gradient(rgba(15,36,64,0.035) 1px, transparent 1px)",
        "linear-gradient(90deg, rgba(15,36,64,0.035) 1px, transparent 1px)",
    ].join(", "),
    backgroundSize: "auto, 56px 56px, 56px 56px",
    fontFamily: FONT_BODY,
    color: COLORS.text,
};
 
const headingStyle = { fontFamily: FONT_HEADING, color: COLORS.navy };
 
// Gradient text for "CMS". inline-block gives the gradient a box that covers the glyphs,
// and WebkitTextFillColor stops the text color from hiding the gradient.
const gradientTextStyle = {
    display: "inline-block",
    lineHeight: 1.15,
    paddingBottom: "0.1em",
    backgroundImage: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
};
 
const cardStyle = {
    backgroundColor: "#ffffff",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 10px 30px -15px rgba(15,36,64,0.15)",
};
 
const itemStyle = {
    backgroundColor: "#fbfdfc",
    border: `1px solid ${COLORS.border}`,
};
 
const labelStyle = { color: COLORS.text, fontSize: SIZE.label };
 
const inputClass =
    "w-full rounded-xl border bg-white px-4 py-3 outline-none transition placeholder:text-[#8a9aa9] focus:border-[#2aa27c] focus:ring-4 focus:ring-[#2aa27c]/20";
const inputStyle = {
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: SIZE.body,
};
 
const primaryButtonStyle = {
    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`,
    boxShadow: "0 8px 20px -8px rgba(31,138,134,0.55)",
    color: "#ffffff",
};
 
const outlineButtonStyle = {
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: SIZE.body,
};
 
export default function HomeAdmin() {
    const [form, setForm] = useState({
        heroChip: "",
        headingLine1: "",
        headingLine2: "",
        description: "",
        button1Text: "",
        button1Url: "",
        button2Text: "",
        button2Url: "",
        beliefLabel: "Our Belief",
        beliefHeading: "",
        beliefDescription: "",
        stats: [],
        whatWeDo: DEFAULT_WHAT_WE_DO,
        whyWebcraft: DEFAULT_WHY_WEBCRAFT,
        approach: DEFAULT_APPROACH,
        products: DEFAULT_PRODUCTS,
        aiStack: DEFAULT_AI_STACK,
        ctaSection: DEFAULT_CTA_SECTION,
    });
 
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
 
    useEffect(() => {
        async function loadHome() {
            try {
                const response = await fetch(API);
 
                if (!response.ok) {
                    throw new Error("Failed to load Home content");
                }
 
                const data = await response.json();
 
                setForm({
                    heroChip: data.heroChip ?? "",
                    headingLine1: data.headingLine1 ?? "",
                    headingLine2: data.headingLine2 ?? "",
                    description: data.description ?? "",
                    button1Text: data.button1Text ?? "",
                    button1Url: data.button1Url ?? "",
                    button2Text: data.button2Text ?? "",
                    button2Url: data.button2Url ?? "",
 
                    beliefLabel: data.beliefLabel ?? "Our Belief",
                    beliefHeading:
                        data.beliefHeading ??
                        "We listen before we propose. We prototype before we commit.",
                    beliefDescription:
                        data.beliefDescription ??
                        "We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 — and kept our clients with us long after the first engagement ended.",
 
                    stats: Array.isArray(data.stats) ? data.stats : [],
 
                    whatWeDo: {
                        label:
                            data.whatWeDo?.label ??
                            DEFAULT_WHAT_WE_DO.label,
                        heading:
                            data.whatWeDo?.heading ??
                            DEFAULT_WHAT_WE_DO.heading,
                        description:
                            data.whatWeDo?.description ??
                            DEFAULT_WHAT_WE_DO.description,
                        services:
                            Array.isArray(data.whatWeDo?.services) &&
                                data.whatWeDo.services.length > 0
                                ? data.whatWeDo.services.map((service) => ({
                                    title: service.title ?? "",
                                    description:
                                        service.description ?? "",
                                    buttonText:
                                        service.buttonText ?? "Learn More",
                                    buttonUrl: service.buttonUrl ?? "",
                                }))
                                : DEFAULT_SERVICES.map((service) => ({
                                    ...service,
                                })),
                    },
 
                    whyWebcraft: {
                        label:
                            data.whyWebcraft?.label ??
                            DEFAULT_WHY_WEBCRAFT.label,
                        heading:
                            data.whyWebcraft?.heading ??
                            DEFAULT_WHY_WEBCRAFT.heading,
                        description:
                            data.whyWebcraft?.description ??
                            DEFAULT_WHY_WEBCRAFT.description,
                        image:
                            data.whyWebcraft?.image ??
                            DEFAULT_WHY_WEBCRAFT.image,
                        cards:
                            Array.isArray(data.whyWebcraft?.cards) &&
                                data.whyWebcraft.cards.length > 0
                                ? data.whyWebcraft.cards.map((card) => ({
                                    title: card.title ?? "",
                                    description: card.description ?? "",
                                }))
                                : DEFAULT_WHY_WEBCRAFT.cards.map((card) => ({
                                    ...card,
                                })),
                    },
 
                    approach: {
                        label:
                            data.approach?.label ??
                            DEFAULT_APPROACH.label,
                        heading:
                            data.approach?.heading ??
                            DEFAULT_APPROACH.heading,
                        introDescription:
                            data.approach?.introDescription ??
                            DEFAULT_APPROACH.introDescription,
                        steps: DEFAULT_APPROACH.steps.map(
                            (defaultStep, index) => ({
                                ...defaultStep,
                                ...(data.approach?.steps?.[index] || {}),
                            })
                        ),
                    },
 
                    products: {
                        label: data.products?.label ?? DEFAULT_PRODUCTS.label,
                        headingLine1:
                            data.products?.headingLine1 ?? DEFAULT_PRODUCTS.headingLine1,
                        headingLine2:
                            data.products?.headingLine2 ?? DEFAULT_PRODUCTS.headingLine2,
                        items:
                            Array.isArray(data.products?.items) &&
                                data.products.items.length > 0
                                ? data.products.items.map((product, index) => ({
                                    ...DEFAULT_PRODUCTS.items[index % DEFAULT_PRODUCTS.items.length],
                                    ...product,
                                    meta: Array.isArray(product.meta)
                                        ? product.meta
                                        : DEFAULT_PRODUCTS.items[index % DEFAULT_PRODUCTS.items.length].meta,
                                }))
                                : DEFAULT_PRODUCTS.items.map((product) => ({
                                    ...product,
                                    meta: product.meta.map((item) => ({ ...item })),
                                })),
                    },
 
                    aiStack: {
                        ...DEFAULT_AI_STACK,
                        ...(data.aiStack || {}),
                        cards:
                            Array.isArray(data.aiStack?.cards) &&
                                data.aiStack.cards.length > 0
                                ? data.aiStack.cards.map((card, index) => ({
                                    ...DEFAULT_AI_STACK.cards[
                                    index % DEFAULT_AI_STACK.cards.length
                                    ],
                                    ...card,
                                }))
                                : DEFAULT_AI_STACK.cards.map((card) => ({
                                    ...card,
                                })),
                    },
 
                    ctaSection: {
                        ...DEFAULT_CTA_SECTION,
                        ...(data.ctaSection || {}),
                    },
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
 
        loadHome();
    }, []);
 
    function handleChange(event) {
        const { name, value } = event.target;
 
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }
 
    function handleStatChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            stats: previous.stats.map((stat, i) =>
                i === index
                    ? { ...stat, [field]: value }
                    : stat
            ),
        }));
    }
 
    function handleWhatWeDoChange(field, value) {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                [field]: value,
            },
        }));
    }
 
    function handleWhyWebcraftChange(field, value) {
        setForm((previous) => ({
            ...previous,
            whyWebcraft: {
                ...previous.whyWebcraft,
                [field]: value,
            },
        }));
    }
 
    function handleWhyWebcraftCardChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            whyWebcraft: {
                ...previous.whyWebcraft,
                cards: previous.whyWebcraft.cards.map((card, i) =>
                    i === index
                        ? { ...card, [field]: value }
                        : card
                ),
            },
        }));
    }
 
    function handleApproachChange(field, value) {
        setForm((previous) => ({
            ...previous,
            approach: {
                ...previous.approach,
                [field]: value,
            },
        }));
    }
 
    function handleApproachStepChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            approach: {
                ...previous.approach,
                steps: previous.approach.steps.map((step, i) =>
                    i === index
                        ? { ...step, [field]: value }
                        : step
                ),
            },
        }));
    }
 
    function handleProductsChange(field, value) {
        setForm((previous) => ({
            ...previous,
            products: {
                ...previous.products,
                [field]: value,
            },
        }));
    }
 
    function handleAiStackChange(field, value) {
        setForm((previous) => ({
            ...previous,
            aiStack: {
                ...previous.aiStack,
                [field]: value,
            },
        }));
    }
 
    function handleCtaSectionChange(field, value) {
        setForm((previous) => ({
            ...previous,
            ctaSection: {
                ...previous.ctaSection,
                [field]: value,
            },
        }));
    }
 
    function handleAiStackCardChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            aiStack: {
                ...previous.aiStack,
                cards: previous.aiStack.cards.map((card, i) =>
                    i === index
                        ? { ...card, [field]: value }
                        : card
                ),
            },
        }));
    }
 
    function handleProductItemChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            products: {
                ...previous.products,
                items: previous.products.items.map((product, i) =>
                    i === index
                        ? { ...product, [field]: value }
                        : product
                ),
            },
        }));
    }
 
    function handleProductMetaChange(productIndex, metaIndex, field, value) {
        setForm((previous) => ({
            ...previous,
            products: {
                ...previous.products,
                items: previous.products.items.map((product, i) =>
                    i === productIndex
                        ? {
                            ...product,
                            meta: product.meta.map((item, j) =>
                                j === metaIndex
                                    ? { ...item, [field]: value }
                                    : item
                            ),
                        }
                        : product
                ),
            },
        }));
    }
 
    function handleServiceChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: previous.whatWeDo.services.map(
                    (service, i) =>
                        i === index
                            ? { ...service, [field]: value }
                            : service
                ),
            },
        }));
    }
 
    function addService() {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: [
                    ...previous.whatWeDo.services,
                    {
                        title: "",
                        description: "",
                        buttonText: "Learn More",
                        buttonUrl: "",
                    },
                ],
            },
        }));
    }
 
    function removeService(index) {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: previous.whatWeDo.services.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    }
 
    async function handleSubmit(event) {
        event.preventDefault();
 
        setSaving(true);
        setMessage("");
        setError("");
 
        try {
            const response = await fetch(API, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save Home content"
                );
            }
 
            // Refresh the form using the saved response.
            const savedHome = data.home || data;
 
            setForm((previous) => ({
                ...previous,
                ...savedHome,
 
                whatWeDo: {
                    ...previous.whatWeDo,
                    ...(savedHome.whatWeDo || {}),
                    services:
                        savedHome.whatWeDo?.services ??
                        previous.whatWeDo.services,
                },
 
                whyWebcraft: {
                    ...previous.whyWebcraft,
                    ...(savedHome.whyWebcraft || {}),
                    cards:
                        savedHome.whyWebcraft?.cards ??
                        previous.whyWebcraft.cards,
                },
 
                approach: {
                    ...previous.approach,
                    ...(savedHome.approach || {}),
                    steps:
                        savedHome.approach?.steps ??
                        previous.approach.steps,
                },
            }));
 
            setMessage("Home content updated successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }
 
    if (loading) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading Home CMS...
            </p>
        );
    }
 
    return (
        <main className="min-h-screen px-6 py-16" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <h1
                    className="mb-5 font-bold leading-[0.95] tracking-tight"
                    style={{ ...headingStyle, fontSize: SIZE.h1 }}
                >
                    Home Page <span style={gradientTextStyle}>CMS</span>
                </h1>
 
                <p
                    className="mb-14"
                    style={{ color: COLORS.muted, fontSize: SIZE.subtitle }}
                >
                    Edit your Home page content from one place.
                </p>
 
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO CONTENT */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Hero Content
                        </h2>
 
                        {[
                            ["heroChip", "Small Label"],
                            ["headingLine1", "Heading Line 1"],
                            ["headingLine2", "Heading Line 2"],
                            ["description", "Description"],
                            ["button1Text", "First Button Text"],
                            ["button1Url", "First Button URL"],
                            ["button2Text", "Second Button Text"],
                            ["button2Url", "Second Button URL"],
                            ["beliefLabel", "Belief - Small Label"],
                            ["beliefHeading", "Belief - Heading"],
                            [
                                "beliefDescription",
                                "Belief - Description",
                            ],
                        ].map(([name, label]) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="mb-2 block font-semibold"
                                    style={labelStyle}
                                >
                                    {label}
                                </label>
 
                                {[
                                    "description",
                                    "beliefDescription",
                                ].includes(name) ? (
                                    <textarea
                                        id={name}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`${inputClass} resize-y`}
                                        style={inputStyle}
                                    />
                                ) : (
                                    <input
                                        id={name}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                )}
                            </div>
                        ))}
                    </section>
 
                    {/* HERO STATISTICS */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Hero Statistics
                        </h2>
 
                        {form.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 gap-4 border-b pb-6 sm:grid-cols-3"
                                style={{ borderColor: COLORS.border }}
                            >
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Value
                                    </label>
                                    <input
                                        type="number"
                                        value={stat.value ?? ""}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Suffix
                                    </label>
                                    <input
                                        value={stat.suffix ?? ""}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "suffix",
                                                e.target.value
                                            )
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Label
                                    </label>
                                    <input
                                        value={stat.label ?? ""}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "label",
                                                e.target.value
                                            )
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
 
                    {/* WHAT WE DO SECTION */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            What We Do Section
                        </h2>
 
                        <div>
                            <label htmlFor="whatWeDoLabel" className="mb-2 block font-semibold" style={labelStyle}>
                                Section Label
                            </label>
 
                            <input
                                id="whatWeDoLabel"
                                value={form.whatWeDo.label}
                                onChange={(e) =>
                                    handleWhatWeDoChange("label", e.target.value)
                                }
                                placeholder="WHAT WE DO"
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label htmlFor="whatWeDoHeading" className="mb-2 block font-semibold" style={labelStyle}>
                                Main Heading
                            </label>
 
                            <input
                                id="whatWeDoHeading"
                                value={form.whatWeDo.heading}
                                onChange={(e) =>
                                    handleWhatWeDoChange("heading", e.target.value)
                                }
                                placeholder="Four Capabilities, One Partner"
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label htmlFor="whatWeDoDescription" className="mb-2 block font-semibold" style={labelStyle}>
                                Section Description
                            </label>
 
                            <textarea
                                id="whatWeDoDescription"
                                value={form.whatWeDo.description}
                                onChange={(e) =>
                                    handleWhatWeDoChange("description", e.target.value)
                                }
                                rows={4}
                                placeholder="We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together."
                                className={`${inputClass} resize-y`}
                                style={inputStyle}
                            />
                        </div>
 
                        {/* SERVICE CARDS */}
                        <div className="space-y-5">
                            <h3
                                className="font-bold"
                                style={{ ...headingStyle, fontSize: SIZE.h3 }}
                            >
                                Service Cards ({form.whatWeDo.services.length})
                            </h3>
 
                            {form.whatWeDo.services.map((service, index) => (
                                <div
                                    key={index}
                                    className="space-y-5 rounded-2xl p-6"
                                    style={itemStyle}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <h4
                                            className="font-bold"
                                            style={{ ...headingStyle, fontSize: SIZE.label }}
                                        >
                                            Service {index + 1}
                                        </h4>
 
                                        <button
                                            type="button"
                                            onClick={() => removeService(index)}
                                            className="rounded-full border bg-white px-5 py-2.5 font-semibold transition hover:border-red-300 hover:text-red-600"
                                            style={outlineButtonStyle}
                                        >
                                            Remove
                                        </button>
                                    </div>
 
                                    <div>
                                        <label htmlFor={`serviceTitle-${index}`} className="mb-2 block font-semibold" style={labelStyle}>
                                            Service Title
                                        </label>
 
                                        <input
                                            id={`serviceTitle-${index}`}
                                            value={service.title}
                                            onChange={(e) =>
                                                handleServiceChange(index, "title", e.target.value)
                                            }
                                            placeholder="Service title"
                                            className={inputClass}
                                            style={inputStyle}
                                        />
                                    </div>
 
                                    <div>
                                        <label htmlFor={`serviceDescription-${index}`} className="mb-2 block font-semibold" style={labelStyle}>
                                            Service Description
                                        </label>
 
                                        <textarea
                                            id={`serviceDescription-${index}`}
                                            value={service.description}
                                            onChange={(e) =>
                                                handleServiceChange(index, "description", e.target.value)
                                            }
                                            rows={3}
                                            placeholder="Enter the original service description"
                                            className={`${inputClass} resize-y`}
                                            style={inputStyle}
                                        />
                                    </div>
 
                                    <div>
                                        <label htmlFor={`serviceButtonText-${index}`} className="mb-2 block font-semibold" style={labelStyle}>
                                            Button Text
                                        </label>
 
                                        <input
                                            id={`serviceButtonText-${index}`}
                                            value={service.buttonText}
                                            onChange={(e) =>
                                                handleServiceChange(index, "buttonText", e.target.value)
                                            }
                                            placeholder="Learn More"
                                            className={inputClass}
                                            style={inputStyle}
                                        />
                                    </div>
 
                                    <div>
                                        <label htmlFor={`serviceButtonUrl-${index}`} className="mb-2 block font-semibold" style={labelStyle}>
                                            Button URL
                                        </label>
 
                                        <input
                                            id={`serviceButtonUrl-${index}`}
                                            value={service.buttonUrl}
                                            onChange={(e) =>
                                                handleServiceChange(index, "buttonUrl", e.target.value)
                                            }
                                            placeholder="/services"
                                            className={inputClass}
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>
                            ))}
 
                            <button
                                type="button"
                                onClick={addService}
                                className="rounded-full border bg-white px-6 py-3 font-semibold transition hover:border-[#2aa27c] hover:text-[#1f8a86]"
                                style={outlineButtonStyle}
                            >
                                + Add Service
                            </button>
                        </div>
                    </section>
 
                    {/* WHY WEBCRAFT SECTION */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Why Webcraft Section
                        </h2>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Section Label
                            </label>
                            <input
                                value={form.whyWebcraft.label}
                                onChange={(e) =>
                                    handleWhyWebcraftChange("label", e.target.value)
                                }
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Heading
                            </label>
                            <input
                                value={form.whyWebcraft.heading}
                                onChange={(e) =>
                                    handleWhyWebcraftChange("heading", e.target.value)
                                }
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Description
                            </label>
                            <textarea
                                rows={5}
                                value={form.whyWebcraft.description}
                                onChange={(e) =>
                                    handleWhyWebcraftChange("description", e.target.value)
                                }
                                className={`${inputClass} resize-y`}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Image Path
                            </label>
                            <input
                                value={form.whyWebcraft.image}
                                onChange={(e) =>
                                    handleWhyWebcraftChange("image", e.target.value)
                                }
                                placeholder="/images/why.webp"
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div className="space-y-5">
                            <h3
                                className="font-bold"
                                style={{ ...headingStyle, fontSize: SIZE.h3 }}
                            >
                                Feature Cards
                            </h3>
 
                            {form.whyWebcraft.cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="space-y-5 rounded-2xl p-6"
                                    style={itemStyle}
                                >
                                    <h4
                                        className="font-bold"
                                        style={{ ...headingStyle, fontSize: SIZE.label }}
                                    >
                                        Card {index + 1}
                                    </h4>
 
                                    <div>
                                        <label className="mb-2 block font-semibold" style={labelStyle}>
                                            Card Title
                                        </label>
                                        <input
                                            value={card.title}
                                            onChange={(e) =>
                                                handleWhyWebcraftCardChange(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className={inputClass}
                                            style={inputStyle}
                                        />
                                    </div>
 
                                    <div>
                                        <label className="mb-2 block font-semibold" style={labelStyle}>
                                            Card Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={card.description}
                                            onChange={(e) =>
                                                handleWhyWebcraftCardChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className={`${inputClass} resize-y`}
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
 
                    {/* APPROACH SECTION */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Our Approach Section
                        </h2>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Section Label
                            </label>
                            <input
                                value={form.approach.label}
                                onChange={(e) =>
                                    handleApproachChange("label", e.target.value)
                                }
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Main Heading
                            </label>
                            <input
                                value={form.approach.heading}
                                onChange={(e) =>
                                    handleApproachChange("heading", e.target.value)
                                }
                                className={inputClass}
                                style={inputStyle}
                            />
                        </div>
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Intro Description
                            </label>
                            <textarea
                                rows={4}
                                value={form.approach.introDescription}
                                onChange={(e) =>
                                    handleApproachChange("introDescription", e.target.value)
                                }
                                className={`${inputClass} resize-y`}
                                style={inputStyle}
                            />
                        </div>
 
                        {form.approach.steps.map((step, index) => (
                            <div
                                key={step.num || index}
                                className="space-y-5 rounded-2xl p-6"
                                style={itemStyle}
                            >
                                <h3
                                    className="font-bold"
                                    style={{ ...headingStyle, fontSize: SIZE.h3 }}
                                >
                                    Step {index + 1}
                                </h3>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Step Number
                                    </label>
                                    <input
                                        value={step.num}
                                        onChange={(e) =>
                                            handleApproachStepChange(index, "num", e.target.value)
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Step Title
                                    </label>
                                    <input
                                        value={step.title}
                                        onChange={(e) =>
                                            handleApproachStepChange(index, "title", e.target.value)
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Card Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={step.card}
                                        onChange={(e) =>
                                            handleApproachStepChange(index, "card", e.target.value)
                                        }
                                        className={`${inputClass} resize-y`}
                                        style={inputStyle}
                                    />
                                </div>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Highlight Text
                                    </label>
                                    <input
                                        value={step.sub}
                                        onChange={(e) =>
                                            handleApproachStepChange(index, "sub", e.target.value)
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Step Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={step.desc}
                                        onChange={(e) =>
                                            handleApproachStepChange(index, "desc", e.target.value)
                                        }
                                        className={`${inputClass} resize-y`}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
 
                    {/* PRODUCTS SECTION */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Products Section
                        </h2>
 
                        {[
                            ["label", "Section Label"],
                            ["headingLine1", "Heading Line 1"],
                            ["headingLine2", "Heading Line 2"],
                        ].map(([field, label]) => (
                            <div key={field}>
                                <label className="mb-2 block font-semibold" style={labelStyle}>
                                    {label}
                                </label>
                                <input
                                    value={form.products[field]}
                                    onChange={(e) =>
                                        handleProductsChange(field, e.target.value)
                                    }
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
 
                        {form.products.items.map((product, index) => (
                            <div
                                key={index}
                                className="space-y-5 rounded-2xl p-6"
                                style={itemStyle}
                            >
                                <h3
                                    className="font-bold"
                                    style={{ ...headingStyle, fontSize: SIZE.h3 }}
                                >
                                    Product {index + 1}
                                </h3>
 
                                {[
                                    ["num", "Product Number"],
                                    ["nameLine1", "Name Line 1"],
                                    ["nameLine2", "Name Line 2"],
                                    ["summary", "Description"],
                                    ["buttonText", "Button Text"],
                                    ["buttonUrl", "Button URL"],
                                ].map(([field, label]) => (
                                    <div key={field}>
                                        <label className="mb-2 block font-semibold" style={labelStyle}>
                                            {label}
                                        </label>
 
                                        {field === "summary" ? (
                                            <textarea
                                                rows={4}
                                                value={product[field] ?? ""}
                                                onChange={(e) =>
                                                    handleProductItemChange(
                                                        index,
                                                        field,
                                                        e.target.value
                                                    )
                                                }
                                                className={`${inputClass} resize-y`}
                                                style={inputStyle}
                                            />
                                        ) : (
                                            <input
                                                value={product[field] ?? ""}
                                                onChange={(e) =>
                                                    handleProductItemChange(
                                                        index,
                                                        field,
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                                style={inputStyle}
                                            />
                                        )}
                                    </div>
                                ))}
 
                                <h4
                                    className="font-bold"
                                    style={{ ...headingStyle, fontSize: SIZE.label }}
                                >
                                    Product Details
                                </h4>
 
                                {product.meta.map((item, metaIndex) => (
                                    <div
                                        key={metaIndex}
                                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                                    >
                                        <div>
                                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                                Detail Label {metaIndex + 1}
                                            </label>
                                            <input
                                                value={item.label ?? ""}
                                                onChange={(e) =>
                                                    handleProductMetaChange(
                                                        index,
                                                        metaIndex,
                                                        "label",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                                style={inputStyle}
                                            />
                                        </div>
 
                                        <div>
                                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                                Detail Value {metaIndex + 1}
                                            </label>
                                            <input
                                                value={item.value ?? ""}
                                                onChange={(e) =>
                                                    handleProductMetaChange(
                                                        index,
                                                        metaIndex,
                                                        "value",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
 
                    {/* AI STACK SECTION */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            AI Stack Section
                        </h2>
 
                        {[
                            ["label", "Section Label"],
                            ["headingLine1", "Heading Line 1"],
                            ["headingLine2", "Heading Line 2"],
                            ["buttonText", "Button Text"],
                            ["buttonUrl", "Button URL"],
                        ].map(([field, label]) => (
                            <div key={field}>
                                <label className="mb-2 block font-semibold" style={labelStyle}>
                                    {label}
                                </label>
                                <input
                                    value={form.aiStack[field] ?? ""}
                                    onChange={(e) =>
                                        handleAiStackChange(field, e.target.value)
                                    }
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Section Description
                            </label>
                            <textarea
                                rows={4}
                                value={form.aiStack.description ?? ""}
                                onChange={(e) =>
                                    handleAiStackChange("description", e.target.value)
                                }
                                className={`${inputClass} resize-y`}
                                style={inputStyle}
                            />
                        </div>
 
                        <h3
                            className="font-bold"
                            style={{ ...headingStyle, fontSize: SIZE.h3 }}
                        >
                            AI Solution Cards
                        </h3>
 
                        {form.aiStack.cards.map((card, index) => (
                            <div
                                key={index}
                                className="space-y-5 rounded-2xl p-6"
                                style={itemStyle}
                            >
                                <h4
                                    className="font-bold"
                                    style={{ ...headingStyle, fontSize: SIZE.label }}
                                >
                                    Card {index + 1}
                                </h4>
 
                                {[
                                    ["num", "Card Number"],
                                    ["title", "Card Title"],
                                ].map(([field, label]) => (
                                    <div key={field}>
                                        <label className="mb-2 block font-semibold" style={labelStyle}>
                                            {label}
                                        </label>
                                        <input
                                            value={card[field] ?? ""}
                                            onChange={(e) =>
                                                handleAiStackCardChange(
                                                    index,
                                                    field,
                                                    e.target.value
                                                )
                                            }
                                            className={inputClass}
                                            style={inputStyle}
                                        />
                                    </div>
                                ))}
 
                                <div>
                                    <label className="mb-2 block font-semibold" style={labelStyle}>
                                        Card Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={card.description ?? ""}
                                        onChange={(e) =>
                                            handleAiStackCardChange(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className={`${inputClass} resize-y`}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
 
                    {/* CTA SECTION */}
                    <section className="space-y-6 rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            CTA Section
                        </h2>
 
                        {[
                            ["label", "Section Label"],
                            ["headingLine1", "Heading Line 1"],
                            ["headingLine2", "Heading Line 2"],
                            ["buttonText", "Button Text"],
                            ["buttonUrl", "Button URL"],
                        ].map(([field, label]) => (
                            <div key={field}>
                                <label className="mb-2 block font-semibold" style={labelStyle}>
                                    {label}
                                </label>
                                <input
                                    value={form.ctaSection[field] ?? ""}
                                    onChange={(e) =>
                                        handleCtaSectionChange(field, e.target.value)
                                    }
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
 
                        <div>
                            <label className="mb-2 block font-semibold" style={labelStyle}>
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={form.ctaSection.description ?? ""}
                                onChange={(e) =>
                                    handleCtaSectionChange("description", e.target.value)
                                }
                                className={`${inputClass} resize-y`}
                                style={inputStyle}
                            />
                        </div>
                    </section>
 
                    {/* SAVE */}
                    <div className="flex flex-wrap items-center gap-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-full px-10 py-4 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                            style={{ ...primaryButtonStyle, fontSize: SIZE.body }}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
 
                        {error && (
                            <p
                                role="alert"
                                className="font-semibold"
                                style={{ color: "#dc2626", fontSize: SIZE.body }}
                            >
                                {error}
                            </p>
                        )}
 
                        {message && (
                            <p
                                role="status"
                                className="font-semibold"
                                style={{ color: COLORS.teal, fontSize: SIZE.body }}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}
 