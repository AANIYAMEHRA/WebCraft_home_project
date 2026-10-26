import { useEffect, useState } from "react";
import { notify } from "../components/adminToast";
import CollapsibleSection from "../components/CollapsibleSection";
import ConfirmDialog from "../components/ConfirmDialog";
 
const API = "http://localhost:5000/api/about";
 
// Colors and fonts taken from the live Webcraft-IT site.
const COLORS = {
    navy: "#102a4f",      // headings (hero "Smarter Decisions.")
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
    h1: "40px",       // page title   — "About Page CMS"
    h2: "32px",       // section title — "Hero Section", "Our Story"
    h3: "18px",       // item title   — "Milestone 1", "Way 1"
    subtitle: "18px", // intro line under the title
    label: "16px",    // field labels
    body: "16px",     // inputs, buttons, messages
};
 
// Fields that must be filled in before saving.
const REQUIRED_FIELDS = ["heroHeading1", "heroHeading2", "heroDescription", "ctaHeading"];
 
// Names used in the removal dialog.
const REMOVE_LABELS = {
    heroChips: "chip",
    milestones: "milestone",
    ways: "card",
    values: "value",
    philSteps: "step",
    stats: "statistic",
};
 
const EMPTY_ABOUT = {
    heroChips: [],
    milestones: [],
    ways: [],
    values: [],
    philSteps: [],
    stats: [],
    sectionContent: {
        heroHeading1: "The Company",
        heroHeading2: "Behind the Work",
        heroDescription:
            "Founded in 2006, Webcraft has grown from a web development firm into a research-led, AI-enabled digital transformation partner — serving 3000+ clients with a team of 230+ professionals.",
        storyLabel: "Our Story",
        waysLabel: "What We Help You Do",
        waysHeading: "Six Ways We Create Value",
        valuesLabel: "Our Values",
        valuesHeading: "What We Believe In",
        philosophyLabel: "How We Work",
        philosophyHeading: "Our Delivery Philosophy",
        philosophyDescription:
            "Every engagement follows a rhythm we've refined across two decades — four stages that carry a project from first conversation to long-term stewardship.",
        statsLabel: "By the Numbers",
        statsHeading: "Two decades, counted carefully.",
        careersLabel: "Careers",
        careersHeading: "We're hiring. Come build with us.",
        careersDescription:
            "If the values on this page sound like your kind of work, we'd like to hear from you.",
        careersButton: "See Open Roles →",
        ctaLabel: "Let's Work Together",
        ctaHeading: "Let's work together.",
        ctaDescription:
            "Whether you're exploring a new product direction or modernizing an existing system — we'd like to hear about it.",
        ctaButton: "Start a Conversation →",
    },
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
 
const labelStyle = { color: COLORS.text, fontSize: SIZE.label };
 
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
 
const secondaryButtonClass =
    "rounded-full border bg-white px-6 py-3 font-semibold transition hover:border-[#2aa27c] hover:text-[#1f8a86]";
const removeButtonClass =
    "rounded-full border bg-white px-5 py-2.5 font-semibold transition hover:border-red-300 hover:text-red-600";
 
const itemClass = "space-y-5 rounded-2xl p-6";
const itemStyle = {
    backgroundColor: "#fbfdfc",
    border: `1px solid ${COLORS.border}`,
};
 
const INPUT_GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2";
 
// Returns an error message for the first problem found, or "" when the content is valid.
function validateAbout(form) {
    const missing = REQUIRED_FIELDS.filter(
        (field) => !String(form.sectionContent[field] ?? "").trim()
    );
 
    if (missing.length > 0) {
        return "Please fill in all required fields marked with *.";
    }
 
    return "";
}
 
// Fills in any missing keys so every field has a value to show.
function mergeAbout(about) {
    return {
        ...EMPTY_ABOUT,
        ...about,
        sectionContent: {
            ...EMPTY_ABOUT.sectionContent,
            ...(about.sectionContent || {}),
        },
    };
}
 
// A labelled input. The hint text is shown while the field is empty.
function Field({ label, value, onChange, multiline = false, required = false }) {
    const common = {
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        placeholder: `Enter ${label.toLowerCase()}`,
        className: inputClass,
        style: inputStyle,
    };
 
    return (
        <div>
            <label className="mb-2 block font-semibold" style={labelStyle}>
                {label}
                {required && <span style={{ color: "#dc2626" }}> *</span>}
            </label>
 
            {multiline ? (
                <textarea rows={4} className={`${inputClass} resize-y`} {...common} />
            ) : (
                <input {...common} />
            )}
        </div>
    );
}
 
// Title row of an item card, with its Remove button.
function ItemHeader({ title, onRemove }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                {title}
            </h4>
 
            <button
                type="button"
                onClick={onRemove}
                className={removeButtonClass}
                style={outlineButtonStyle}
            >
                Remove
            </button>
        </div>
    );
}
 
export default function AboutAdmin() {
    const [form, setForm] = useState(EMPTY_ABOUT);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [pendingRemove, setPendingRemove] = useState(null);
 
    useEffect(() => {
        let active = true;
 
        async function loadAbout() {
            try {
                const response = await fetch(API);
                if (!response.ok) throw new Error("Could not load About content.");
 
                const data = await response.json();
                const about = data.about || data;
 
                if (active) setForm(mergeAbout(about));
            } catch (err) {
                if (active) setError(err.message || "Failed to load content.");
            } finally {
                if (active) setLoading(false);
            }
        }
 
        loadAbout();
        return () => { active = false; };
    }, []);
 
    function updateField(section, index, key, value) {
        setForm((previous) => ({
            ...previous,
            [section]: previous[section].map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            ),
        }));
    }
 
    function updateTitlePart(section, index, part, value) {
        setForm((previous) => ({
            ...previous,
            [section]: previous[section].map((item, i) =>
                i === index
                    ? {
                        ...item,
                        title: Array.isArray(item.title)
                            ? item.title.map((partValue, j) =>
                                j === part ? value : partValue
                            )
                            : item.title,
                    }
                    : item
            ),
        }));
    }
 
    function updateSectionContent(key, value) {
        setForm((previous) => ({
            ...previous,
            sectionContent: {
                ...previous.sectionContent,
                [key]: value,
            },
        }));
    }
 
    function addItem(section, item) {
        setForm((previous) => ({
            ...previous,
            [section]: [...previous[section], item],
        }));
    }
 
    // Asks for confirmation first; the item is removed by confirmRemove.
    function removeItem(section, index) {
        setPendingRemove({ section, index });
    }
 
    function confirmRemove() {
        const { section, index } = pendingRemove;
        setPendingRemove(null);
 
        setForm((previous) => ({
            ...previous,
            [section]: previous[section].filter((_, i) => i !== index),
        }));
    }
 
    async function handleSubmit(event) {
        event.preventDefault();
 
        const validationError = validateAbout(form);
 
        if (validationError) {
            setError(validationError);
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
                body: JSON.stringify(form),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.message || "Could not save About content.");
            }
 
            if (data.about) {
                setForm(mergeAbout(data.about));
            }
 
            setMessage("About page content saved successfully.");
            notify("success", "About page saved successfully!");
        } catch (err) {
            setError(err.message || "Failed to save content.");
            notify("error", err.message || "Failed to save content.");
        } finally {
            setSaving(false);
        }
    }
 
    if (loading) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading About CMS...
            </p>
        );
    }
 
    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <h1
                    className="mb-5 font-bold leading-[0.95] tracking-tight"
                    style={{ ...headingStyle, fontSize: SIZE.h1 }}
                >
                    About Page <span style={gradientTextStyle}>CMS</span>
                </h1>
 
                <p
                    className="mb-8"
                    style={{ color: COLORS.muted, fontSize: SIZE.subtitle }}
                >
                    Edit About page content and save your changes.
                </p>
 
                <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO SECTION */}
                    <CollapsibleSection id="hero" title="Hero Content">
                        <div className={INPUT_GRID}>
                            <Field
                                label="First Heading Line"
                                required
                                value={form.sectionContent.heroHeading1}
                                onChange={(v) => updateSectionContent("heroHeading1", v)}
                            />
                            <Field
                                label="Second Heading Line"
                                required
                                value={form.sectionContent.heroHeading2}
                                onChange={(v) => updateSectionContent("heroHeading2", v)}
                            />
                        </div>
 
                        <Field
                            label="Hero Description"
                            required
                            multiline
                            value={form.sectionContent.heroDescription}
                            onChange={(v) => updateSectionContent("heroDescription", v)}
                        />
 
                    </CollapsibleSection>
 
                    {/* HERO CHIPS */}
                    <CollapsibleSection id="chips" title="Hero Chips">
 
                        {form.heroChips.map((chip, i) => (
                            <div key={i} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Chip ${i + 1}`}
                                    onRemove={() => removeItem("heroChips", i)}
                                />
 
                                <div className={INPUT_GRID}>
                                    <Field
                                        label="Label"
                                        value={chip.label}
                                        onChange={(v) => updateField("heroChips", i, "label", v)}
                                    />
                                    <Field
                                        label="Value"
                                        value={chip.value}
                                        onChange={(v) => updateField("heroChips", i, "value", v)}
                                    />
                                </div>
 
                                <Field
                                    label="SVG Icon Path"
                                    value={chip.icon}
                                    onChange={(v) => updateField("heroChips", i, "icon", v)}
                                />
                            </div>
                        ))}
 
                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                addItem("heroChips", {
                                    label: "New label",
                                    value: "New value",
                                    icon: "",
                                    pos: "top-[5%] left-[8%]",
                                    box: "border-gm-teal/10",
                                    color: "text-gm-teal",
                                    style: undefined,
                                })
                            }
                        >
                            + Add Chip
                        </button>
                    </CollapsibleSection>
 
                    {/* OUR STORY */}
                    <CollapsibleSection id="story" title="Our Story — Milestones">
                        <Field
                            label="Section Label"
                            value={form.sectionContent.storyLabel}
                            onChange={(v) => updateSectionContent("storyLabel", v)}
                        />
 
                        {form.milestones.map((item, i) => (
                            <div key={i} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Milestone ${i + 1}`}
                                    onRemove={() => removeItem("milestones", i)}
                                />
 
                                <div className={INPUT_GRID}>
                                    <Field
                                        label="Year"
                                        value={item.year}
                                        onChange={(v) => updateField("milestones", i, "year", v)}
                                    />
                                    <Field
                                        label="Tag"
                                        value={item.tag}
                                        onChange={(v) => updateField("milestones", i, "tag", v)}
                                    />
                                </div>
 
                                <Field
                                    label="Timeline Context"
                                    value={item.context}
                                    onChange={(v) => updateField("milestones", i, "context", v)}
                                />
 
                                <div className={INPUT_GRID}>
                                    {[0, 1, 2].map((part) => (
                                        <Field
                                            key={part}
                                            label={`Title Part ${part + 1}`}
                                            value={item.title?.[part] || ""}
                                            onChange={(v) => updateTitlePart("milestones", i, part, v)}
                                        />
                                    ))}
                                </div>
 
                                <Field
                                    label="Description"
                                    multiline
                                    value={item.body}
                                    onChange={(v) => updateField("milestones", i, "body", v)}
                                />
                            </div>
                        ))}
 
                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                addItem("milestones", {
                                    year: "2027",
                                    tag: "New Milestone",
                                    context: "",
                                    title: ["", "", ""],
                                    body: "",
                                })
                            }
                        >
                            + Add Milestone
                        </button>
                    </CollapsibleSection>
 
                    {/* SIX WAYS */}
                    <CollapsibleSection id="ways" title="Six Ways We Create Value">
                        <div className={INPUT_GRID}>
                            <Field
                                label="Section Label"
                                value={form.sectionContent.waysLabel}
                                onChange={(v) => updateSectionContent("waysLabel", v)}
                            />
                            <Field
                                label="Section Heading"
                                value={form.sectionContent.waysHeading}
                                onChange={(v) => updateSectionContent("waysHeading", v)}
                            />
                        </div>
 
                        {form.ways.map((item, i) => (
                            <div key={i} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Way ${i + 1}`}
                                    onRemove={() => removeItem("ways", i)}
                                />
 
                                <div className={INPUT_GRID}>
                                    {[0, 1, 2].map((part) => (
                                        <Field
                                            key={part}
                                            label={`Title Part ${part + 1}`}
                                            value={item.title?.[part] || ""}
                                            onChange={(v) => updateTitlePart("ways", i, part, v)}
                                        />
                                    ))}
                                </div>
 
                                <Field
                                    label="Description"
                                    multiline
                                    value={item.body}
                                    onChange={(v) => updateField("ways", i, "body", v)}
                                />
 
                                <Field
                                    label="SVG Icon Path"
                                    value={item.icon}
                                    onChange={(v) => updateField("ways", i, "icon", v)}
                                />
                            </div>
                        ))}
 
                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                addItem("ways", {
                                    title: ["New ", "value", ""],
                                    body: "",
                                    icon: "",
                                    gradient: "bg-gradient-to-br from-gm-teal to-gm-green",
                                })
                            }
                        >
                            + Add Way
                        </button>
                    </CollapsibleSection>
 
                    {/* OUR VALUES */}
                    <CollapsibleSection id="values" title="Our Values">
                        <div className={INPUT_GRID}>
                            <Field
                                label="Section Label"
                                value={form.sectionContent.valuesLabel}
                                onChange={(v) => updateSectionContent("valuesLabel", v)}
                            />
                            <Field
                                label="Section Heading"
                                value={form.sectionContent.valuesHeading}
                                onChange={(v) => updateSectionContent("valuesHeading", v)}
                            />
                        </div>
 
                        {form.values.map((item, i) => (
                            <div key={i} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Value ${i + 1}`}
                                    onRemove={() => removeItem("values", i)}
                                />
 
                                <Field
                                    label="Title"
                                    value={item.title}
                                    onChange={(v) => updateField("values", i, "title", v)}
                                />
 
                                <Field
                                    label="Description"
                                    multiline
                                    value={item.body}
                                    onChange={(v) => updateField("values", i, "body", v)}
                                />
                            </div>
                        ))}
 
                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                addItem("values", {
                                    title: "New Value",
                                    body: "",
                                    delay: "0.1s",
                                })
                            }
                        >
                            + Add Value
                        </button>
                    </CollapsibleSection>
 
                    {/* DELIVERY PHILOSOPHY */}
                    <CollapsibleSection id="philosophy" title="Delivery Philosophy">
                        <div className={INPUT_GRID}>
                            <Field
                                label="Section Label"
                                value={form.sectionContent.philosophyLabel}
                                onChange={(v) => updateSectionContent("philosophyLabel", v)}
                            />
                            <Field
                                label="Section Heading"
                                value={form.sectionContent.philosophyHeading}
                                onChange={(v) => updateSectionContent("philosophyHeading", v)}
                            />
                        </div>
 
                        <Field
                            label="Intro Description"
                            multiline
                            value={form.sectionContent.philosophyDescription}
                            onChange={(v) => updateSectionContent("philosophyDescription", v)}
                        />
 
                        {form.philSteps.map((item, i) => (
                            <div key={i} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Step ${i + 1}`}
                                    onRemove={() => removeItem("philSteps", i)}
                                />
 
                                <Field
                                    label="Step Title"
                                    value={item.title}
                                    onChange={(v) => updateField("philSteps", i, "title", v)}
                                />
 
                                <Field
                                    label="Card Description"
                                    multiline
                                    value={item.body}
                                    onChange={(v) => updateField("philSteps", i, "body", v)}
                                />
 
                                <Field
                                    label="Animated Description"
                                    multiline
                                    value={item.desc}
                                    onChange={(v) => updateField("philSteps", i, "desc", v)}
                                />
                            </div>
                        ))}
 
                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                addItem("philSteps", {
                                    title: "New Step",
                                    body: "",
                                    desc: "",
                                })
                            }
                        >
                            + Add Step
                        </button>
                    </CollapsibleSection>
 
                    {/* BY THE NUMBERS */}
                    <CollapsibleSection id="stats" title="By the Numbers — Statistics">
                        <div className={INPUT_GRID}>
                            <Field
                                label="Section Label"
                                value={form.sectionContent.statsLabel}
                                onChange={(v) => updateSectionContent("statsLabel", v)}
                            />
                            <Field
                                label="Section Heading"
                                value={form.sectionContent.statsHeading}
                                onChange={(v) => updateSectionContent("statsHeading", v)}
                            />
                        </div>
 
                        {form.stats.map((item, i) => (
                            <div key={i} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={`Statistic ${i + 1}`}
                                    onRemove={() => removeItem("stats", i)}
                                />
 
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <Field
                                        label="Number (Digits Only)"
                                        value={item.target}
                                        onChange={(v) =>
                                            updateField("stats", i, "target", v === "" ? "" : Number(v))
                                        }
                                    />
                                    <Field
                                        label="Suffix"
                                        value={item.suffix}
                                        onChange={(v) => updateField("stats", i, "suffix", v)}
                                    />
                                    <Field
                                        label="Label"
                                        value={item.label}
                                        onChange={(v) => updateField("stats", i, "label", v)}
                                    />
                                </div>
 
                                <Field
                                    label="Accessible Description"
                                    value={item.aria}
                                    onChange={(v) => updateField("stats", i, "aria", v)}
                                />
                            </div>
                        ))}
 
                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                addItem("stats", {
                                    target: 0,
                                    suffix: "",
                                    label: "New statistic",
                                    aria: "New statistic",
                                })
                            }
                        >
                            + Add Statistic
                        </button>
                    </CollapsibleSection>
 
                    {/* CAREERS AND CTA */}
                    <CollapsibleSection id="careers" title="Careers Section">
                        <div className={INPUT_GRID}>
                            <Field
                                label="Careers Label"
                                value={form.sectionContent.careersLabel}
                                onChange={(v) => updateSectionContent("careersLabel", v)}
                            />
                            <Field
                                label="Careers Heading"
                                value={form.sectionContent.careersHeading}
                                onChange={(v) => updateSectionContent("careersHeading", v)}
                            />
                        </div>
 
                        <Field
                            label="Careers Description"
                            multiline
                            value={form.sectionContent.careersDescription}
                            onChange={(v) => updateSectionContent("careersDescription", v)}
                        />
 
                        <Field
                            label="Careers Button Text"
                            value={form.sectionContent.careersButton}
                            onChange={(v) => updateSectionContent("careersButton", v)}
                        />
                    </CollapsibleSection>
 
                    {/* CTA SECTION */}
                    <CollapsibleSection id="cta" title="CTA Section">
                        <div className={INPUT_GRID}>
                            <Field
                                label="CTA Label"
                                value={form.sectionContent.ctaLabel}
                                onChange={(v) => updateSectionContent("ctaLabel", v)}
                            />
                            <Field
                                label="CTA Heading"
                                required
                                value={form.sectionContent.ctaHeading}
                                onChange={(v) => updateSectionContent("ctaHeading", v)}
                            />
                        </div>
 
                        <Field
                            label="CTA Description"
                            multiline
                            value={form.sectionContent.ctaDescription}
                            onChange={(v) => updateSectionContent("ctaDescription", v)}
                        />
 
                        <Field
                            label="CTA Button Text"
                            value={form.sectionContent.ctaButton}
                            onChange={(v) => updateSectionContent("ctaButton", v)}
                        />
                    </CollapsibleSection>
 
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
 
            {pendingRemove !== null && (
                <ConfirmDialog
                    title={`Remove ${REMOVE_LABELS[pendingRemove.section]}?`}
                    message={`Are you sure you want to delete this ${REMOVE_LABELS[pendingRemove.section]} from the About page? The change will be applied when you click Save Changes.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmRemove}
                    onCancel={() => setPendingRemove(null)}
                />
            )}
        </main>
    );
}