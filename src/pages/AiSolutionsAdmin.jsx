
import { useEffect, useState } from "react";
import { notify } from "../components/adminToast";
import CollapsibleSection from "../components/CollapsibleSection";
import {
  COLORS,
  INPUT_GRID,
  PageTitle,
  SIZE,
  SaveBar,
  Field,
  headingStyle,
  itemClass,
  itemStyle,
  pageStyle,
  secondaryButtonClass,
  outlineButtonStyle,
} from "../components/AdminUi";

import {
  heroBadges,
  manifesto,
  panels,
  stackTags,
  orbitRings,
  philSteps,
} from "./aiSolutionsData";

const API = "http://localhost:5000/api/ai-solutions";

const DEFAULT_FORM = {
  hero: {
    label: "AI Solutions",
    heading: "Intelligent AI. Measurable Outcomes.",
    description: "",
    button1Text: "Book a Consultation",
    button1Url: "/contact",
    button2Text: "See Research Capabilities",
    button2Url: "/research",
    badges: heroBadges.map((badge) => ({ ...badge })),
  },
  manifesto: manifesto.map((item) => ({ ...item })),
  panels: panels.map((panel) => ({ ...panel })),
  techStack: {
    tags: [...stackTags],
    orbitRings: orbitRings.map((ring) => ({
      ...ring,
      items: ring.items.map((item) => ({ ...item })),
    })),
  },
  philosophy: {
    heading: "",
    steps: philSteps.map((step) => ({ ...step })),
  },
  cta: {
    heading: "Ready to apply AI to your business?",
    description: "",
    buttonText: "Book a Consultation",
    buttonUrl: "/contact",
  },
};

function mergeForm(data = {}) {
  const listOr = (list, fallback) =>
    Array.isArray(list) ? list : fallback;

  return {
    hero: {
      ...DEFAULT_FORM.hero,
      ...(data.hero || {}),
      badges: listOr(data.hero?.badges, DEFAULT_FORM.hero.badges).map(
        (badge, index) => ({
          ...DEFAULT_FORM.hero.badges[
            index % DEFAULT_FORM.hero.badges.length
          ],
          ...badge,
        })
      ),
    },

    manifesto: listOr(data.manifesto, DEFAULT_FORM.manifesto).map(
      (item) => ({ ...item })
    ),

    panels: listOr(data.panels, DEFAULT_FORM.panels).map(
      (panel, index) => ({
        ...DEFAULT_FORM.panels[index % DEFAULT_FORM.panels.length],
        ...panel,
      })
    ),

    techStack: {
      ...DEFAULT_FORM.techStack,
      ...(data.techStack || {}),
      tags: listOr(data.techStack?.tags, DEFAULT_FORM.techStack.tags),
      orbitRings: listOr(
        data.techStack?.orbitRings,
        DEFAULT_FORM.techStack.orbitRings
      ).map((ring, index) => ({
        ...DEFAULT_FORM.techStack.orbitRings[
          index % DEFAULT_FORM.techStack.orbitRings.length
        ],
        ...ring,
        items: Array.isArray(ring.items) ? ring.items : [],
      })),
    },

    philosophy: {
      ...DEFAULT_FORM.philosophy,
      ...(data.philosophy || {}),
      steps: listOr(
        data.philosophy?.steps,
        DEFAULT_FORM.philosophy.steps
      ).map((step, index) => ({
        ...DEFAULT_FORM.philosophy.steps[
          index % DEFAULT_FORM.philosophy.steps.length
        ],
        ...step,
      })),
    },

    cta: {
      ...DEFAULT_FORM.cta,
      ...(data.cta || {}),
    },
  };
}

export default function AiSolutionsAdmin() {
  const [form, setForm] = useState(() => mergeForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const response = await fetch(API);

        if (!response.ok) {
          throw new Error("Failed to load AI Solutions content");
        }

        const data = await response.json();

        if (active) {
          setForm(mergeForm(data));
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load AI Solutions content");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadContent();

    return () => {
      active = false;
    };
  }, []);

  function setHero(key, value) {
    setForm((previous) => ({
      ...previous,
      hero: { ...previous.hero, [key]: value },
    }));
  }

  function setSection(section, changes) {
    setForm((previous) => ({
      ...previous,
      [section]: { ...previous[section], ...changes },
    }));
  }

  function setItem(listKey, index, changes) {
    setForm((previous) => ({
      ...previous,
      [listKey]: previous[listKey].map((item, i) =>
        i === index ? { ...item, ...changes } : item
      ),
    }));
  }

  function setBadge(index, changes) {
    setForm((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        badges: previous.hero.badges.map((badge, i) =>
          i === index ? { ...badge, ...changes } : badge
        ),
      },
    }));
  }

  function setNestedItem(section, listKey, index, changes) {
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

  function setOrbitRing(index, changes) {
    setForm((previous) => ({
      ...previous,
      techStack: {
        ...previous.techStack,
        orbitRings: previous.techStack.orbitRings.map((ring, i) =>
          i === index ? { ...ring, ...changes } : ring
        ),
      },
    }));
  }

  function setOrbitItem(ringIndex, itemIndex, changes) {
    setForm((previous) => ({
      ...previous,
      techStack: {
        ...previous.techStack,
        orbitRings: previous.techStack.orbitRings.map((ring, i) =>
          i !== ringIndex
            ? ring
            : {
                ...ring,
                items: ring.items.map((item, j) =>
                  j === itemIndex ? { ...item, ...changes } : item
                ),
              }
        ),
      },
    }));
  }

  function setPhilosophyStep(index, changes) {
    setForm((previous) => ({
      ...previous,
      philosophy: {
        ...previous.philosophy,
        steps: previous.philosophy.steps.map((step, i) =>
          i === index ? { ...step, ...changes } : step
        ),
      },
    }));
  }

  function addPanel() {
    setForm((previous) => ({
      ...previous,
      panels: [
        ...previous.panels,
        {
          num: String(previous.panels.length + 1).padStart(2, "0"),
          title: "",
          body: "",
          numColor: "text-gm-blue",
          linkColor: "text-gm-blue",
          image: "",
          imageClass: "",
          imageLeft: false,
          border: true,
        },
      ],
    }));
  }

  function removePanel(index) {
    if (form.panels.length <= 1) {
      notify("error", "At least one service panel is required.");
      return;
    }

    setForm((previous) => ({
      ...previous,
      panels: previous.panels.filter((_, i) => i !== index),
    }));
  }

  function updateTags(value) {
    setSection("techStack", {
      tags: value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
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
        throw new Error(data.message || "Failed to save AI Solutions content");
      }

      setForm(mergeForm(data.content || data));
      setMessage("AI Solutions content updated successfully!");
      notify("success", "AI Solutions content saved successfully!");
    } catch (err) {
      setError(err.message || "Failed to save AI Solutions content");
      notify("error", err.message || "Failed to save AI Solutions content");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
        Loading AI Solutions CMS...
      </p>
    );
  }

  const heroField = (key) => ({
    value: form.hero[key] ?? "",
    onChange: (value) => setHero(key, value),
  });

  const ctaField = (key) => ({
    value: form.cta[key] ?? "",
    onChange: (value) => setSection("cta", { [key]: value }),
  });

  return (
    <main className="min-h-screen px-6 py-8" style={pageStyle}>
      <div className="mx-auto max-w-5xl">
        <PageTitle
          name="AI Solutions Page"
          intro="Edit your AI Solutions page content from one place."
        />

        <form
          id="admin-form"
          onSubmit={handleSubmit}
          className="space-y-10"
        >
          <CollapsibleSection id="hero" title="Hero Content">
            <Field label="Small Label" {...heroField("label")} />

            <Field
              label="Main Heading"
              required
              {...heroField("heading")}
            />

            <Field
              label="Description"
              multiline
              {...heroField("description")}
            />

            <div className={INPUT_GRID}>
              <Field
                label="First Button Text"
                {...heroField("button1Text")}
              />
              <Field
                label="First Button URL"
                {...heroField("button1Url")}
              />
              <Field
                label="Second Button Text"
                {...heroField("button2Text")}
              />
              <Field
                label="Second Button URL"
                {...heroField("button2Url")}
              />
            </div>

            <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
              Hero Badges
            </h3>

            {form.hero.badges.map((badge, index) => (
              <div key={index} className={itemClass} style={itemStyle}>
                <h4 style={{ ...headingStyle, fontSize: SIZE.label }}>
                  Badge {index + 1}
                </h4>

                <Field
                  label="Badge Label"
                  value={badge.label ?? ""}
                  onChange={(value) => setBadge(index, { label: value })}
                />

                <div className={INPUT_GRID}>
                  <Field
                    label="Position Classes"
                    value={badge.pos ?? ""}
                    onChange={(value) => setBadge(index, { pos: value })}
                  />
                  <Field
                    label="Icon Background Classes"
                    value={badge.iconBg ?? ""}
                    onChange={(value) => setBadge(index, { iconBg: value })}
                  />
                  <Field
                    label="Border Classes"
                    value={badge.border ?? ""}
                    onChange={(value) => setBadge(index, { border: value })}
                  />
                  <Field
                    label="Shadow Classes"
                    value={badge.shadow ?? ""}
                    onChange={(value) => setBadge(index, { shadow: value })}
                  />
                </div>

                <Field
                  label="Animation Delay (e.g. 1.5s)"
                  value={badge.delay ?? "0s"}
                  onChange={(value) => setBadge(index, { delay: value })}
                />

                <Field
                  label="Icon SVG Path"
                  multiline
                  value={badge.icon ?? ""}
                  onChange={(value) => setBadge(index, { icon: value })}
                />
              </div>
            ))}
          </CollapsibleSection>

          <CollapsibleSection id="manifesto" title="Manifesto Section">
            <p className="text-sm opacity-70">
              Each item is one text segment. Enable emphasis for the segments
              that should be highlighted.
            </p>

            {form.manifesto.map((item, index) => (
              <div key={index} className={itemClass} style={itemStyle}>
                <Field
                  label={`Text Segment ${index + 1}`}
                  multiline
                  value={item.text ?? ""}
                  onChange={(value) => setItem("manifesto", index, { text: value })}
                />

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(item.em)}
                    onChange={(event) =>
                      setItem("manifesto", index, { em: event.target.checked })
                    }
                  />
                  Highlight this text
                </label>

                <button
                  type="button"
                  className={secondaryButtonClass}
                  style={outlineButtonStyle}
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      manifesto:
                        previous.manifesto.length > 1
                          ? previous.manifesto.filter((_, i) => i !== index)
                          : previous.manifesto,
                    }))
                  }
                >
                  Remove Segment
                </button>
              </div>
            ))}

            <button
              type="button"
              className={secondaryButtonClass}
              style={outlineButtonStyle}
              onClick={() =>
                setForm((previous) => ({
                  ...previous,
                  manifesto: [...previous.manifesto, { text: "", em: false }],
                }))
              }
            >
              + Add Text Segment
            </button>
          </CollapsibleSection>

          <CollapsibleSection id="panels" title="AI Service Panels">
            {form.panels.map((panel, index) => (
              <div key={index} className={itemClass} style={itemStyle}>
                <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                  Service Panel {index + 1}
                </h3>

                <div className={INPUT_GRID}>
                  <Field
                    label="Number"
                    value={panel.num ?? ""}
                    onChange={(value) => setItem("panels", index, { num: value })}
                  />
                  <Field
                    label="Title"
                    required
                    value={panel.title ?? ""}
                    onChange={(value) => setItem("panels", index, { title: value })}
                  />
                </div>

                <Field
                  label="Description"
                  multiline
                  value={panel.body ?? ""}
                  onChange={(value) => setItem("panels", index, { body: value })}
                />

                <div className={INPUT_GRID}>
                  <Field
                    label="Image Path"
                    value={panel.image ?? ""}
                    onChange={(value) => setItem("panels", index, { image: value })}
                  />
                  <Field
                    label="Image CSS Classes"
                    value={panel.imageClass ?? ""}
                    onChange={(value) => setItem("panels", index, { imageClass: value })}
                  />
                  <Field
                    label="Number Color Class"
                    value={panel.numColor ?? ""}
                    onChange={(value) => setItem("panels", index, { numColor: value })}
                  />
                  <Field
                    label="Link Color Class"
                    value={panel.linkColor ?? ""}
                    onChange={(value) => setItem("panels", index, { linkColor: value })}
                  />
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(panel.imageLeft)}
                      onChange={(event) =>
                        setItem("panels", index, { imageLeft: event.target.checked })
                      }
                    />
                    Image on left
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(panel.border)}
                      onChange={(event) =>
                        setItem("panels", index, { border: event.target.checked })
                      }
                    />
                    Show border
                  </label>
                </div>

                <button
                  type="button"
                  className={secondaryButtonClass}
                  style={outlineButtonStyle}
                  onClick={() => removePanel(index)}
                >
                  Remove Panel
                </button>
              </div>
            ))}

            <button
              type="button"
              className={secondaryButtonClass}
              style={outlineButtonStyle}
              onClick={addPanel}
            >
              + Add Service Panel
            </button>
          </CollapsibleSection>

          <CollapsibleSection id="tech-stack" title="AI Tech Stack">
            <Field
              label="Technology Tags (comma-separated)"
              multiline
              value={form.techStack.tags.join(", ")}
              onChange={updateTags}
            />

            <p className="text-sm opacity-70">
              Orbit rings control the rotating technology animation. Edit the
              radius, speed and labels below.
            </p>

            {form.techStack.orbitRings.map((ring, ringIndex) => (
              <div
                key={ringIndex}
                className={itemClass}
                style={itemStyle}
              >
                <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                  Orbit Ring {ringIndex + 1}
                </h3>

                <div className={INPUT_GRID}>
                  <Field
                    label="Radius"
                    value={String(ring.radius ?? "")}
                    onChange={(value) =>
                      setOrbitRing(ringIndex, { radius: Number(value) || 0 })
                    }
                  />
                  <Field
                    label="Rotation Speed"
                    value={String(ring.speed ?? "")}
                    onChange={(value) =>
                      setOrbitRing(ringIndex, { speed: Number(value) || 0 })
                    }
                  />
                </div>

                {ring.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={INPUT_GRID}>
                    <Field
                      label={`Item ${itemIndex + 1} Label`}
                      value={item.label ?? ""}
                      onChange={(value) =>
                        setOrbitItem(ringIndex, itemIndex, { label: value })
                      }
                    />
                    <Field
                      label={`Item ${itemIndex + 1} Angle`}
                      value={String(item.angle ?? "")}
                      onChange={(value) =>
                        setOrbitItem(ringIndex, itemIndex, {
                          angle: Number(value) || 0,
                        })
                      }
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className={secondaryButtonClass}
                  style={outlineButtonStyle}
                  onClick={() =>
                    setOrbitRing(ringIndex, {
                      items: [
                        ...ring.items,
                        { angle: 0, label: "" },
                      ],
                    })
                  }
                >
                  + Add Orbit Item
                </button>
              </div>
            ))}
          </CollapsibleSection>

          <CollapsibleSection id="philosophy" title="AI Philosophy">
            <Field
              label="Section Heading"
              value={form.philosophy.heading ?? ""}
              onChange={(value) =>
                setSection("philosophy", { heading: value })
              }
            />

            {form.philosophy.steps.map((step, index) => (
              <div key={index} className={itemClass} style={itemStyle}>
                <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                  Philosophy Step {index + 1}
                </h3>

                <Field
                  label="Title"
                  value={step.title ?? ""}
                  onChange={(value) => setPhilosophyStep(index, { title: value })}
                />

                <Field
                  label="Short Description"
                  multiline
                  value={step.body ?? ""}
                  onChange={(value) => setPhilosophyStep(index, { body: value })}
                />

                <Field
                  label="Detailed Description"
                  multiline
                  value={step.desc ?? ""}
                  onChange={(value) => setPhilosophyStep(index, { desc: value })}
                />
              </div>
            ))}
          </CollapsibleSection>

          <CollapsibleSection id="cta" title="Call To Action">
            <Field label="Heading" {...ctaField("heading")} />

            <Field
              label="Description"
              multiline
              {...ctaField("description")}
            />

            <div className={INPUT_GRID}>
              <Field label="Button Text" {...ctaField("buttonText")} />
              <Field label="Button URL" {...ctaField("buttonUrl")} />
            </div>
          </CollapsibleSection>

          <SaveBar saving={saving} error={error} message={message} />
        </form>
      </div>
    </main>
  );
}
