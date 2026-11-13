import { useEffect, useState } from "react";
import { notify } from "../components/adminToast";
import CollapsibleSection from "../components/CollapsibleSection";
import ConfirmDialog from "../components/ConfirmDialog";
import {
    INPUT_GRID,
    PageTitle,
    SIZE,
    SaveBar,
    Field,
    ItemHeader,
    headingStyle,
    isBlank,
    itemClass,
    itemStyle,
    pageStyle,
    secondaryButtonClass,
    outlineButtonStyle,
} from "../components/AdminUi";

const API = "http://localhost:5000/api/home";

// Image uploads are stored inside the Home document, so keep them small.
const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

// Links must start with "/" (site page) or "http(s)://" (external address).
const LINK_PATTERN = /^(\/|https?:\/\/)/;

// Page names an editor can type instead of a URL. Edit the right-hand side if your routes differ.
const PAGE_ROUTES = {
    home: "/",
    "about": "/about",
    "about us": "/about",
    "ai solutions": "/ai-solutions",
    "ai solution": "/ai-solutions",
    "ai-solutions": "/ai-solutions",
    research: "/research",
    products: "/products",
    product: "/products",
    services: "/services",
    service: "/services",
    contact: "/contact",
    "contact us": "/contact",
};

// Pages shown in the dropdown for the AI Solutions bottom button link.
const PAGE_OPTIONS = [
    { label: "Home", value: "/" },
    { label: "About Us", value: "/about" },
    { label: "AI Solutions", value: "/ai-solutions" },
    { label: "Research", value: "/research" },
    { label: "Products", value: "/products" },
    { label: "Services", value: "/services" },
    { label: "Contact", value: "/contact" },
];

// Default icon paths for the 6 AI Solution cards (used when no image is uploaded).
const AI_CARD_ICONS = [
    "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
    "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
];

// "Research" -> "/research", "home" -> "/", "/contact" and "https://..." stay as they are.
function resolveLink(value) {
    const text = (value ?? "").trim();
    if (!text || LINK_PATTERN.test(text)) return text;
    return PAGE_ROUTES[text.toLowerCase()] ?? text;
}

// "Machine Learning, GenAI" -> ["Machine Learning", "GenAI"]
function parseTags(text) {
    return (text ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
}

// Applies resolveLink to every link field of the form before it is saved.
function normalizeLinks(form) {
    const fix = (item, key = "buttonUrl") => ({ ...item, [key]: resolveLink(item[key]) });

    return {
        ...form,
        button1Url: resolveLink(form.button1Url),
        button2Url: resolveLink(form.button2Url),
        whatWeDo: {
            ...form.whatWeDo,
            services: form.whatWeDo.services.map(({ tagsText, ...service }) => ({
                ...fix(service),
                tags: parseTags(tagsText),
            })),
        },
        products: { ...form.products, items: form.products.items.map((p) => fix(p)) },
        aiStack: {
            ...form.aiStack,
            buttonUrl: resolveLink(form.aiStack.buttonUrl),
        },
        ctaSection: { ...form.ctaSection, buttonUrl: resolveLink(form.ctaSection.buttonUrl) },
    };
}

// Mandatory fields, with the name shown in the error message when one is empty.
// Every entry here must also have the `required` prop on its Field, so the * is shown.
const REQUIRED_FIELDS = [
    { path: ["headingLine1"], label: "Hero Heading Line 1" },
    { path: ["headingLine2"], label: "Hero Heading Line 2" },
    { path: ["description"], label: "Hero Description" },
    { path: ["button1Text"], label: "First Button Text" },
    { path: ["button1Url"], label: "First Button URL" },
    { path: ["whatWeDo", "heading"], label: "What We Do - Main Heading" },
    { path: ["whyWebcraft", "heading"], label: "Why Webcraft - Heading" },
    { path: ["approach", "heading"], label: "Our Approach - Main Heading" },
    { path: ["products", "headingLine1"], label: "Products - Heading Line 1" },
    { path: ["aiStack", "headingLine1"], label: "AI Stack - Heading Line 1" },
    { path: ["aiStack", "headingLine2"], label: "AI Stack - Heading Line 2" },
    { path: ["ctaSection", "headingLine1"], label: "CTA - Heading Line 1" },
    { path: ["ctaSection", "headingLine2"], label: "CTA - Heading Line 2" },
    { path: ["ctaSection", "buttonText"], label: "CTA - Button Text" },
    { path: ["ctaSection", "buttonUrl"], label: "CTA - Button URL" },
];

// These must match the defaults shown on the public Home page (WhatWeDo.jsx),
// so saving an untouched form does not replace the website text with blanks.
const DEFAULT_SERVICES = [
    {
        title: "AI Solutions",
        description:
            "Machine learning, generative AI, NLP, intelligent automation, and AI strategy - applied to real business problems with measurable outcomes.",
        buttonText: "Explore AI Solutions",
        buttonUrl: "/ai-solutions",
        tags: ["Machine Learning", "GenAI", "Automation"],
    },
    {
        title: "Research",
        description:
            "Market research, competitive intelligence, UX research, innovation testing, and strategic advisory - to ensure you're building the right thing.",
        buttonText: "See Research Capabilities",
        buttonUrl: "/research",
        tags: ["Market Research", "UX Research", "Intelligence"],
    },
    {
        title: "Products",
        description:
            "Ready-to-deploy platforms - HRMS, TutorWand (AI-powered ed-tech), and WCSchool ERP - built from years of domain expertise and client feedback.",
        buttonText: "Explore Products",
        buttonUrl: "/products",
        tags: ["HRMS", "TutorWand", "WCSchool ERP"],
    },
    {
        title: "Services",
        description:
            "Web, mobile, UI/UX, cloud, system integration, QA, legacy modernization, and digital transformation - the engineering depth to ship it right.",
        buttonText: "View All Services",
        buttonUrl: "/services",
        tags: ["Web & Mobile", "Cloud", "UI/UX"],
    },
];

const DEFAULT_WHAT_WE_DO = {
    label: "What We Do",
    heading: "Four Capabilities, One Partner",
    description:
        "We combine AI, research, products, and engineering services into a single, integrated offering - so everything works together.",
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
            description: "We validate assumptions with data before committing resources to build.",
        },
        {
            title: "AI with delivery realism",
            description: "Practical AI implementations grounded in real business constraints and ROI.",
        },
        {
            title: "Product thinking",
            description: "We approach projects as products - with user value, scalability, and lifecycle in mind.",
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
        "Every engagement begins with understanding. Through structured research, market analysis, and technology assessment, we help you define the right problem - then design and build the right solution.",
    steps: [
        {
            num: "01",
            title: "Understand",
            card: "Research, validate and define the opportunity before a line of code is written.",
            sub: "We start with clarity.",
            desc: "Research, validate, and define the opportunity. We listen carefully before we recommend - then we pressure-test the recommendation before we build.",
        },
        {
            num: "02",
            title: "Design",
            card: "Architect the solution around product thinking, user value and scalability.",
            sub: "We design for leverage.",
            desc: "Architect the solution around product thinking, user value, and scalability. Every decision gets a written rationale - so it holds up six months later.",
        },
        {
            num: "03",
            title: "Deliver",
            card: "Build, iterate and support at scale with full accountability from one team.",
            sub: "We deliver, and we stay.",
            desc: "Build, iterate, and support at scale. One team from first brief to last line of code - with full accountability, not handoffs.",
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
                "Complete HR management - attendance, leave, payroll, self-service portal, and role-based security. Flat ₹2,999/mo server cost, no per-user fees. Built for mid-size teams who need enterprise features without enterprise budgets.",
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
                "School management platform - fees, schedules, exams, parent monitoring, and seamless communication between schools, parents, and students. One dashboard for the entire institution.",
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
        "AI without research is noise. Research without AI is slow. Webcraft combines both - giving you the speed of intelligent automation and the confidence of informed strategy.",
    cards: [
        {
            num: "01",
            title: "Predictive Analytics",
            description:
                "Surface patterns in your data before they become problems - or opportunities - for your competitors. We build models that turn raw signals into actionable forecasts.",
        },
        {
            num: "02",
            title: "Primary Research",
            description:
                "Face-to-face interviews, focus groups, and quantitative studies. We collect the data your strategy deserves - then structure it for AI-ready decision-making.",
        },
        {
            num: "03",
            title: "Automation at Scale",
            description:
                "No-code RPA and conversational AI deployed across real workflows - cutting cost and accelerating timelines without replacing the teams who know the work best.",
        },
        {
            num: "04",
            title: "LLM & Gen AI",
            description:
                "Generative AI integrated into your products and processes - with proprietary data reliability, guardrails, and enterprise-grade security baked in from day one.",
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
                "Fraud detection, predictive maintenance, and supply-chain optimisation - AI that processes and performs at scale with full auditability and compliance.",
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
        "Whether you need AI strategy, market research, product development, or digital engineering - start with a conversation.",
    buttonText: "Book a Consultation →",
    buttonUrl: "/contact",
};

// Reads a picked image file as a data URL, after checking its type and size.
function readImageFile(file, onLoad) {
    if (!file.type.startsWith("image/")) {
        notify("error", "Sirf image file upload karein (PNG, JPG, SVG, WEBP).");
        return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
        notify("error", "Image 1 MB se chhoti honi chahiye.");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result));
    reader.readAsDataURL(file);
}

// Small icon box for one AI card: shows the uploaded image, or the default icon.
function CardIconUpload({ value, fallbackPath, onChange }) {
    function handleFile(event) {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (file) readImageFile(file, onChange);
    }

    return (
        <div className="flex items-center gap-4">
            <label className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border bg-white">
                {value ? (
                    <img src={value} alt="Card icon" className="h-12 w-12 object-contain" />
                ) : (
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-gm-teal" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d={fallbackPath ?? ""} />
                    </svg>
                )}

                <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gm-teal" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
                    </svg>
                </span>

                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="rounded-full border px-4 py-2 text-sm font-semibold"
                >
                    Remove
                </button>
            )}
        </div>
    );
}

// Large image box for the Why Webcraft section: camera icon when empty, edit option after upload.
function ImageUploadBox({ value, onChange }) {
    function handleFile(event) {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (file) readImageFile(file, onChange);
    }

    return (
        <div className="space-y-3">
            <label className="relative flex h-56 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gm-teal/30 bg-white">
                {value ? (
                    <>
                        <img src={value} alt="Section image" className="h-full w-full object-cover" />
                        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gm-teal" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
                            </svg>
                        </span>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <svg viewBox="0 0 24 24" className="h-12 w-12 text-gm-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 8.5A2.5 2.5 0 015.5 6h1.8l1.4-2h6.6l1.4 2h1.8A2.5 2.5 0 0121 8.5v9A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5v-9z" />
                            <circle cx="12" cy="13" r="3.5" />
                        </svg>
                        <span className="text-sm font-medium">Upload image</span>
                    </div>
                )}

                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="rounded-full border px-4 py-2 text-sm font-semibold"
                >
                    Remove
                </button>
            )}
        </div>
    );
}

// Fills in any missing keys so every field has a value to show.
function mergeHome(data = {}) {
    const listOr = (list, fallback) => (Array.isArray(list) && list.length > 0 ? list : fallback);

    return {
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
            data.beliefHeading ?? "We listen before we propose. We prototype before we commit.",
        beliefDescription:
            data.beliefDescription ??
            "We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 - and kept our clients with us long after the first engagement ended.",

        stats: Array.isArray(data.stats) ? data.stats : [],

        whatWeDo: {
            ...DEFAULT_WHAT_WE_DO,
            ...(data.whatWeDo || {}),
            services: listOr(data.whatWeDo?.services, DEFAULT_SERVICES).map((service, index) => ({
                title: service.title ?? "",
                description: service.description ?? "",
                buttonText: service.buttonText ?? "Learn More",
                buttonUrl: service.buttonUrl ?? "",
                tagsText: (
                    Array.isArray(service.tags) && service.tags.length > 0
                        ? service.tags
                        : DEFAULT_SERVICES[index]?.tags ?? []
                ).join(", "),
            })),
        },

        whyWebcraft: {
            ...DEFAULT_WHY_WEBCRAFT,
            ...(data.whyWebcraft || {}),
            cards: listOr(data.whyWebcraft?.cards, DEFAULT_WHY_WEBCRAFT.cards).map((card) => ({
                title: card.title ?? "",
                description: card.description ?? "",
            })),
        },

        approach: {
            ...DEFAULT_APPROACH,
            ...(data.approach || {}),
            steps: DEFAULT_APPROACH.steps.map((defaultStep, index) => ({
                ...defaultStep,
                ...(data.approach?.steps?.[index] || {}),
            })),
        },

        products: {
            ...DEFAULT_PRODUCTS,
            ...(data.products || {}),
            items: listOr(data.products?.items, DEFAULT_PRODUCTS.items).map((product, index) => {
                const fallback = DEFAULT_PRODUCTS.items[index % DEFAULT_PRODUCTS.items.length];
                return {
                    ...fallback,
                    ...product,
                    meta: Array.isArray(product.meta) ? product.meta : fallback.meta,
                };
            }),
        },

        aiStack: {
            ...DEFAULT_AI_STACK,
            ...(data.aiStack || {}),
            cards: listOr(data.aiStack?.cards, DEFAULT_AI_STACK.cards).map((card, index) => ({
                ...DEFAULT_AI_STACK.cards[index % DEFAULT_AI_STACK.cards.length],
                ...card,
            })),
        },

        ctaSection: {
            ...DEFAULT_CTA_SECTION,
            ...(data.ctaSection || {}),
        },
    };
}

// Returns an error message when a mandatory field is empty or a link is malformed, or "" when valid.
function validateHome(form) {
    const missing = REQUIRED_FIELDS.find(({ path }) =>
        isBlank(path.reduce((object, key) => object?.[key], form))
    );

    if (missing) {
        return `Required field is empty: "${missing.label}". Please fill it in (fields marked with *).`;
    }

    const links = [
        form.button1Url,
        form.button2Url,
        form.aiStack.buttonUrl,
        form.ctaSection.buttonUrl,
        ...form.whatWeDo.services.map((service) => service.buttonUrl),
        ...form.products.items.map((product) => product.buttonUrl),
    ];

    if (links.some((link) => link && !LINK_PATTERN.test(resolveLink(link)))) {
        return "Link not recognised. Type a page name (Home, Research, Products, Services, AI Solutions, Contact), or a link starting with / or https://.";
    }

    return "";
}

export default function HomeAdmin() {
    const [form, setForm] = useState(() => mergeHome());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [pendingRemove, setPendingRemove] = useState(null);

    useEffect(() => {
        let active = true;

        async function loadHome() {
            try {
                const response = await fetch(API);
                if (!response.ok) throw new Error("Failed to load Home content");

                const data = await response.json();
                if (active) setForm(mergeHome(data));
            } catch (err) {
                if (active) setError(err.message || "Failed to load Home content");
            } finally {
                if (active) setLoading(false);
            }
        }

        loadHome();
        return () => {
            active = false;
        };
    }, []);

    // Updates one top-level field, e.g. headingLine1.
    function setTop(key, value) {
        setForm((previous) => ({ ...previous, [key]: value }));
    }

    // Updates one or more fields of a section, e.g. whatWeDo.heading.
    function setSection(section, changes) {
        setForm((previous) => ({
            ...previous,
            [section]: { ...previous[section], ...changes },
        }));
    }

    // Updates one item of a list inside a section, e.g. whatWeDo.services[2].
    function setListItem(section, listKey, index, changes) {
        setForm((previous) => ({
            ...previous,
            [section]: {
                ...previous[section],
                [listKey]: previous[section][listKey].map((item, i) =>
                    i === index ? { ...item, ...changes } : item
                ),
            },
        }));
    }

    function setStat(index, changes) {
        setForm((previous) => ({
            ...previous,
            stats: previous.stats.map((stat, i) => (i === index ? { ...stat, ...changes } : stat)),
        }));
    }

    function setProductMeta(productIndex, metaIndex, changes) {
        setForm((previous) => ({
            ...previous,
            products: {
                ...previous.products,
                items: previous.products.items.map((product, i) =>
                    i !== productIndex
                        ? product
                        : {
                              ...product,
                              meta: product.meta.map((item, j) =>
                                  j === metaIndex ? { ...item, ...changes } : item
                              ),
                          }
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
                    { title: "", description: "", buttonText: "Learn More", buttonUrl: "", tagsText: "" },
                ],
            },
        }));
    }

    function confirmRemoveService() {
        const index = pendingRemove;
        setPendingRemove(null);

        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: previous.whatWeDo.services.filter((_, i) => i !== index),
            },
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationError = validateHome(form);

        if (validationError) {
            setError(validationError);
            setMessage("");
            notify("error", validationError);
            return;
        }

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(API, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(normalizeLinks(form)),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save Home content");
            }

            setForm(mergeHome(data.home || data));
            setMessage("Home content updated successfully!");
            notify("success", "Home page saved successfully!");
        } catch (err) {
            setError(err.message || "Failed to save Home content");
            notify("error", err.message || "Failed to save Home content");
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

    // Props that bind a field to one top-level key, or to one key of a section.
    const top = (key) => ({ value: form[key], onChange: (v) => setTop(key, v) });
    const sec = (section, key) => ({
        value: form[section][key],
        onChange: (v) => setSection(section, { [key]: v }),
    });
    const li = (section, listKey, index, key) => ({
        value: form[section][listKey][index][key],
        onChange: (v) => setListItem(section, listKey, index, { [key]: v }),
    });

    // Page dropdown options; keeps a saved custom link visible in the list.
    const currentLink = form.aiStack.buttonUrl ?? "";
    const linkOptions =
        PAGE_OPTIONS.some((page) => page.value === currentLink) || !currentLink
            ? PAGE_OPTIONS
            : [...PAGE_OPTIONS, { label: currentLink, value: currentLink }];

    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <PageTitle name="Home Page" intro="Edit your Home page content from one place." />

                <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO CONTENT */}
                    <CollapsibleSection id="hero" title="Hero Content">
                        <Field label="Small Label" {...top("heroChip")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" required {...top("headingLine1")} />
                            <Field label="Heading Line 2" required {...top("headingLine2")} />
                        </div>

                        <Field label="Description" required multiline {...top("description")} />

                        <div className={INPUT_GRID}>
                            <Field label="First Button Text" required {...top("button1Text")} />
                            <Field label="First Button URL" required {...top("button1Url")} />
                            <Field label="Second Button Text" {...top("button2Text")} />
                            <Field label="Second Button URL" {...top("button2Url")} />
                        </div>
                    </CollapsibleSection>

                    {/* HERO STATISTICS */}
                    <CollapsibleSection id="statistics" title="Hero Statistics">
                        {form.stats.map((stat, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                    Statistic {index + 1}
                                </h4>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <Field
                                        label="Value (Digits Only)"
                                        value={stat.value ?? ""}
                                        onChange={(v) => setStat(index, { value: v })}
                                    />
                                    <Field
                                        label="Suffix"
                                        value={stat.suffix ?? ""}
                                        onChange={(v) => setStat(index, { suffix: v })}
                                    />
                                    <Field
                                        label="Label"
                                        value={stat.label ?? ""}
                                        onChange={(v) => setStat(index, { label: v })}
                                    />
                                </div>
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* OUR BELIEF */}
                    <CollapsibleSection id="belief" title={form.beliefLabel || "Our Belief"}>
                        <div className={INPUT_GRID}>
                            <Field label="Belief Label" {...top("beliefLabel")} />
                            <Field label="Belief Heading" {...top("beliefHeading")} />
                        </div>

                        <Field label="Belief Description" multiline {...top("beliefDescription")} />
                    </CollapsibleSection>

                    {/* WHAT WE DO */}
                    <CollapsibleSection id="what-we-do" title={form.whatWeDo.label || "What We Do"}>
                        <Field label="Section Label" {...sec("whatWeDo", "label")} />
                        <Field label="Main Heading" required {...sec("whatWeDo", "heading")} />
                        <Field label="Section Description" multiline {...sec("whatWeDo", "description")} />

                        <h3 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                            Service Cards ({form.whatWeDo.services.length})
                        </h3>

                        {form.whatWeDo.services.map((service, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Service ${index + 1}`}
                                    onRemove={() => setPendingRemove(index)}
                                />

                                <Field label="Service Title" {...li("whatWeDo", "services", index, "title")} />
                                <Field
                                    label="Service Description"
                                    multiline
                                    {...li("whatWeDo", "services", index, "description")}
                                />
                                <Field
                                    label="Tags (comma-separated)"
                                    value={service.tagsText ?? ""}
                                    onChange={(v) => setListItem("whatWeDo", "services", index, { tagsText: v })}
                                />
                                <div className={INPUT_GRID}>
                                    <Field label="Button Text" {...li("whatWeDo", "services", index, "buttonText")} />
                                    <Field label="Button URL" {...li("whatWeDo", "services", index, "buttonUrl")} />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addService}
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                        >
                            + Add Service
                        </button>
                    </CollapsibleSection>

                    {/* WHY WEBCRAFT */}
                    <CollapsibleSection id="why-webcraft" title={form.whyWebcraft.label || "Why Webcraft"}>
                        <Field label="Section Label" {...sec("whyWebcraft", "label")} />
                        <Field label="Heading" required {...sec("whyWebcraft", "heading")} />
                        <Field label="Description" multiline {...sec("whyWebcraft", "description")} />

                        <div>
                            <p className="mb-2 text-sm font-medium">Section Image</p>
                            <ImageUploadBox
                                value={form.whyWebcraft.image}
                                onChange={(value) => setSection("whyWebcraft", { image: value })}
                            />
                        </div>

                        <h3 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                            Feature Cards
                        </h3>

                        {form.whyWebcraft.cards.map((card, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                    Card {index + 1}
                                </h4>

                                <Field label="Card Title" {...li("whyWebcraft", "cards", index, "title")} />
                                <Field
                                    label="Card Description"
                                    multiline
                                    {...li("whyWebcraft", "cards", index, "description")}
                                />
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* OUR APPROACH */}
                    <CollapsibleSection id="approach" title={form.approach.label || "Our Approach"}>
                        <Field label="Section Label" {...sec("approach", "label")} />
                        <Field label="Main Heading" required {...sec("approach", "heading")} />
                        <Field label="Intro Description" multiline {...sec("approach", "introDescription")} />

                        {form.approach.steps.map((step, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h3 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                                    Step {index + 1}
                                </h3>

                                <Field label="Step Number" {...li("approach", "steps", index, "num")} />
                                <Field label="Step Title" {...li("approach", "steps", index, "title")} />
                                <Field label="Card Description" multiline {...li("approach", "steps", index, "card")} />
                                <Field label="Highlight Text" {...li("approach", "steps", index, "sub")} />
                                <Field label="Step Description" multiline {...li("approach", "steps", index, "desc")} />
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* PRODUCTS */}
                    <CollapsibleSection id="products" title={form.products.label || "Our Products"}>
                        <Field label="Section Label" {...sec("products", "label")} />
                        <Field label="Heading Line 1" required {...sec("products", "headingLine1")} />
                        <Field label="Heading Line 2" {...sec("products", "headingLine2")} />

                        {form.products.items.map((product, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h3 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                                    Product {index + 1}
                                </h3>

                                <Field label="Product Number" {...li("products", "items", index, "num")} />
                                <Field label="Name Line 1" {...li("products", "items", index, "nameLine1")} />
                                <Field label="Name Line 2" {...li("products", "items", index, "nameLine2")} />
                                <Field label="Description" multiline {...li("products", "items", index, "summary")} />
                                <div className={INPUT_GRID}>
                                    <Field label="Button Text" {...li("products", "items", index, "buttonText")} />
                                    <Field label="Button URL" {...li("products", "items", index, "buttonUrl")} />
                                </div>

                                <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                    Product Details
                                </h4>

                                {product.meta.map((item, metaIndex) => (
                                    <div key={metaIndex} className={INPUT_GRID}>
                                        <Field
                                            label={`Detail Label ${metaIndex + 1}`}
                                            value={item.label ?? ""}
                                            onChange={(v) => setProductMeta(index, metaIndex, { label: v })}
                                        />
                                        <Field
                                            label={`Detail Value ${metaIndex + 1}`}
                                            value={item.value ?? ""}
                                            onChange={(v) => setProductMeta(index, metaIndex, { value: v })}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* AI STACK */}
                    <CollapsibleSection id="ai-stack" title={form.aiStack.label || "AI Solutions"}>
                        <Field label="Section Label" {...sec("aiStack", "label")} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" required {...sec("aiStack", "headingLine1")} />
                            <Field label="Heading Line 2" required {...sec("aiStack", "headingLine2")} />
                        </div>
                        <Field label="Section Description" multiline {...sec("aiStack", "description")} />
                        <Field label="Button Text" {...sec("aiStack", "buttonText")} />

                        <h3 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                            AI Solution Cards
                        </h3>

                        {form.aiStack.cards.map((card, index) => {
                            const isLast = index === form.aiStack.cards.length - 1;

                            return (
                                <div key={index} className={itemClass} style={itemStyle}>
                                    <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                        Card {index + 1}
                                    </h4>

                                    <Field label="Card Number" {...li("aiStack", "cards", index, "num")} />
                                    <Field label="Card Title" {...li("aiStack", "cards", index, "title")} />
                                    <Field label="Card Description" multiline {...li("aiStack", "cards", index, "description")} />

                                    <div>
                                        <p className="mb-2 text-sm font-medium">Card Icon</p>
                                        <CardIconUpload
                                            value={card.image}
                                            fallbackPath={AI_CARD_ICONS[index]}
                                            onChange={(value) =>
                                                setListItem("aiStack", "cards", index, { image: value })
                                            }
                                        />
                                    </div>

                                    {isLast && (
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium">
                                                Button Link (page) - bottom "{form.aiStack.buttonText || "See All AI Solutions"}" button
                                            </label>
                                            <select
                                                value={currentLink}
                                                onChange={(event) => setSection("aiStack", { buttonUrl: event.target.value })}
                                                className="w-full rounded-xl border bg-white px-4 py-3"
                                            >
                                                {linkOptions.map((page) => (
                                                    <option key={page.value} value={page.value}>
                                                        {page.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </CollapsibleSection>

                    {/* CTA */}
                    <CollapsibleSection id="cta" title={form.ctaSection.label || "CTA Section"}>
                        <Field label="Section Label" {...sec("ctaSection", "label")} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" required {...sec("ctaSection", "headingLine1")} />
                            <Field label="Heading Line 2" required {...sec("ctaSection", "headingLine2")} />
                        </div>
                        <Field label="Description" multiline {...sec("ctaSection", "description")} />
                        <div className={INPUT_GRID}>
                            <Field label="Button Text" required {...sec("ctaSection", "buttonText")} />
                            <Field label="Button URL" required {...sec("ctaSection", "buttonUrl")} />
                        </div>
                    </CollapsibleSection>

                    <SaveBar saving={saving} error={error} message={message} />
                </form>
            </div>

            {pendingRemove !== null && (
                <ConfirmDialog
                    title="Remove service?"
                    message={`Are you sure you want to delete "${form.whatWeDo.services[pendingRemove]?.title || "this service"}" from the services list? The change will be applied when you click Save Changes.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmRemoveService}
                    onCancel={() => setPendingRemove(null)}
                />
            )}
        </main>
    );
}