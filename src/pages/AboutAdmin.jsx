import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/about";

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

const FIELD_STYLE = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#fff",
    color: "#111827",
};

const LABEL_STYLE = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#374151",
};

const SECTION_STYLE = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "22px",
    marginBottom: "20px",
};

function Field({ label, value, onChange, multiline = false }) {
    return (
        <label style={{ display: "block", marginBottom: "14px" }}>
            <span style={LABEL_STYLE}>{label}</span>
            {multiline ? (
                <textarea
                    style={{ ...FIELD_STYLE, minHeight: "90px", resize: "vertical" }}
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    style={FIELD_STYLE}
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </label>
    );
}

function EditorSection({ title, children }) {
    return (
        <section style={SECTION_STYLE}>
            <h2 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "20px" }}>
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function AboutAdmin() {
    const [form, setForm] = useState(EMPTY_ABOUT);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function loadAbout() {
            try {
                const response = await fetch(API);
                if (!response.ok) throw new Error("Could not load About content.");

                const data = await response.json();
                const about = data.about || data;

                if (active) {
                    setForm({
                        ...EMPTY_ABOUT,
                        ...about,
                        sectionContent: {
                            ...EMPTY_ABOUT.sectionContent,
                            ...(about.sectionContent || {}),
                        },
                    });
                }
            } catch (error) {
                if (active) setMessage(error.message || "Failed to load content.");
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

    function removeItem(section, index) {
        setForm((previous) => ({
            ...previous,
            [section]: previous[section].filter((_, i) => i !== index),
        }));
    }

    async function saveAbout() {
        setSaving(true);
        setMessage("");

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
                setForm((previous) => ({
                    ...previous,
                    ...data.about,
                    sectionContent: {
                        ...previous.sectionContent,
                        ...(data.about.sectionContent || {}),
                    },
                }));
            }

            setMessage("About page content saved successfully.");
        } catch (error) {
            setMessage(error.message || "Failed to save content.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div style={{ padding: 30 }}>Loading About CMS...</div>;

    const inputGrid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
    };

    return (
        <form
            id="admin-form"
            onSubmit={(e) => {
                e.preventDefault();
                saveAbout();
            }}
            style={{ background: "#f8fafc", minHeight: "100vh", padding: "28px" }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "24px",
                }}>
                    <div>
                        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0B2447" }}>
                            About Page CMS
                        </h1>
                        <p style={{ color: "#64748b", marginTop: "6px" }}>
                            Edit About page content and save your changes.
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            background: "#0B2447",
                            color: "#fff",
                            border: 0,
                            borderRadius: "8px",
                            padding: "12px 20px",
                            fontWeight: 700,
                            cursor: saving ? "wait" : "pointer",
                        }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                {message && (
                    <p role="status" style={{
                        padding: "12px",
                        borderRadius: "8px",
                        background: message.includes("successfully") ? "#dcfce7" : "#fee2e2",
                        marginBottom: "18px",
                    }}>
                        {message}
                    </p>
                )}

                <EditorSection title="Hero Section">
                    <div style={inputGrid}>
                        <Field label="First heading line" value={form.sectionContent.heroHeading1}
                            onChange={(v) => updateSectionContent("heroHeading1", v)} />
                        <Field label="Second heading line" value={form.sectionContent.heroHeading2}
                            onChange={(v) => updateSectionContent("heroHeading2", v)} />
                    </div>
                    <Field label="Hero description" multiline value={form.sectionContent.heroDescription}
                        onChange={(v) => updateSectionContent("heroDescription", v)} />

                    <h3 style={{ fontWeight: 700, margin: "18px 0 12px" }}>Floating Chips</h3>
                    {form.heroChips.map((chip, i) => (
                        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
                            <div style={inputGrid}>
                                <Field label="Label" value={chip.label}
                                    onChange={(v) => updateField("heroChips", i, "label", v)} />
                                <Field label="Value" value={chip.value}
                                    onChange={(v) => updateField("heroChips", i, "value", v)} />
                            </div>
                            <Field label="SVG icon path (keep existing path if unsure)" value={chip.icon}
                                onChange={(v) => updateField("heroChips", i, "icon", v)} />
                            <button type="button" onClick={() => removeItem("heroChips", i)}>Remove chip</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("heroChips", {
                        label: "New label", value: "New value", icon: "",
                        pos: "top-[5%] left-[8%]", box: "border-gm-teal/10",
                        color: "text-gm-teal", style: undefined,
                    })}>+ Add Chip</button>
                </EditorSection>

                <EditorSection title="Our Story — Milestones">
                    <Field label="Section label" value={form.sectionContent.storyLabel}
                        onChange={(v) => updateSectionContent("storyLabel", v)} />
                    {form.milestones.map((item, i) => (
                        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: "18px", marginTop: "18px" }}>
                            <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>Milestone {i + 1}</h3>
                            <div style={inputGrid}>
                                <Field label="Year" value={item.year}
                                    onChange={(v) => updateField("milestones", i, "year", v)} />
                                <Field label="Tag" value={item.tag}
                                    onChange={(v) => updateField("milestones", i, "tag", v)} />
                            </div>
                            <Field label="Timeline context" value={item.context}
                                onChange={(v) => updateField("milestones", i, "context", v)} />
                            <div style={inputGrid}>
                                {[0, 1, 2].map((part) => (
                                    <Field key={part} label={`Title part ${part + 1}`}
                                        value={item.title?.[part] || ""}
                                        onChange={(v) => updateTitlePart("milestones", i, part, v)} />
                                ))}
                            </div>
                            <Field label="Description" multiline value={item.body}
                                onChange={(v) => updateField("milestones", i, "body", v)} />
                            <button type="button" onClick={() => removeItem("milestones", i)}>Remove milestone</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("milestones", {
                        year: "2027", tag: "New Milestone", context: "",
                        title: ["", "", ""], body: "",
                    })}>+ Add Milestone</button>
                </EditorSection>

                <EditorSection title="Six Ways We Create Value">
                    <div style={inputGrid}>
                        <Field label="Section label" value={form.sectionContent.waysLabel}
                            onChange={(v) => updateSectionContent("waysLabel", v)} />
                        <Field label="Section heading" value={form.sectionContent.waysHeading}
                            onChange={(v) => updateSectionContent("waysHeading", v)} />
                    </div>
                    {form.ways.map((item, i) => (
                        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
                            <h3 style={{ fontWeight: 700 }}>Way {i + 1}</h3>
                            <div style={inputGrid}>
                                {[0, 1, 2].map((part) => (
                                    <Field key={part} label={`Title part ${part + 1}`}
                                        value={item.title?.[part] || ""}
                                        onChange={(v) => updateTitlePart("ways", i, part, v)} />
                                ))}
                            </div>
                            <Field label="Description" multiline value={item.body}
                                onChange={(v) => updateField("ways", i, "body", v)} />
                            <Field label="SVG icon path" value={item.icon}
                                onChange={(v) => updateField("ways", i, "icon", v)} />
                            <button type="button" onClick={() => removeItem("ways", i)}>Remove card</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("ways", {
                        title: ["New ", "value", ""], body: "", icon: "", gradient: "bg-gradient-to-br from-gm-teal to-gm-green",
                    })}>+ Add Way</button>
                </EditorSection>

                <EditorSection title="Our Values">
                    <div style={inputGrid}>
                        <Field label="Section label" value={form.sectionContent.valuesLabel}
                            onChange={(v) => updateSectionContent("valuesLabel", v)} />
                        <Field label="Section heading" value={form.sectionContent.valuesHeading}
                            onChange={(v) => updateSectionContent("valuesHeading", v)} />
                    </div>
                    {form.values.map((item, i) => (
                        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
                            <Field label="Title" value={item.title}
                                onChange={(v) => updateField("values", i, "title", v)} />
                            <Field label="Description" multiline value={item.body}
                                onChange={(v) => updateField("values", i, "body", v)} />
                            <button type="button" onClick={() => removeItem("values", i)}>Remove value</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("values", {
                        title: "New Value", body: "", delay: "0.1s",
                    })}>+ Add Value</button>
                </EditorSection>

                <EditorSection title="Delivery Philosophy">
                    <Field label="Section label" value={form.sectionContent.philosophyLabel}
                        onChange={(v) => updateSectionContent("philosophyLabel", v)} />
                    <Field label="Section heading" value={form.sectionContent.philosophyHeading}
                        onChange={(v) => updateSectionContent("philosophyHeading", v)} />
                    <Field label="Intro description" multiline value={form.sectionContent.philosophyDescription}
                        onChange={(v) => updateSectionContent("philosophyDescription", v)} />
                    {form.philSteps.map((item, i) => (
                        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
                            <Field label="Step title" value={item.title}
                                onChange={(v) => updateField("philSteps", i, "title", v)} />
                            <Field label="Card description" multiline value={item.body}
                                onChange={(v) => updateField("philSteps", i, "body", v)} />
                            <Field label="Animated description" multiline value={item.desc}
                                onChange={(v) => updateField("philSteps", i, "desc", v)} />
                            <button type="button" onClick={() => removeItem("philSteps", i)}>Remove step</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("philSteps", {
                        title: "New Step", body: "", desc: "",
                    })}>+ Add Step</button>
                </EditorSection>

                <EditorSection title="By the Numbers — Statistics">
                    <Field label="Section label" value={form.sectionContent.statsLabel}
                        onChange={(v) => updateSectionContent("statsLabel", v)} />
                    <Field label="Section heading" value={form.sectionContent.statsHeading}
                        onChange={(v) => updateSectionContent("statsHeading", v)} />
                    {form.stats.map((item, i) => (
                        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
                            <div style={inputGrid}>
                                <Field label="Number (digits only)" value={item.target}
                                    onChange={(v) => updateField("stats", i, "target", v === "" ? "" : Number(v))} />
                                <Field label="Suffix (e.g. + or %)" value={item.suffix}
                                    onChange={(v) => updateField("stats", i, "suffix", v)} />
                                <Field label="Label" value={item.label}
                                    onChange={(v) => updateField("stats", i, "label", v)} />
                            </div>
                            <Field label="Accessible description" value={item.aria}
                                onChange={(v) => updateField("stats", i, "aria", v)} />
                            <button type="button" onClick={() => removeItem("stats", i)}>Remove statistic</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("stats", {
                        target: 0, suffix: "", label: "New statistic", aria: "New statistic",
                    })}>+ Add Statistic</button>
                </EditorSection>

                <EditorSection title="Careers and Call to Action">
                    <Field label="Careers label" value={form.sectionContent.careersLabel}
                        onChange={(v) => updateSectionContent("careersLabel", v)} />
                    <Field label="Careers heading" value={form.sectionContent.careersHeading}
                        onChange={(v) => updateSectionContent("careersHeading", v)} />
                    <Field label="Careers description" multiline value={form.sectionContent.careersDescription}
                        onChange={(v) => updateSectionContent("careersDescription", v)} />
                    <Field label="Careers button text" value={form.sectionContent.careersButton}
                        onChange={(v) => updateSectionContent("careersButton", v)} />
                    <Field label="CTA label" value={form.sectionContent.ctaLabel}
                        onChange={(v) => updateSectionContent("ctaLabel", v)} />
                    <Field label="CTA heading" value={form.sectionContent.ctaHeading}
                        onChange={(v) => updateSectionContent("ctaHeading", v)} />
                    <Field label="CTA description" multiline value={form.sectionContent.ctaDescription}
                        onChange={(v) => updateSectionContent("ctaDescription", v)} />
                    <Field label="CTA button text" value={form.sectionContent.ctaButton}
                        onChange={(v) => updateSectionContent("ctaButton", v)} />
                </EditorSection>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        background: "#0B2447",
                        color: "#fff",
                        border: 0,
                        borderRadius: "8px",
                        padding: "13px 24px",
                        fontWeight: 700,
                        cursor: saving ? "wait" : "pointer",
                        marginBottom: "30px",
                    }}
                >
                    {saving ? "Saving..." : "Save All About Changes"}
                </button>
            </div>
        </form>
    );
}