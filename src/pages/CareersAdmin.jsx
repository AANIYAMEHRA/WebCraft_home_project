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

const API = "http://localhost:5000/api/careers-page";

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract"];

const EMPTY_JOB = {
    title: "",
    department: "",
    location: "Indore",
    type: "Full-time",
    description: "",
    isActive: true,
    order: 0,
};

// Sends the admin token. Change the key name to match your login.
function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
}

// Fills in missing keys so every field has a value to show.
function mergeCareers(data = {}) {
    return {
        hero: {
            chip: "Careers at WebCraft",
            titleLine1: "Build what's next.",
            titleLine2: "Build it with us.",
            description:
                "Be part of work that brings research, technology, and thoughtful engineering together to solve real-world challenges.",
            primaryButtonText: "Explore Opportunities",
            secondaryButtonText: "Get in Touch",
            secondaryButtonEmail: "hr@webcraftit.com",
            ...(data.hero || {}),
        },
        stats:
            Array.isArray(data.stats) && data.stats.length
                ? data.stats
                : [
                    { value: "2006", label: "Founded" },
                    { value: "3000+", label: "Clients served" },
                    { value: "230+", label: "Professionals" },
                    { value: "96%", label: "Client retention" },
                ],
        whyWebcraft: {
            label: "The Work We Do",
            heading: "Technology with",
            headingHighlight: "purpose.",
            paragraph1:
                "WebCraft has grown from a web development startup into a research-led, AI-enabled digital transformation partner.",
            paragraph2:
                "Our work spans research, practical AI and automation, software engineering, cloud solutions, and long-term product support. We believe in understanding problems before building solutions and delivering work that creates lasting value.",
            linkText: "Discover WebCraft",
            linkUrl: "/about",
            ...(data.whyWebcraft || {}),
        },
        values: {
            label: "What We Believe In",
            heading: "Principles behind",
            headingHighlight: "our work.",
            description:
                "These values guide how we think, collaborate, make decisions, and deliver for our clients.",
            ...(data.values || {}),
            items:
                Array.isArray(data.values?.items) && data.values.items.length
                    ? data.values.items
                    : [
                        { number: "01", title: "Clarity First", description: "We prioritize understanding over assumptions. Every recommendation is backed by evidence and honest assessment." },
                        { number: "02", title: "Delivery Realism", description: "We commit to what we can deliver — and then deliver it. No inflated timelines, no scope surprises." },
                        { number: "03", title: "Client Partnership", description: "We build with our clients, not just for them — shared ownership, collaboration, and shared success." },
                        { number: "04", title: "Continuous Learning", description: "Technology evolves constantly. We invest in staying current and exploring better ways to solve problems." },
                    ],
        },
        openPositions: {
            label: "Opportunities",
            heading: "Open Positions",
            description: "Explore opportunities to become part of the WebCraft journey.",
            emptyTitle: "No open positions currently",
            emptyDescription:
                "There are no listed openings at the moment. Please check back later for future opportunities.",
            contactText: "Contact our team",
            contactEmail: "hr@webcraftit.com",
            ...(data.openPositions || {}),
        },
        cta: {
            label: "Stay Connected",
            heading: "Your next chapter",
            headingHighlight: "could start here.",
            description:
                "Interested in working with WebCraft? Share your details and resume with our HR team.",
            ...(data.cta || {}),
        },
    };
}

// Required fields, as paths into the form.
const REQUIRED_FIELDS = [
    ["hero", "titleLine1"],
    ["hero", "titleLine2"],
    ["hero", "description"],
    ["whyWebcraft", "heading"],
    ["values", "heading"],
    ["cta", "heading"],
    ["cta", "headingHighlight"],
];

function validateCareers(form) {
    const missing = REQUIRED_FIELDS.some((path) =>
        isBlank(path.reduce((object, key) => object?.[key], form))
    );
    return missing
        ? "Some required fields are empty. Please fill in all fields marked with *."
        : "";
}

export default function CareersAdmin() {
    const [page, setPage] = useState(() => mergeCareers());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(EMPTY_JOB);
    const [editingId, setEditingId] = useState(null);
    const [jobTitleError, setJobTitleError] = useState("");
    const [pendingJobDelete, setPendingJobDelete] = useState(null);

    async function loadAll() {
        try {
            const [pageRes, jobsRes] = await Promise.all([
                fetch(API),
                fetch(`${API}/jobs/all`, { headers: authHeaders() }),
            ]);
            if (!pageRes.ok) throw new Error("Failed to load Careers content");

            const pageData = await pageRes.json();
            const jobsData = await jobsRes.json();

            setPage(mergeCareers(pageData.page || {}));
            setJobs(jobsData.jobs || []);
        } catch (err) {
            setError(err.message || "Failed to load Careers content");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAll();
    }, []);

    // set("hero.titleLine1", "New text")
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

    // Binds a field to a path, e.g. bind("hero.chip")
    const bind = (path) => ({
        value: path.split(".").reduce((object, key) => object?.[key], page) ?? "",
        onChange: (v) => set(path, v),
    });

    async function handleSubmit(event) {
        event.preventDefault();

        const validationError = validateCareers(page);
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
                throw new Error(data.message || "Failed to save Careers content");
            }

            setPage(mergeCareers(data.page || page));
            setMessage("Careers content updated successfully!");
            notify("success", "Careers page saved successfully!");
        } catch (err) {
            setError(err.message || "Failed to save Careers content");
            notify("error", err.message || "Failed to save Careers content");
        } finally {
            setSaving(false);
        }
    }

    async function saveJob() {
        const title = job.title.trim();

        if (!title) {
            setJobTitleError("Job title is required.");
            notify("error", "Please enter a job title first.");
            return;
        }

        const validPattern = /^[A-Za-z][A-Za-z0-9 .,&()\/+\-]{1,148}$/;
        const hasVowel = /[aeiouAEIOU]/.test(title);

        if (!validPattern.test(title) || !hasVowel) {
            const msg = "Invalid job title. Example: Frontend Developer.";
            setJobTitleError(msg);
            notify("error", msg);
            return;
        }

        setJobTitleError("");

        try {
            const response = await fetch(
                editingId ? `${API}/jobs/${editingId}` : `${API}/jobs`,
                {
                    method: editingId ? "PUT" : "POST",
                    headers: authHeaders(),
                    body: JSON.stringify({ ...job, title }),
                }
            );

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || "Job save failed");
            }

            notify("success", editingId ? "Job updated." : "Job added.");
            setJob(EMPTY_JOB);
            setEditingId(null);
            loadAll();
        } catch (err) {
            notify("error", err.message || "Job save failed");
        }
    }

    async function confirmDeleteJob() {
        const id = pendingJobDelete;
        setPendingJobDelete(null);

        try {
            const response = await fetch(`${API}/jobs/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            if (!response.ok) throw new Error("Delete failed");

            notify("success", "Job deleted.");
            loadAll();
        } catch (err) {
            notify("error", err.message || "Delete failed");
        }
    }

    if (loading) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading Careers CMS...
            </p>
        );
    }

    const pendingJob = jobs.find((j) => j._id === pendingJobDelete);

    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <PageTitle name="Careers Page" intro="Edit your Careers page content from one place." />

                <form id="admin-form" onSubmit={handleSubmit} className="space-y-10">
                    {/* HERO CONTENT */}
                    <CollapsibleSection id="hero" title="Hero Content">
                        <Field label="Small Label" {...bind("hero.chip")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" required {...bind("hero.titleLine1")} />
                            <Field label="Heading Line 2" required {...bind("hero.titleLine2")} />
                        </div>

                        <Field label="Description" required multiline {...bind("hero.description")} />

                        <div className={INPUT_GRID}>
                            <Field label="First Button Text" {...bind("hero.primaryButtonText")} />
                            <Field label="Second Button Text" {...bind("hero.secondaryButtonText")} />
                        </div>

                        <Field label="Second Button Email" {...bind("hero.secondaryButtonEmail")} />
                    </CollapsibleSection>

                    {/* HERO STATISTICS */}
                    <CollapsibleSection id="statistics" title="Hero Statistics">
                        {page.stats.map((stat, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                    Statistic {index + 1}
                                </h4>
                                <div className={INPUT_GRID}>
                                    <Field label="Value" value={stat.value ?? ""} onChange={(v) => set(`stats.${index}.value`, v)} />
                                    <Field label="Label" value={stat.label ?? ""} onChange={(v) => set(`stats.${index}.label`, v)} />
                                </div>
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* WHY WEBCRAFT */}
                    <CollapsibleSection id="why-webcraft" title="Why WebCraft Section">
                        <Field label="Section Label" {...bind("whyWebcraft.label")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading" required {...bind("whyWebcraft.heading")} />
                            <Field label="Highlight" {...bind("whyWebcraft.headingHighlight")} />
                        </div>

                        <Field label="Paragraph 1" multiline {...bind("whyWebcraft.paragraph1")} />
                        <Field label="Paragraph 2" multiline {...bind("whyWebcraft.paragraph2")} />

                        <div className={INPUT_GRID}>
                            <Field label="Link Text" {...bind("whyWebcraft.linkText")} />
                            <Field label="Link URL" {...bind("whyWebcraft.linkUrl")} />
                        </div>
                    </CollapsibleSection>

                    {/* VALUES */}
                    <CollapsibleSection id="values" title="Our Values Section">
                        <Field label="Section Label" {...bind("values.label")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading" required {...bind("values.heading")} />
                            <Field label="Highlight" {...bind("values.headingHighlight")} />
                        </div>

                        <Field label="Description" multiline {...bind("values.description")} />

                        {page.values.items.map((item, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                    Value {item.number}
                                </h4>
                                <Field label="Title" value={item.title ?? ""} onChange={(v) => set(`values.items.${index}.title`, v)} />
                                <Field
                                    label="Description"
                                    multiline
                                    value={item.description ?? ""}
                                    onChange={(v) => set(`values.items.${index}.description`, v)}
                                />
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* OPEN POSITIONS TEXT */}
                    <CollapsibleSection id="open-positions" title="Open Positions Section">
                        <div className={INPUT_GRID}>
                            <Field label="Section Label" {...bind("openPositions.label")} />
                            <Field label="Heading" {...bind("openPositions.heading")} />
                        </div>

                        <Field label="Description" multiline {...bind("openPositions.description")} />

                        <div className={INPUT_GRID}>
                            <Field label="Empty State Title" {...bind("openPositions.emptyTitle")} />
                            <Field label="Contact Text" {...bind("openPositions.contactText")} />
                        </div>

                        <Field label="Empty State Description" multiline {...bind("openPositions.emptyDescription")} />
                        <Field label="Contact Email" {...bind("openPositions.contactEmail")} />
                    </CollapsibleSection>

                    {/* JOB OPENINGS (saved separately, not with the page form) */}
                    <CollapsibleSection id="jobs" title="Job Openings">
                        <div className={itemClass} style={itemStyle}>
                            <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                                {editingId ? "Edit Job" : "Add Job"}
                            </h4>

                            <Field
                                label="Job Title"
                                required
                                value={job.title}
                                onChange={(v) => {
                                    setJob({ ...job, title: v });
                                    if (jobTitleError) setJobTitleError("");
                                }}
                            />
                            {jobTitleError && (
                                <p className="-mt-3 mb-4 text-sm font-semibold text-red-600">
                                    {jobTitleError}
                                </p>
                            )}

                            <div className={INPUT_GRID}>
                                <Field
                                    label="Department"
                                    value={job.department}
                                    onChange={(v) => setJob({ ...job, department: v })}
                                />
                                <Field
                                    label="Location"
                                    value={job.location}
                                    onChange={(v) => setJob({ ...job, location: v })}
                                />
                            </div>

                            <div className={INPUT_GRID}>
                                <label className="mb-4 block">
                                    <span className="mb-1 block text-sm font-semibold">Type</span>
                                    <select
                                        className="w-full rounded-xl border p-3"
                                        value={job.type}
                                        onChange={(e) => setJob({ ...job, type: e.target.value })}
                                    >
                                        {JOB_TYPES.map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <Field
                                label="Description"
                                multiline
                                value={job.description}
                                onChange={(v) => setJob({ ...job, description: v })}
                            />

                            <label className="mb-4 flex items-center gap-2 text-sm font-semibold">
                                <input
                                    type="checkbox"
                                    checked={job.isActive}
                                    onChange={(e) => setJob({ ...job, isActive: e.target.checked })}
                                />
                                Show on website
                            </label>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={saveJob}
                                    className={secondaryButtonClass}
                                    style={outlineButtonStyle}
                                >
                                    {editingId ? "Update Job" : "Add Job"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        className={secondaryButtonClass}
                                        style={outlineButtonStyle}
                                        onClick={() => {
                                            setJob(EMPTY_JOB);
                                            setEditingId(null);
                                            setJobTitleError("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        {jobs.map((j) => (
                            <div key={j._id} className={itemClass} style={itemStyle}>
                                <ItemHeader
                                    title={j.title}
                                    onRemove={() => setPendingJobDelete(j._id)}
                                />

                                <p className="text-sm">
                                    {j.location} · {j.type}
                                    {!j.isActive && " · [hidden]"}
                                </p>

                                <button
                                    type="button"
                                    className={secondaryButtonClass}
                                    style={outlineButtonStyle}
                                    onClick={() => {
                                        setJob(j);
                                        setEditingId(j._id);
                                        setJobTitleError("");
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </CollapsibleSection>

                    {/* CTA */}
                    <CollapsibleSection id="cta" title="CTA Section">
                        <Field label="Section Label" {...bind("cta.label")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" required {...bind("cta.heading")} />
                            <Field label="Heading Line 2" required {...bind("cta.headingHighlight")} />
                        </div>

                        <Field label="Description" multiline {...bind("cta.description")} />
                    </CollapsibleSection>

                    <SaveBar saving={saving} error={error} message={message} />
                </form>
            </div>

            {pendingJobDelete !== null && (
                <ConfirmDialog
                    title="Delete job?"
                    message={`Are you sure you want to delete "${pendingJob?.title || "this job"}"? This cannot be undone.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmDeleteJob}
                    onCancel={() => setPendingJobDelete(null)}
                />
            )}
        </main>
    );
}
