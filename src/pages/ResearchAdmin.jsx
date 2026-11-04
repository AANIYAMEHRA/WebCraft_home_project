import { useEffect, useState } from "react";
import { notify } from "../components/adminToast";
import CollapsibleSection from "../components/CollapsibleSection";
import {
  INPUT_GRID,
  PageTitle,
  SIZE,
  SaveBar,
  Field,
  IconUpload,
  ItemHeader,
  headingStyle,
  itemClass,
  itemStyle,
  pageStyle,
  secondaryButtonClass,
  outlineButtonStyle,
} from "../components/AdminUi";
import * as researchDefaults from "./researchData";

const API = "http://localhost:5000/api/research";

// Every top-level export of researchData.js that the CMS edits.
const SECTION_KEYS = [
  "hero",
  "manifesto",
  "practicesIntro",
  "practices",
  "method",
  "deliverablesIntro",
  "deliverables",
  "chart",
  "engage",
  "cta",
];

const TONE_OPTIONS = [
  { value: "teal", label: "Teal", swatch: "bg-gm-teal" },
  { value: "blue", label: "Blue", swatch: "bg-gm-blue" },
  { value: "green", label: "Green", swatch: "bg-gm-green" },
];

// Default icons shown in the upload box when a chip has no uploaded icon (same as the public page).
// Order matches the chip positions: user, market, report, insight.
const DEFAULT_CHIP_ICONS = [
  "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  "M12 3a9 9 0 100 18 9 9 0 000-18zm0 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 3.5a2 2 0 100 4 2 2 0 000-4z",
];

const clone = (value) => JSON.parse(JSON.stringify(value));

function buildDefaults() {
  return Object.fromEntries(
    SECTION_KEYS.map((key) => [key, clone(researchDefaults[key])])
  );
}

// Reads a value from a nested path, e.g. ["hero", "chips", 0, "label"].
function getIn(obj, path) {
  return path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

// Returns a copy of obj with the value at path replaced. Never mutates.
function setIn(obj, path, value) {
  const [head, ...rest] = path;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[head] = rest.length ? setIn(obj[head], rest, value) : value;
  return copy;
}

// Visual uploader for practice panels: drag-and-drop or click, live preview, and a clear status.
function ImageUpload({ value, onChange }) {
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  function readFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG, JPG, SVG or WEBP).");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("Image must be smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setError("");
      setFileName(file.name);
      onChange(String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    readFile(event.dataTransfer.files?.[0]);
  }

  function handleInput(event) {
    readFile(event.target.files?.[0]);
    event.target.value = "";
  }

  const hasImage = Boolean(value);

  return (
    <div className="space-y-3">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
          hasImage ? "bg-gm-teal/10 text-gm-teal" : "bg-gray-100 text-gray-500"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${hasImage ? "bg-gm-teal" : "bg-gray-400"}`} />
        {hasImage ? "Custom image is live on the site" : "Default diagram is live on the site"}
      </span>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
          dragging ? "border-gm-teal bg-gm-teal/5" : "border-gm-teal/20 bg-white"
        }`}
      >
        {hasImage ? (
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-gm-teal/5 sm:w-72">
              <img src={value} alt="Practice visual preview" className="h-full w-full object-contain p-4" />
            </div>

            <div className="flex-1 space-y-3">
              <p className="truncate text-sm font-semibold">{fileName || "Uploaded image"}</p>
              <p className="text-xs opacity-60">Drag a new image here, or use the buttons below.</p>

              <div className="flex flex-wrap gap-2">
                <label className="cursor-pointer rounded-full bg-gm-teal px-4 py-2 text-xs font-semibold text-white">
                  Replace
                  <input type="file" accept="image/*" onChange={handleInput} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFileName("");
                    onChange("");
                  }}
                  className="rounded-full border px-4 py-2 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 px-6 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gm-teal/10 text-gm-teal">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
            </span>
            <span className="text-sm font-semibold">Drop an image here, or click to browse</span>
            <span className="text-xs opacity-60">PNG, JPG, SVG or WEBP · max 3 MB</span>
            <input type="file" accept="image/*" onChange={handleInput} className="hidden" />
          </label>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function ResearchAdmin() {
  const [content, setContent] = useState(buildDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const response = await fetch(API);
        if (!response.ok) throw new Error("Failed to load Research content");

        const data = await response.json();
        if (active) {
          setContent({ ...buildDefaults(), ...(data.content || data) });
        }
      } catch (err) {
        if (active) setError(err.message || "Failed to load Research content");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadContent();
    return () => {
      active = false;
    };
  }, []);

  // Binds a text field to a path, e.g. bind(["hero", "tag"]).
  const bind = (path) => ({
    value: getIn(content, path) ?? "",
    onChange: (value) => setContent((prev) => setIn(prev, path, value)),
  });

  // Binds a number field (used for chart values).
  const bindNumber = (path) => ({
    value: String(getIn(content, path) ?? ""),
    onChange: (value) =>
      setContent((prev) => setIn(prev, path, Number(value) || 0)),
  });

  // Binds a list of strings shown as "a, b, c" (used for features).
  const bindList = (path) => ({
    value: (getIn(content, path) || []).join(", "),
    onChange: (value) =>
      setContent((prev) =>
        setIn(
          prev,
          path,
          value.split(",").map((s) => s.trim()).filter(Boolean)
        )
      ),
  });

  const addTo = (path, item) =>
    setContent((prev) =>
      setIn(prev, path, [...(getIn(prev, path) || []), item])
    );

  const removeAt = (path, index) =>
    setContent((prev) =>
      setIn(
        prev,
        path,
        (getIn(prev, path) || []).filter((_, i) => i !== index)
      )
    );

  // Three-part heading (before / accent / after) as three fields.
  const headingFields = (path, parts = ["before", "accent", "after"]) => (
    <div className={INPUT_GRID}>
      {parts.map((part) => (
        <Field
          key={part}
          label={`Heading: ${part} accent`}
          {...bind([...path, part])}
        />
      ))}
    </div>
  );

  const addButton = (text, onClick) => (
    <button
      type="button"
      className={secondaryButtonClass}
      style={outlineButtonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save Research content");
      }

      setContent({ ...buildDefaults(), ...(data.content || data) });
      setMessage("Research content updated successfully!");
      notify("success", "Research content saved successfully!");
    } catch (err) {
      setError(err.message || "Failed to save Research content");
      notify("error", err.message || "Failed to save Research content");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
        Loading Research CMS...
      </p>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8" style={pageStyle}>
      <div className="mx-auto max-w-5xl">
        <PageTitle
          name="Research Page"
          intro="Edit your Research page content from one place."
        />

        <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
          {/* HERO */}
          <CollapsibleSection id="hero" title="Hero Content">            <Field label="Tag" {...bind(["hero", "tag"])} />

            <Field label="Headline Line 1" {...bind(["hero", "headline", 0])} />
            <Field label="Headline Line 2" {...bind(["hero", "headline", 1])} />

            <Field label="Body" multiline {...bind(["hero", "body"])} />

            <div className={INPUT_GRID}>
              <Field label="Button Text" {...bind(["hero", "cta", "label"])} />
              <Field label="Button URL" {...bind(["hero", "cta", "href"])} />
            </div>

            <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>Hero Chips</h3>

            {content.hero.chips.map((chip, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Chip ${i + 1}`}
                  onRemove={() => removeAt(["hero", "chips"], i)}
                />

                <div className={INPUT_GRID}>
                  <Field label="Label" {...bind(["hero", "chips", i, "label"])} />
                  <Field label="Value" {...bind(["hero", "chips", i, "value"])} />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Tone</label>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-8 w-8 rounded-full border ${
                        TONE_OPTIONS.find((t) => t.value === chip.tone)?.swatch ?? "bg-gray-200"
                      }`}
                    />

                    <select
                      value={chip.tone ?? "teal"}
                      onChange={(event) =>
                        setContent((prev) =>
                          setIn(prev, ["hero", "chips", i, "tone"], event.target.value)
                        )
                      }
                      className="rounded-xl border bg-white px-4 py-3"
                    >
                      {TONE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <IconUpload
                  value={chip.icon || DEFAULT_CHIP_ICONS[i]}
                  onChange={(value) =>
                    setContent((prev) =>
                      setIn(prev, ["hero", "chips", i, "icon"], value)
                    )
                  }
                />
              </div>
            ))}

            {addButton("+ Add Chip", () =>
              addTo(["hero", "chips"], { label: "", value: "", tone: "teal", icon: "" })
            )}
          </CollapsibleSection>

          {/* MANIFESTO */}
          <CollapsibleSection id="manifesto" title="Our Position (Manifesto)">            <Field label="Tag" {...bind(["manifesto", "tag"])} />

            <p className="text-sm opacity-70">
              Each item is one text segment. Tick "Highlight" for emphasized text.
            </p>

            {content.manifesto.segments.map((segment, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Segment ${i + 1}`}
                  onRemove={() => removeAt(["manifesto", "segments"], i)}
                />
                <Field label="Text" multiline {...bind(["manifesto", "segments", i, "text"])} />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(segment.em)}
                    onChange={(event) =>
                      setContent((prev) =>
                        setIn(prev, ["manifesto", "segments", i, "em"], event.target.checked)
                      )
                    }
                  />
                  Highlight this text
                </label>
              </div>
            ))}

            {addButton("+ Add Segment", () =>
              addTo(["manifesto", "segments"], { text: "", em: false })
            )}
          </CollapsibleSection>

          {/* PRACTICES INTRO */}
          <CollapsibleSection id="practices-intro" title="Four Practices — Intro">            <Field label="Tag" {...bind(["practicesIntro", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["practicesIntro", "heading"])}
            <Field label="Body" multiline {...bind(["practicesIntro", "body"])} />
          </CollapsibleSection>

          {/* PRACTICES */}
          <CollapsibleSection id="practices" title="Practices">            {content.practices.map((practice, pi) => (
              <div key={practice.id} className={itemClass} style={itemStyle}>
                <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                  {practice.title} Research
                </h3>

                <div className={INPUT_GRID}>
                  <Field label="Tag" {...bind(["practices", pi, "tag"])} />
                  <Field label="Title" {...bind(["practices", pi, "title"])} />
                  <Field label="Accent Word" {...bind(["practices", pi, "accent"])} />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Visual image (shown on the site instead of the diagram)</p>
                    <ImageUpload
                      value={practice.image}
                      onChange={(value) =>
                        setContent((prev) =>
                          setIn(prev, ["practices", pi, "image"], value)
                        )
                      }
                    />
                  </div>
                </div>

                <Field label="Body" multiline {...bind(["practices", pi, "body"])} />
                <Field label="Features (comma-separated)" multiline {...bindList(["practices", pi, "features"])} />

                <h4 style={{ ...headingStyle, fontSize: SIZE.label }}>Quotes</h4>

                {(practice.quotes || []).map((quote, qi) => (
                  <div key={qi} className={itemClass} style={itemStyle}>
                    <ItemHeader
                      title={`Quote ${qi + 1}`}
                      onRemove={() => removeAt(["practices", pi, "quotes"], qi)}
                    />
                    <Field label="Quote" multiline {...bind(["practices", pi, "quotes", qi, "text"])} />
                    <Field label="Source" {...bind(["practices", pi, "quotes", qi, "source"])} />
                  </div>
                ))}

                {addButton("+ Add Quote", () =>
                  addTo(["practices", pi, "quotes"], { text: "", source: "" })
                )}
              </div>
            ))}
          </CollapsibleSection>

          {/* METHOD */}
          <CollapsibleSection id="method" title="The Research Method">            <Field label="Tag" {...bind(["method", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["method", "heading"])}
            <Field label="Intro" multiline {...bind(["method", "intro"])} />

            {content.method.stages.map((stage, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Stage ${i + 1}`}
                  onRemove={() => removeAt(["method", "stages"], i)}
                />
                <Field label="Title" {...bind(["method", "stages", i, "title"])} />
                <Field label="Short Description" multiline {...bind(["method", "stages", i, "short"])} />
                <Field label="Detailed Description" multiline {...bind(["method", "stages", i, "long"])} />
              </div>
            ))}

            {addButton("+ Add Stage", () =>
              addTo(["method", "stages"], { title: "", short: "", long: "" })
            )}
          </CollapsibleSection>

          {/* DELIVERABLES */}
          <CollapsibleSection id="deliverables-intro" title="Deliverables — Intro">            <Field label="Tag" {...bind(["deliverablesIntro", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent words are highlighted)</p>
            {headingFields(["deliverablesIntro", "heading"], ["before", "accent"])}
            <Field label="Body" multiline {...bind(["deliverablesIntro", "body"])} />
          </CollapsibleSection>

          <CollapsibleSection id="deliverables" title="Deliverables">            {content.deliverables.map((item, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                  {item.number}
                </h3>

                <div className={INPUT_GRID}>
                  <Field label="Number Label" {...bind(["deliverables", i, "number"])} />
                  <Field label="Title" {...bind(["deliverables", i, "title"])} />
                  <Field label="Accent Word" {...bind(["deliverables", i, "accent"])} />
                </div>

                <Field label="Body" multiline {...bind(["deliverables", i, "body"])} />

                <h4 style={{ ...headingStyle, fontSize: SIZE.label }}>Specs</h4>

                {item.specs.map((spec, si) => (
                  <div key={si} className={INPUT_GRID}>
                    <Field label="Spec Label" {...bind(["deliverables", i, "specs", si, 0])} />
                    <Field label="Spec Value" {...bind(["deliverables", i, "specs", si, 1])} />
                  </div>
                ))}
              </div>
            ))}
          </CollapsibleSection>

          {/* CHART */}
          <CollapsibleSection id="chart" title="From Our Research — Chart">            <Field label="Tag" {...bind(["chart", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["chart", "heading"])}
            <Field label="Body" multiline {...bind(["chart", "body"])} />

            <div className={INPUT_GRID}>
              <Field label="Chart Title" {...bind(["chart", "title"])} />
              <Field label="Sample Size" {...bind(["chart", "sampleSize"])} />
              <Field label="Source" {...bind(["chart", "source"])} />
              <Field label="Note" {...bind(["chart", "note"])} />
            </div>

            <h4 style={{ ...headingStyle, fontSize: SIZE.label }}>Bars</h4>

            {content.chart.rows.map((row, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Bar ${i + 1}`}
                  onRemove={() => removeAt(["chart", "rows"], i)}
                />
                <div className={INPUT_GRID}>
                  <Field label="Label" {...bind(["chart", "rows", i, "label"])} />
                  <Field label="Value (number)" {...bindNumber(["chart", "rows", i, "value"])} />
                </div>
              </div>
            ))}

            {addButton("+ Add Bar", () =>
              addTo(["chart", "rows"], { label: "", value: 0 })
            )}
          </CollapsibleSection>

          {/* ENGAGE */}
          <CollapsibleSection id="engage" title="Before You Engage">            <Field label="Tag" {...bind(["engage", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["engage", "heading"])}

            <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>Yes — When research helps</h3>
            {headingFields(["engage", "yes", "title"], ["before", "accent"])}
            {content.engage.yes.items.map((item, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Item ${i + 1}`}
                  onRemove={() => removeAt(["engage", "yes", "items"], i)}
                />
                <Field label="Title" {...bind(["engage", "yes", "items", i, "title"])} />
                <Field label="Body" multiline {...bind(["engage", "yes", "items", i, "body"])} />
              </div>
            ))}
            {addButton("+ Add Yes Item", () =>
              addTo(["engage", "yes", "items"], { title: "", body: "" })
            )}

            <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>No — When research is not the answer</h3>
            {headingFields(["engage", "no", "title"], ["before", "accent"])}
            {content.engage.no.items.map((item, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Item ${i + 1}`}
                  onRemove={() => removeAt(["engage", "no", "items"], i)}
                />
                <Field label="Title" {...bind(["engage", "no", "items", i, "title"])} />
                <Field label="Body" multiline {...bind(["engage", "no", "items", i, "body"])} />
              </div>
            ))}
            {addButton("+ Add No Item", () =>
              addTo(["engage", "no", "items"], { title: "", body: "" })
            )}
          </CollapsibleSection>

          {/* CTA */}
          <CollapsibleSection id="cta" title="Call To Action">            <Field label="Tag" {...bind(["cta", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["cta", "title"], ["before", "accent"])}
            <Field label="Body" multiline {...bind(["cta", "body"])} />
            <div className={INPUT_GRID}>
              <Field label="Button Text" {...bind(["cta", "button", "label"])} />
              <Field label="Button URL" {...bind(["cta", "button", "href"])} />
            </div>
          </CollapsibleSection>

          <SaveBar saving={saving} error={error} message={message} />
        </form>
      </div>
    </main>
  );
}