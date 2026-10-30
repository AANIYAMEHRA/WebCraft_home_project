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
    isBlank,
    itemClass,
    itemStyle,
    labelStyle,
    pageStyle,
    secondaryButtonClass,
    outlineButtonStyle,
} from "../components/AdminUi";

const API = "http://localhost:5000/api/research";

// Read and write a value at a path such as ["practices", 2, "title"].
function getIn(object, path) {
    return path.reduce((value, key) => (value == null ? undefined : value[key]), object);
}

// Returns a copy of object with the value at path replaced.
function setIn(object, path, value) {
    if (path.length === 0) return value;
    const [key, ...rest] = path;
    const copy = Array.isArray(object) ? [...object] : { ...object };
    copy[key] = setIn(object?.[key], rest, value);
    return copy;
}

// Returns an error message when a mandatory field is empty or a chart value is invalid.
function validateResearch(form) {
    const required = [
        form.hero.headline?.[0],
        form.hero.headline?.[1],
        form.method.heading?.accent,
        form.cta.title?.before,
        form.cta.title?.accent,
    ];

    if (required.some(isBlank)) {
        return "Some required fields are empty. Please fill in all fields marked with *.";
    }

    const badRow = form.chart.rows.some(
        (row) => isBlank(row.label) || !/^\d+$/.test(String(row.value ?? "")) || Number(row.value) > 100
    );

    return badRow ? "Each chart row needs a label and a whole-number value from 0 to 100." : "";
}

const CHART_ROW = { label: "New blocker", value: "50" };
const ENGAGE_ITEM = { title: "New point", body: "Describe this point." };
const SPEC = ["Label", "Value"];
const SEGMENT = { text: "New text", em: false };
const QUOTE = { text: "New quote", source: "Interview · P00 · Sector" };
const FEATURE = "New feature";

export default function ResearchAdmin() {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [pendingRemove, setPendingRemove] = useState(null);

    useEffect(() => {
        let active = true;

        async function loadResearch() {
            try {
                const response = await fetch(API);
                if (!response.ok) throw new Error("Could not load Research content.");

                const data = await response.json();
                if (active) setForm(data.research);
            } catch (err) {
                if (active) setError(err.message || "Failed to load content.");
            } finally {
                if (active) setLoading(false);
            }
        }

        loadResearch();
        return () => {
            active = false;
        };
    }, []);

    const set = (path, value) => setForm((previous) => setIn(previous, path, value));
    const bind = (path) => ({ value: getIn(form, path), onChange: (value) => set(path, value) });
    const bindItem = (path, index, key) => bind([...path, index, key]);

    function addItem(path, item) {
        setForm((previous) => setIn(previous, path, [...getIn(previous, path), item]));
    }

    // Asks for confirmation first; the item is removed by confirmRemove.
    function askRemove(path, index, noun) {
        setPendingRemove({ path, index, noun });
    }

    function confirmRemove() {
        const { path, index } = pendingRemove;
        setPendingRemove(null);
        setForm((previous) =>
            setIn(previous, path, getIn(previous, path).filter((_, i) => i !== index))
        );
    }

    // A list the layout can grow and shrink: each item has a remove button and there is an add button.
    function renderList(path, noun, makeItem, renderFields) {
        const items = getIn(form, path) || [];

        return (
            <>
                {items.map((_, i) => (
                    <div key={i} className={itemClass} style={itemStyle}>
                        <ItemHeader title={`${noun} ${i + 1}`} onRemove={() => askRemove(path, i, noun)} />
                        {renderFields(i)}
                    </div>
                ))}
                <button
                    type="button"
                    className={secondaryButtonClass}
                    style={outlineButtonStyle}
                    onClick={() => addItem(path, makeItem())}
                >
                    + Add {noun}
                </button>
            </>
        );
    }

    // A list with a fixed number of items (the layout expects exactly this many).
    function renderFixed(path, noun, renderFields) {
        const items = getIn(form, path) || [];

        return items.map((_, i) => (
            <div key={i} className={itemClass} style={itemStyle}>
                <h4 className="font-bold" style={{ ...labelStyle, fontSize: SIZE.label }}>
                    {noun} {i + 1}
                </h4>
                {renderFields(i)}
            </div>
        ));
    }

    if (loading) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading Research CMS...
            </p>
        );
    }

    if (!form) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body, color: "#dc2626" }}>
                {error || "Could not load Research content."}
            </p>
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationError = validateResearch(form);

        if (validationError) {
            setError(validationError);
            setMessage("");
            notify("error", validationError);
            return;
        }

        // Chart values are typed as text in the form; the page needs numbers.
        const payload = {
            ...form,
            chart: {
                ...form.chart,
                rows: form.chart.rows.map((row) => ({ label: row.label, value: Number(row.value) })),
            },
        };

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(API, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not save Research content.");
            }

            if (data.research) setForm(data.research);

            setMessage("Research page content saved successfully.");
            notify("success", "Research page saved successfully!");
        } catch (err) {
            setError(err.message || "Failed to save content.");
            notify("error", err.message || "Failed to save content.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <PageTitle name="Research Page" intro="Edit the Research page content and save your changes." />

                <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO */}
                    <CollapsibleSection id="hero" title="Hero Content">
                        <div className={INPUT_GRID}>
                            <Field label="First Heading Line" required {...bind(["hero", "headline", 0])} />
                            <Field label="Second Heading Line" required {...bind(["hero", "headline", 1])} />
                        </div>
                        <Field label="Tag" {...bind(["hero", "tag"])} />
                        <Field label="Hero Description" multiline {...bind(["hero", "body"])} />
                        <Field label="Button Label" {...bind(["hero", "cta", "label"])} />

                        <h3 className="pt-4 font-bold" style={{ ...labelStyle, fontSize: SIZE.label }}>Hero Chips</h3>
                        {renderFixed(["hero", "chips"], "Chip", (i) => (
                            <div className={INPUT_GRID}>
                                <Field label="Label" {...bindItem(["hero", "chips"], i, "label")} />
                                <Field label="Value" {...bindItem(["hero", "chips"], i, "value")} />
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* MANIFESTO */}
                    <CollapsibleSection id="manifesto" title="Our Position (Manifesto)">
                        <Field label="Tag" {...bind(["manifesto", "tag"])} />
                        {renderList(["manifesto", "segments"], "Text Part", () => ({ ...SEGMENT }), (i) => (
                            <>
                                <Field
                                    label="Text"
                                    multiline
                                    {...bindItem(["manifesto", "segments"], i, "text")}
                                />
                                <label className="flex items-center gap-2 text-[15px]" style={labelStyle}>
                                    <input
                                        type="checkbox"
                                        checked={!!getIn(form, ["manifesto", "segments", i, "em"])}
                                        onChange={(event) =>
                                            set(["manifesto", "segments", i, "em"], event.target.checked)
                                        }
                                    />
                                    Highlight this part (italic teal)
                                </label>
                            </>
                        ))}
                    </CollapsibleSection>

                    {/* PRACTICES */}
                    <CollapsibleSection id="practices" title="Four Practices">
                        <div className={INPUT_GRID}>
                            <Field label="Section Tag" {...bind(["practicesIntro", "tag"])} />
                        </div>
                        <div className={INPUT_GRID}>
                            <Field label="Heading (before)" {...bind(["practicesIntro", "heading", "before"])} />
                            <Field label="Heading (highlighted)" {...bind(["practicesIntro", "heading", "accent"])} />
                        </div>
                        <Field label="Heading (after)" {...bind(["practicesIntro", "heading", "after"])} />
                        <Field label="Intro Paragraph" multiline {...bind(["practicesIntro", "body"])} />

                        {renderFixed(["practices"], "Practice", (p) => (
                            <>
                                <div className={INPUT_GRID}>
                                    <Field label="Tag" {...bindItem(["practices"], p, "tag")} />
                                    <Field label="Title" {...bindItem(["practices"], p, "title")} />
                                    <Field label="Highlighted Word" {...bindItem(["practices"], p, "accent")} />
                                </div>
                                <Field label="Body" multiline {...bindItem(["practices"], p, "body")} />

                                <h5 className="font-bold" style={{ ...labelStyle, fontSize: SIZE.label }}>Features</h5>
                                {renderList(
                                    ["practices", p, "features"],
                                    "Feature",
                                    () => FEATURE,
                                    (f) => (
                                        <Field label="Feature" {...bind(["practices", p, "features", f])} />
                                    )
                                )}

                                {getIn(form, ["practices", p, "quotes"]) && (
                                    <>
                                        <h5 className="font-bold" style={{ ...labelStyle, fontSize: SIZE.label }}>Quotes</h5>
                                        {renderList(
                                            ["practices", p, "quotes"],
                                            "Quote",
                                            () => ({ ...QUOTE }),
                                            (q) => (
                                                <>
                                                    <Field
                                                        label="Quote"
                                                        multiline
                                                        {...bindItem(["practices", p, "quotes"], q, "text")}
                                                    />
                                                    <Field
                                                        label="Source"
                                                        {...bindItem(["practices", p, "quotes"], q, "source")}
                                                    />
                                                </>
                                            )
                                        )}
                                    </>
                                )}
                            </>
                        ))}
                    </CollapsibleSection>

                    {/* METHOD */}
                    <CollapsibleSection id="method" title="The Research Method">
                        <Field label="Section Tag" {...bind(["method", "tag"])} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading (before)" {...bind(["method", "heading", "before"])} />
                            <Field label="Heading (highlighted)" required {...bind(["method", "heading", "accent"])} />
                        </div>
                        <Field label="Heading (after)" {...bind(["method", "heading", "after"])} />
                        <Field label="Intro Paragraph" multiline {...bind(["method", "intro"])} />

                        {renderFixed(["method", "stages"], "Stage", (s) => (
                            <>
                                <Field label="Title" {...bindItem(["method", "stages"], s, "title")} />
                                <Field label="Short Text (on the card)" multiline {...bindItem(["method", "stages"], s, "short")} />
                                <Field label="Long Text (shown when scrolled to)" multiline {...bindItem(["method", "stages"], s, "long")} />
                            </>
                        ))}
                    </CollapsibleSection>

                    {/* DELIVERABLES */}
                    <CollapsibleSection id="deliverables" title="Deliverables">
                        <Field label="Section Tag" {...bind(["deliverablesIntro", "tag"])} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading (before)" {...bind(["deliverablesIntro", "heading", "before"])} />
                            <Field label="Heading (highlighted)" {...bind(["deliverablesIntro", "heading", "accent"])} />
                        </div>
                        <Field label="Intro Paragraph" multiline {...bind(["deliverablesIntro", "body"])} />

                        {renderFixed(["deliverables"], "Deliverable", (d) => (
                            <>
                                <div className={INPUT_GRID}>
                                    <Field label="Number Label" {...bindItem(["deliverables"], d, "number")} />
                                    <Field label="Title" {...bindItem(["deliverables"], d, "title")} />
                                </div>
                                <Field label="Highlighted Words" {...bindItem(["deliverables"], d, "accent")} />
                                <Field label="Body" multiline {...bindItem(["deliverables"], d, "body")} />

                                <h5 className="font-bold" style={{ ...labelStyle, fontSize: SIZE.label }}>Specs</h5>
                                {renderList(
                                    ["deliverables", d, "specs"],
                                    "Spec",
                                    () => [...SPEC],
                                    (s) => (
                                        <div className={INPUT_GRID}>
                                            <Field label="Label" {...bind(["deliverables", d, "specs", s, 0])} />
                                            <Field label="Value" {...bind(["deliverables", d, "specs", s, 1])} />
                                        </div>
                                    )
                                )}
                            </>
                        ))}
                    </CollapsibleSection>

                    {/* CHART */}
                    <CollapsibleSection id="chart" title="Blockers Chart">
                        <Field label="Section Tag" {...bind(["chart", "tag"])} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading (before)" {...bind(["chart", "heading", "before"])} />
                            <Field label="Heading (highlighted)" {...bind(["chart", "heading", "accent"])} />
                        </div>
                        <Field label="Heading (after)" {...bind(["chart", "heading", "after"])} />
                        <Field label="Intro Paragraph" multiline {...bind(["chart", "body"])} />
                        <Field label="Chart Title" {...bind(["chart", "title"])} />
                        <Field label="Sample Size Text" {...bind(["chart", "sampleSize"])} />

                        {renderList(["chart", "rows"], "Row", () => ({ ...CHART_ROW }), (r) => (
                            <div className={INPUT_GRID}>
                                <Field label="Label" required {...bindItem(["chart", "rows"], r, "label")} />
                                <Field label="Value (0–100)" required {...bindItem(["chart", "rows"], r, "value")} />
                            </div>
                        ))}

                        <Field label="Source Line" {...bind(["chart", "source"])} />
                        <Field label="Footnote" {...bind(["chart", "note"])} />
                    </CollapsibleSection>

                    {/* ENGAGE */}
                    <CollapsibleSection id="engage" title="When Research Helps">
                        <Field label="Section Tag" {...bind(["engage", "tag"])} />
                        <div className={INPUT_GRID}>
                            <Field label="Heading (before)" {...bind(["engage", "heading", "before"])} />
                            <Field label="Heading (highlighted)" {...bind(["engage", "heading", "accent"])} />
                        </div>
                        <Field label="Heading (after)" {...bind(["engage", "heading", "after"])} />

                        {["yes", "no"].map((side) => (
                            <div key={side} className="space-y-5 pt-4">
                                <h3 className="font-bold" style={{ ...labelStyle, fontSize: SIZE.label }}>
                                    {side === "yes" ? "When research is the right move" : "When research is probably not it"}
                                </h3>
                                <div className={INPUT_GRID}>
                                    <Field label="Title (before)" {...bind(["engage", side, "title", "before"])} />
                                    <Field label="Title (highlighted)" {...bind(["engage", side, "title", "accent"])} />
                                </div>
                                {renderList(
                                    ["engage", side, "items"],
                                    "Point",
                                    () => ({ ...ENGAGE_ITEM }),
                                    (k) => (
                                        <>
                                            <Field label="Title" {...bindItem(["engage", side, "items"], k, "title")} />
                                            <Field label="Body" multiline {...bindItem(["engage", side, "items"], k, "body")} />
                                        </>
                                    )
                                )}
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* CTA */}
                    <CollapsibleSection id="cta" title="CTA Section">
                        <Field label="Section Tag" {...bind(["cta", "tag"])} />
                        <div className={INPUT_GRID}>
                            <Field label="Title (before)" required {...bind(["cta", "title", "before"])} />
                            <Field label="Title (highlighted)" required {...bind(["cta", "title", "accent"])} />
                        </div>
                        <Field label="Body" multiline {...bind(["cta", "body"])} />
                        <Field label="Button Label" {...bind(["cta", "button", "label"])} />
                    </CollapsibleSection>

                    <SaveBar saving={saving} error={error} message={message} />
                </form>
            </div>

            {pendingRemove && (
                <ConfirmDialog
                    title={`Remove this ${pendingRemove.noun.toLowerCase()}?`}
                    message={`Are you sure you want to delete this ${pendingRemove.noun.toLowerCase()} from the Research page? The change will be applied when you click Save Changes.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmRemove}
                    onCancel={() => setPendingRemove(null)}
                />
            )}
        </main>
    );
}
