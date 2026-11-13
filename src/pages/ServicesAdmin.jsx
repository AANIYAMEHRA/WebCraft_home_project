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
import * as servicesDefaults from "./servicesData.js";

const API = "http://localhost:5000/api/services";

// Every section of servicesData.js that the CMS edits.
const SECTION_KEYS = [
  "hero",
  "capabilitiesIntro",
  "capabilities",
  "techStack",
  "engagementModels",
  "cases",
  "faq",
  "servicesCta",
];

const TONE_OPTIONS = [
  { value: "teal", label: "Teal", swatch: "bg-gm-teal" },
  { value: "blue", label: "Blue", swatch: "bg-gm-blue" },
  { value: "green", label: "Green", swatch: "bg-gm-green" },
];

const MAX_HERO_CHIPS = 4; // the hero has four floating chip positions

// Default icons shown in the upload box when a chip has no uploaded icon (same as the public page).
const DEFAULT_CHIP_ICONS = [
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  "M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 4.5l-4.5 15",
  "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
];

const clone = (value) => JSON.parse(JSON.stringify(value));

function buildDefaults() {
  return Object.fromEntries(
    SECTION_KEYS.map((key) => [key, clone(servicesDefaults[key])])
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

export default function ServicesAdmin() {
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
        if (!response.ok) throw new Error("Failed to load Services content");

        const data = await response.json();
        if (active) {
          setContent({ ...buildDefaults(), ...(data.content || data) });
        }
      } catch (err) {
        if (active) setError(err.message || "Failed to load Services content");
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

  // Binds a comma-separated list, e.g. the tech stack items.
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

  // Binds a list shown one item per line, e.g. the model points.
  const bindLines = (path) => ({
    value: (getIn(content, path) || []).join("\n"),
    onChange: (value) =>
      setContent((prev) =>
        setIn(
          prev,
          path,
          value.split("\n").map((s) => s.trim()).filter(Boolean)
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

  // Three-part heading (before / accent / after) as separate fields.
  const headingFields = (path, parts = ["before", "accent", "after"]) => (
    <div className={INPUT_GRID}>
      {parts.map((part) => (
        <Field
          key={part}
          label={`Heading: ${part}`}
          {...bind([...path, part])}
        />
      ))}
    </div>
  );

  const addButton = (text, onClick, disabled = false) => (
    <button
      type="button"
      className={secondaryButtonClass}
      style={outlineButtonStyle}
      onClick={onClick}
      disabled={disabled}
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
        throw new Error(data.message || "Failed to save Services content");
      }

      setContent({ ...buildDefaults(), ...(data.content || data) });
      setMessage("Services content updated successfully!");
      notify("success", "Services content saved successfully!");
    } catch (err) {
      setError(err.message || "Failed to save Services content");
      notify("error", err.message || "Failed to save Services content");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
        Loading Services CMS...
      </p>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8" style={pageStyle}>
      <div className="mx-auto max-w-5xl">
        <PageTitle
          name="Services Page"
          intro="Edit your Services page content from one place."
        />

        <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
          {/* HERO */}
          <CollapsibleSection id="hero" title="Hero Content">
            <Field label="Tag" {...bind(["hero", "tag"])} />

            <Field label="Headline Line 1" {...bind(["hero", "headline", 0])} />
            <Field label="Headline Line 2" {...bind(["hero", "headline", 1])} />

            <Field label="Body" multiline {...bind(["hero", "body"])} />

            <div className={INPUT_GRID}>
              <Field label="Button Text" {...bind(["hero", "cta", "label"])} />
              <Field label="Button URL" {...bind(["hero", "cta", "href"])} />
            </div>

            <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>Floating Chips</h3>

            {content.hero.chips.map((chip, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Chip ${i + 1}`}
                  onRemove={() => removeAt(["hero", "chips"], i)}
                />

                <div className={INPUT_GRID}>
                  <Field label="Number" {...bind(["hero", "chips", i, "label"])} />
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

            {addButton(
              "+ Add Chip",
              () => addTo(["hero", "chips"], { label: "", value: "", tone: "teal", icon: "" }),
              content.hero.chips.length >= MAX_HERO_CHIPS
            )}
          </CollapsibleSection>

          {/* CAPABILITIES INTRO */}
          <CollapsibleSection id="capabilities-intro" title="Six Capabilities - Intro">
            <Field label="Tag" {...bind(["capabilitiesIntro", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent words are highlighted)</p>
            {headingFields(["capabilitiesIntro", "title"])}
            <Field label="Body" multiline {...bind(["capabilitiesIntro", "body"])} />
          </CollapsibleSection>

          {/* CAPABILITIES LIST */}
          <CollapsibleSection id="capabilities" title="Capabilities">
            {content.capabilities.map((cap, ci) => (
              <div key={ci} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`${cap.num} · ${cap.name}`}
                  onRemove={() => removeAt(["capabilities"], ci)}
                />

                <div className={INPUT_GRID}>
                  <Field label="Number" {...bind(["capabilities", ci, "num"])} />
                  <Field label="Index Name" {...bind(["capabilities", ci, "name"])} />
                </div>

                <p className="text-sm opacity-70">Title (accent word is highlighted)</p>
                {headingFields(["capabilities", ci, "title"], ["before", "accent"])}

                <Field label="Pitch" multiline {...bind(["capabilities", ci, "pitch"])} />

                <h4 style={{ ...headingStyle, fontSize: SIZE.label }}>Sub-services</h4>

                {cap.subs.map((sub, si) => (
                  <div key={si} className={itemClass} style={itemStyle}>
                    <ItemHeader
                      title={`Sub-service ${si + 1}`}
                      onRemove={() => removeAt(["capabilities", ci, "subs"], si)}
                    />
                    <Field label="Title" {...bind(["capabilities", ci, "subs", si, "title"])} />
                    <Field label="Body" multiline {...bind(["capabilities", ci, "subs", si, "body"])} />
                  </div>
                ))}

                {addButton("+ Add Sub-service", () =>
                  addTo(["capabilities", ci, "subs"], { title: "", body: "" })
                )}
              </div>
            ))}

            {addButton("+ Add Capability", () =>
              addTo(["capabilities"], {
                num: String(content.capabilities.length + 1).padStart(2, "0"),
                name: "",
                title: { before: "", accent: "" },
                pitch: "",
                subs: [],
              })
            )}
          </CollapsibleSection>

          {/* TECH STACK */}
          <CollapsibleSection id="tech-stack" title="The Stack">
            <Field label="Tag" {...bind(["techStack", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["techStack", "title"])}
            <Field label="Tools (comma-separated)" multiline {...bindList(["techStack", "items"])} />
          </CollapsibleSection>

          {/* ENGAGEMENT MODELS */}
          <CollapsibleSection id="engagement-models" title="Engagement Models">
            <Field label="Tag" {...bind(["engagementModels", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["engagementModels", "title"])}

            {content.engagementModels.models.map((model, mi) => (
              <div key={mi} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Model ${model.kicker || mi + 1} · ${model.title}`}
                  onRemove={() => removeAt(["engagementModels", "models"], mi)}
                />

                <div className={INPUT_GRID}>
                  <Field label="Number" {...bind(["engagementModels", "models", mi, "kicker"])} />
                  <Field label="Title" {...bind(["engagementModels", "models", mi, "title"])} />
                </div>

                <Field label="Lede" multiline {...bind(["engagementModels", "models", mi, "lede"])} />
                <Field label="Points (one per line)" multiline {...bindLines(["engagementModels", "models", mi, "points"])} />
              </div>
            ))}

            {addButton("+ Add Model", () =>
              addTo(["engagementModels", "models"], { kicker: "", title: "", lede: "", points: [] })
            )}
          </CollapsibleSection>

          {/* CASES */}
          <CollapsibleSection id="cases" title="Selected Work">
            <Field label="Tag" {...bind(["cases", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["cases", "title"])}

            {content.cases.items.map((item, ci) => (
              <div key={ci} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Case ${item.num || ci + 1}`}
                  onRemove={() => removeAt(["cases", "items"], ci)}
                />

                <div className={INPUT_GRID}>
                  <Field label="Number" {...bind(["cases", "items", ci, "num"])} />
                  <Field label="Tag (e.g. Healthcare · AI)" {...bind(["cases", "items", ci, "tag"])} />
                </div>

                <p className="text-sm opacity-70">Case title (accent word is highlighted)</p>
                {headingFields(["cases", "items", ci, "title"])}

                <Field label="Body" multiline {...bind(["cases", "items", ci, "body"])} />

                <div className={INPUT_GRID}>
                  <Field label="Stat Value" {...bind(["cases", "items", ci, "stat", "value"])} />
                  <Field label="Stat Label" {...bind(["cases", "items", ci, "stat", "label"])} />
                </div>
              </div>
            ))}

            {addButton("+ Add Case", () =>
              addTo(["cases", "items"], {
                num: String(content.cases.items.length + 1).padStart(2, "0"),
                tag: "",
                title: { before: "", accent: "", after: "" },
                body: "",
                stat: { value: "", label: "" },
              })
            )}
          </CollapsibleSection>

          {/* FAQ */}
          <CollapsibleSection id="faq" title="FAQ">
            <Field label="Tag" {...bind(["faq", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent word is highlighted)</p>
            {headingFields(["faq", "title"])}

            {content.faq.items.map((item, i) => (
              <div key={i} className={itemClass} style={itemStyle}>
                <ItemHeader
                  title={`Question ${i + 1}`}
                  onRemove={() => removeAt(["faq", "items"], i)}
                />
                <Field label="Question" {...bind(["faq", "items", i, "q"])} />
                <Field label="Answer" multiline {...bind(["faq", "items", i, "a"])} />
              </div>
            ))}

            {addButton("+ Add Question", () =>
              addTo(["faq", "items"], { q: "", a: "" })
            )}
          </CollapsibleSection>

          {/* CTA */}
          <CollapsibleSection id="cta" title="Next Step (CTA)">
            <Field label="Tag" {...bind(["servicesCta", "tag"])} />
            <p className="text-sm opacity-70">Heading (accent words are highlighted)</p>
            {headingFields(["servicesCta", "title"], ["before", "accent"])}
            <Field label="Body" multiline {...bind(["servicesCta", "body"])} />
            <div className={INPUT_GRID}>
              <Field label="Button Text" {...bind(["servicesCta", "button", "label"])} />
              <Field label="Button URL" {...bind(["servicesCta", "button", "href"])} />
            </div>
            <Field label="Contact Email" {...bind(["servicesCta", "email"])} />
          </CollapsibleSection>

          <SaveBar saving={saving} error={error} message={message} />
        </form>
      </div>
    </main>
  );
}