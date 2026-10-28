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
    IconUpload,
    ItemHeader,
    isBlank,
    itemClass,
    itemStyle,
    pageStyle,
    secondaryButtonClass,
    outlineButtonStyle,
} from "../components/AdminUi";
 
const API = "http://localhost:5000/api/about";
 
// Default icon for a hero chip that has no icon, so the original sun icon comes back.
const DEFAULT_CHIP_ICON =
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z";
 
// Mandatory fields. Everything else on the page is optional.
const REQUIRED_FIELDS = [
    "heroHeading1",
    "heroHeading2",
    "heroDescription",
    "waysHeading",
    "valuesHeading",
    "philosophyHeading",
    "statsHeading",
    "careersHeading",
    "ctaHeading",
    "ctaButton",
];
 
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
 
// Fills in any missing keys so every field has a value to show.
function mergeAbout(about) {
    return {
        ...EMPTY_ABOUT,
        ...about,
        heroChips: (about.heroChips ?? []).map((chip) => ({
            ...chip,
            icon: chip.icon || DEFAULT_CHIP_ICON,
        })),
        sectionContent: {
            ...EMPTY_ABOUT.sectionContent,
            ...(about.sectionContent || {}),
        },
    };
}
 
// Returns an error message when a mandatory field is empty, or "" when the content is valid.
function validateAbout(form) {
    const missing = REQUIRED_FIELDS.some((field) => isBlank(form.sectionContent[field]));
 
    return missing ? "Some required fields are empty. Please fill in all fields marked with *." : "";
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
                if (active) setForm(mergeAbout(data.about || data));
            } catch (err) {
                if (active) setError(err.message || "Failed to load content.");
            } finally {
                if (active) setLoading(false);
            }
        }
 
        loadAbout();
        return () => { active = false; };
    }, []);
 
    // Updates one field of a list item, e.g. the year of milestone 2.
    function updateField(section, index, key, value) {
        setForm((previous) => ({
            ...previous,
            [section]: previous[section].map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            ),
        }));
    }
 
    // Updates one part of a three-part title, e.g. the second word of way 1.
    function updateTitlePart(section, index, part, value) {
        setForm((previous) => ({
            ...previous,
            [section]: previous[section].map((item, i) =>
                i === index
                    ? {
                        ...item,
                        title: Array.isArray(item.title)
                            ? item.title.map((partValue, j) => (j === part ? value : partValue))
                            : item.title,
                    }
                    : item
            ),
        }));
    }
 
    function updateContent(key, value) {
        setForm((previous) => ({
            ...previous,
            sectionContent: { ...previous.sectionContent, [key]: value },
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
                body: JSON.stringify(form),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.message || "Could not save About content.");
            }
 
            if (data.about) setForm(mergeAbout(data.about));
 
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
 
    const content = form.sectionContent;
 
    // Props that bind a field to one key of the section content.
    const text = (key) => ({ value: content[key], onChange: (v) => updateContent(key, v) });
 
    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <PageTitle name="About Page" intro="Edit About page content and save your changes." />
 
                <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO CONTENT */}
                    <CollapsibleSection id="hero" title="Hero Content">
                        <div className={INPUT_GRID}>
                            <Field label="First Heading Line" required {...text("heroHeading1")} />
                            <Field label="Second Heading Line" required {...text("heroHeading2")} />
                        </div>
 
                        <Field label="Hero Description" required multiline {...text("heroDescription")} />
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
 
                                <IconUpload
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
                        <Field label="Section Label" {...text("storyLabel")} />
 
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
                            <Field label="Section Label" {...text("waysLabel")} />
                            <Field label="Section Heading" required {...text("waysHeading")} />
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
 
                                <IconUpload
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
                            <Field label="Section Label" {...text("valuesLabel")} />
                            <Field label="Section Heading" required {...text("valuesHeading")} />
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
                            onClick={() => addItem("values", { title: "New Value", body: "", delay: "0.1s" })}
                        >
                            + Add Value
                        </button>
                    </CollapsibleSection>
 
                    {/* DELIVERY PHILOSOPHY */}
                    <CollapsibleSection id="philosophy" title="Delivery Philosophy">
                        <div className={INPUT_GRID}>
                            <Field label="Section Label" {...text("philosophyLabel")} />
                            <Field label="Section Heading" required {...text("philosophyHeading")} />
                        </div>
 
                        <Field label="Intro Description" multiline {...text("philosophyDescription")} />
 
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
                            onClick={() => addItem("philSteps", { title: "New Step", body: "", desc: "" })}
                        >
                            + Add Step
                        </button>
                    </CollapsibleSection>
 
                    {/* BY THE NUMBERS */}
                    <CollapsibleSection id="stats" title="By the Numbers — Statistics">
                        <div className={INPUT_GRID}>
                            <Field label="Section Label" {...text("statsLabel")} />
                            <Field label="Section Heading" required {...text("statsHeading")} />
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
 
                    {/* CAREERS */}
                    <CollapsibleSection id="careers" title="Careers Section">
                        <div className={INPUT_GRID}>
                            <Field label="Careers Label" {...text("careersLabel")} />
                            <Field label="Careers Heading" required {...text("careersHeading")} />
                        </div>
 
                        <Field label="Careers Description" multiline {...text("careersDescription")} />
 
                        <Field label="Careers Button Text" {...text("careersButton")} />
                    </CollapsibleSection>
 
                    {/* CTA */}
                    <CollapsibleSection id="cta" title="CTA Section">
                        <div className={INPUT_GRID}>
                            <Field label="CTA Label" {...text("ctaLabel")} />
                            <Field label="CTA Heading" required {...text("ctaHeading")} />
                        </div>
 
                        <Field label="CTA Description" multiline {...text("ctaDescription")} />
 
                        <Field label="CTA Button Text" required {...text("ctaButton")} />
                    </CollapsibleSection>
 
                    <SaveBar saving={saving} error={error} message={message} />
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