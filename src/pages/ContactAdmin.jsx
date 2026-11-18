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

const API = "http://localhost:5000/api/contact-page";

// Sends the admin token. Change the key name to match your login.
function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
}

const DEFAULT_INTERESTS = [
    "AI Solutions",
    "Research & Advisory",
    "Product Demo (HRMS / TutorWand / WCSchool)",
    "Custom Product Development",
    "Digital Transformation",
    "Cloud & Data Engineering",
    "Engineering Services",
    "General Inquiry",
];

// Fills in missing keys so every field has a value to show.
function mergeContact(data = {}) {
    return {
        hero: {
            titleLine1: "Let's",
            titleHighlight: "Talk",
            description:
                "Whether you're exploring AI adoption, need research to inform a decision, want a product demo, or are planning a digital initiative — we'd like to hear about it.",
            ...(data.hero || {}),
        },
        form: {
            heading: "Tell us what's",
            headingHighlight: "on your mind.",
            description:
                "A sentence about the problem, a sentence about your timeline, a sentence about you. That's enough to start. We'll reply with questions, not a pitch.",
            submitText: "Send Message",
            ...(data.form || {}),
            interestOptions:
                Array.isArray(data.form?.interestOptions) && data.form.interestOptions.length
                    ? data.form.interestOptions
                    : DEFAULT_INTERESTS,
        },
        methods:
            Array.isArray(data.methods) && data.methods.length
                ? data.methods
                : [
                    { kicker: "Sales & General", value: "admin@webcraft.co.in", note: "New projects, partnerships, general enquiries.", href: "mailto:admin@webcraft.co.in" },
                    { kicker: "Careers", value: "hr@webcraftit.com", note: "Open roles, internships, applications.", href: "mailto:hr@webcraftit.com" },
                    { kicker: "LinkedIn", value: "linkedin.com/company/webcraft-it", note: "Follow for research & case notes.", href: "https://www.linkedin.com/company/webcraft-it/" },
                    { kicker: "Instagram", value: "instagram.com/webcraftitcompany", note: "Behind-the-scenes, culture & team.", href: "https://www.instagram.com/webcraftitcompany/" },
                    { kicker: "Facebook", value: "facebook.com/webcraftit", note: "Updates, events & community.", href: "https://www.facebook.com/webcraftit/" },
                    { kicker: "Pinterest", value: "pinterest.com/webcraftit0045", note: "Design inspiration & mood boards.", href: "https://in.pinterest.com/webcraftit0045/" },
                ],
        process: {
            label: "What Happens Next",
            heading: "After you",
            headingHighlight: "hit send.",
            description:
                "Three steps. No sales sequence. No \"just circling back\" follow-ups you didn't ask for.",
            ...(data.process || {}),
            steps:
                Array.isArray(data.process?.steps) && data.process.steps.length
                    ? data.process.steps
                    : [
                        { title: "You write.", body: "As much or as little as you like. A single paragraph is enough to start — we'll ask the rest over a call." },
                        { title: "We reply.", body: "Within one business day — usually sooner. From a real person, not an automated acknowledgement." },
                        { title: "We talk.", body: "A 45-minute first call, free, off the record. No presentation. No commitment. Just clarity for both of us." },
                    ],
        },
    };
}

// Required fields, as paths into the form.
const REQUIRED_FIELDS = [
    ["hero", "titleLine1"],
    ["hero", "titleHighlight"],
    ["hero", "description"],
    ["form", "heading"],
    ["form", "submitText"],
    ["process", "heading"],
];

function validateContact(form) {
    const missing = REQUIRED_FIELDS.some((path) =>
        isBlank(path.reduce((object, key) => object?.[key], form))
    );
    return missing
        ? "Some required fields are empty. Please fill in all fields marked with *."
        : "";
}

export default function ContactAdmin() {
    const [page, setPage] = useState(() => mergeContact());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [pendingRemove, setPendingRemove] = useState(null); // { type: "option" | "method", index, label }

    async function loadPage() {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error("Failed to load Contact content");
            const data = await response.json();
            setPage(mergeContact(data.page || {}));
        } catch (err) {
            setError(err.message || "Failed to load Contact content");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPage();
    }, []);

    // set("hero.titleLine1", "New text") or set("methods", newList)
    function set(path, value) {
        setPage((previous) => {
            const next = structuredClone(previous);
            const keys = path.split(".");
            let object = next;
            keys.slice(0, -1).forEach((key) => {
                object = object[key];
            });
            object[keys.at(-1)] = value;
            return next;
        });
    }

    // Binds a field to a path, e.g. bind("hero.titleLine1")
    const bind = (path) => ({
        value: path.split(".").reduce((object, key) => object?.[key], page) ?? "",
        onChange: (v) => set(path, v),
    });

    // Runs after the user confirms the remove dialog
    function confirmRemove() {
        if (!pendingRemove) return;
        const { type, index } = pendingRemove;
        setPendingRemove(null);

        if (type === "option") {
            set(
                "form.interestOptions",
                page.form.interestOptions.filter((_, i) => i !== index)
            );
        } else if (type === "method") {
            set(
                "methods",
                page.methods.filter((_, i) => i !== index)
            );
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationError = validateContact(page);
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
                headers: authHeaders(),
                body: JSON.stringify(page),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Failed to save Contact content");
            }

            setPage(mergeContact(data.page || page));
            setMessage("Contact content updated successfully!");
            notify("success", "Contact page saved successfully!");
        } catch (err) {
            setError(err.message || "Failed to save Contact content");
            notify("error", err.message || "Failed to save Contact content");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading Contact CMS...
            </p>
        );
    }

    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <PageTitle name="Contact Page" intro="Edit your Contact page content from one place." />

                <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO */}
                    <CollapsibleSection id="hero" title="Hero Content">
                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" required {...bind("hero.titleLine1")} />
                            <Field label="Highlight (gradient)" required {...bind("hero.titleHighlight")} />
                        </div>
                        <Field label="Description" required multiline {...bind("hero.description")} />
                    </CollapsibleSection>

                    {/* FORM */}
                    <CollapsibleSection id="form" title="Contact Form">
                        <div className={INPUT_GRID}>
                            <Field label="Form Heading" required {...bind("form.heading")} />
                            <Field label="Form Highlight" {...bind("form.headingHighlight")} />
                        </div>
                        <Field label="Form Description" multiline {...bind("form.description")} />
                        <Field label="Submit Button Text" required {...bind("form.submitText")} />

                        <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                            Interest Options (dropdown)
                        </h4>

                        {page.form.interestOptions.map((option, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={option || `Option ${index + 1}`}
                                    onRemove={() =>
                                        setPendingRemove({
                                            type: "option",
                                            index,
                                            label: option || `Option ${index + 1}`,
                                        })
                                    }
                                />
                                <Field
                                    label="Option Text"
                                    value={option}
                                    onChange={(v) => set(`form.interestOptions.${index}`, v)}
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() => set("form.interestOptions", [...page.form.interestOptions, ""])}
                        >
                            + Add Option
                        </button>
                    </CollapsibleSection>

                    {/* CONTACT METHODS */}
                    <CollapsibleSection id="methods" title="Contact Methods">
                        {page.methods.map((method, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={method.kicker || `Contact ${index + 1}`}
                                    onRemove={() =>
                                        setPendingRemove({
                                            type: "method",
                                            index,
                                            label: method.kicker || `Contact ${index + 1}`,
                                        })
                                    }
                                />
                                <div className={INPUT_GRID}>
                                    <Field label="Small Label" value={method.kicker ?? ""} onChange={(v) => set(`methods.${index}.kicker`, v)} />
                                    <Field label="Value (shown big)" value={method.value ?? ""} onChange={(v) => set(`methods.${index}.value`, v)} />
                                </div>
                                <Field label="Note" value={method.note ?? ""} onChange={(v) => set(`methods.${index}.note`, v)} />
                                <Field label="Link (mailto: or https://)" value={method.href ?? ""} onChange={(v) => set(`methods.${index}.href`, v)} />
                            </div>
                        ))}

                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={() =>
                                set("methods", [...page.methods, { kicker: "", value: "", note: "", href: "" }])
                            }
                        >
                            + Add Contact Method
                        </button>
                    </CollapsibleSection>

                    {/* PROCESS */}
                    <CollapsibleSection id="process" title="What Happens Next">
                        <Field label="Small Label" {...bind("process.label")} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading" required {...bind("process.heading")} />
                            <Field label="Highlight" {...bind("process.headingHighlight")} />
                        </div>
                        <Field label="Description" multiline {...bind("process.description")} />

                        {page.process.steps.map((step, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                    Step {index + 1}
                                </h4>
                                <Field label="Title" value={step.title ?? ""} onChange={(v) => set(`process.steps.${index}.title`, v)} />
                                <Field label="Body" multiline value={step.body ?? ""} onChange={(v) => set(`process.steps.${index}.body`, v)} />
                            </div>
                        ))}
                    </CollapsibleSection>

                    <SaveBar saving={saving} error={error} message={message} />
                </form>
            </div>

            {pendingRemove && (
                <ConfirmDialog
                    title={pendingRemove.type === "option" ? "Remove option?" : "Remove contact method?"}
                    message={`Are you sure you want to delete "${pendingRemove.label}"? The change will be applied when you click Save Changes.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmRemove}
                    onCancel={() => setPendingRemove(null)}
                />
            )}
        </main>
    );
}